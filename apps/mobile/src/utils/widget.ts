/**
 * Widget bridge utilities
 *
 * Architecture change: the widget no longer calls the API.
 * Instead, the app writes partner status data to a shared storage container
 * whenever it receives a WebSocket update, and the widget reads from there.
 *
 * iOS  — App Group UserDefaults (suiteName: "group.app.twynd.widget")
 * Android — SharedPreferences ("app.twynd.widget")
 *
 * The app keeps AsyncStorage as the primary store. A NativeModule (TwyndWidget)
 * bridges updates to the shared container that the widget extension can access.
 * Until EAS native build is in place, the NativeModule calls are no-ops.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, NativeModules } from 'react-native';
import { getWidgetData } from '../services/localProfile';

const WIDGET_DATA_KEY = 'twynd_widget_data';

/**
 * Push the latest partner data into the native shared container.
 * Called automatically by localProfile.savePartnerProfile().
 * Safe to call any time — no-ops if native module isn't loaded yet.
 */
export async function pushWidgetData(): Promise<void> {
  try {
    const data = await getWidgetData();
    if (!data) return;
    const json = JSON.stringify(data);

    // Write to shared native container (available after EAS build)
    if (NativeModules.TwyndWidget?.updateWidgetData) {
      NativeModules.TwyndWidget.updateWidgetData(json);
    }
  } catch (err) {
    console.warn('[widget] Failed to push widget data:', err);
  }
}

/**
 * Clear widget data on logout or room leave.
 */
export async function clearWidgetData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WIDGET_DATA_KEY);
    NativeModules.TwyndWidget?.clearWidgetData?.();
  } catch {
    // ignore
  }
}

/**
 * Parse a twynd:// deep link and return the target screen name.
 * e.g. "twynd://us" → "us"
 */
export function parseDeepLink(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'twynd:') {
      return parsed.hostname || null;
    }
  } catch {
    // malformed URL
  }
  return null;
}
