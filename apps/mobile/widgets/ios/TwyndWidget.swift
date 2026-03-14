// TwyndWidget.swift
// iOS WidgetKit extension for Twynd
// Requires: EAS Build (bare/managed with config plugin), iOS 16+
// Shows partner's current emoji, status, location city, and distance.

import WidgetKit
import SwiftUI

// MARK: - Data model (mirrors WidgetData type from shared/types.ts)

struct WidgetData: Codable {
    var partnerNickname: String
    var partnerAvatar: String?
    var partnerEmoji: String
    var partnerStatusMessage: String
    var partnerLocationCity: String?
    var distanceKm: Double?
}

// MARK: - Timeline provider
// Data source: App Group UserDefaults written by the main app via TwyndWidget NativeModule.
// No API calls — all partner data lives on-device.

struct TwyndWidgetProvider: TimelineProvider {

    private let suiteName   = "group.app.twynd.widget"
    private let dataKey     = "twynd_widget_data"

    func placeholder(in context: Context) -> TwyndEntry {
        TwyndEntry(date: Date(), data: .placeholder)
    }

    func getSnapshot(in context: Context, completion: @escaping (TwyndEntry) -> Void) {
        completion(TwyndEntry(date: Date(), data: readLocalData() ?? .placeholder))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<TwyndEntry>) -> Void) {
        let data  = readLocalData() ?? .placeholder
        let entry = TwyndEntry(date: Date(), data: data)
        // Re-read every 15 min (app pushes updates via NativeModule on every WS message)
        let next  = Date().addingTimeInterval(900)
        completion(Timeline(entries: [entry], policy: .after(next)))
    }

    private func readLocalData() -> WidgetData? {
        guard
            let defaults = UserDefaults(suiteName: suiteName),
            let json     = defaults.string(forKey: dataKey),
            let jsonData = json.data(using: .utf8)
        else { return nil }
        return try? JSONDecoder().decode(WidgetData.self, from: jsonData)
    }
}

// MARK: - Timeline entry

struct TwyndEntry: TimelineEntry {
    let date: Date
    let data: WidgetData
}

extension WidgetData {
    static var placeholder: WidgetData {
        WidgetData(
            partnerNickname: "Partner",
            partnerAvatar: nil,
            partnerEmoji: "😊",
            partnerStatusMessage: "Thinking of you",
            partnerLocationCity: "Somewhere",
            distanceKm: 3.2
        )
    }
}

// MARK: - Widget views

struct TwyndWidgetEntryView: View {
    var entry: TwyndEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall: smallView
        case .systemMedium: mediumView
        default: smallView
        }
    }

    // ── Small widget ──────────────────────────────────────────────────────────
    private var smallView: some View {
        VStack(spacing: 6) {
            Text(entry.data.partnerEmoji)
                .font(.system(size: 38))
            Text(entry.data.partnerNickname)
                .font(.headline)
                .lineLimit(1)
            if !entry.data.partnerStatusMessage.isEmpty {
                Text(entry.data.partnerStatusMessage)
                    .font(.caption2)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
            }
        }
        .padding()
        .widgetURL(URL(string: "twynd://us"))
    }

    // ── Medium widget ─────────────────────────────────────────────────────────
    private var mediumView: some View {
        HStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text(entry.data.partnerEmoji).font(.system(size: 44))
                Text(entry.data.partnerNickname)
                    .font(.title3).bold()
                    .lineLimit(1)
                if !entry.data.partnerStatusMessage.isEmpty {
                    Text(entry.data.partnerStatusMessage)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 6) {
                if let city = entry.data.partnerLocationCity {
                    Label(city, systemImage: "mappin.circle.fill")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                if let km = entry.data.distanceKm {
                    let label = km < 1
                        ? String(format: "%.0f m away", km * 1000)
                        : String(format: "%.1f km away", km)
                    Label(label, systemImage: "arrow.triangle.swap")
                        .font(.caption)
                        .foregroundColor(.orange)
                }
            }
        }
        .padding()
        .widgetURL(URL(string: "twynd://us"))
    }
}

// MARK: - Widget configuration

@main
struct TwyndWidget: Widget {
    let kind = "TwyndWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: TwyndWidgetProvider()) { entry in
            TwyndWidgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Twynd — Partner Status")
        .description("See your partner's current mood and how far they are.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
