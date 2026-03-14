/**
 * Expo config plugin for Twynd
 * Adds:
 *   iOS  — WidgetKit extension (TwyndWidget) + shared App Group for token passing
 *   Android — AppWidget provider + deep-link intent filter (twynd://us)
 *
 * Requires:
 *   - EAS Build (eas build) — local `expo run:ios / run:android` also works after `expo prebuild`
 *   - expo-build-properties (for deployment target)
 *
 * Usage in app.json:
 *   "plugins": ["./app.plugin.js"]
 */

const { withInfoPlist, withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs   = require('fs');

// ── iOS: App Group + Widget extension target ──────────────────────────────────

function withIosWidget(config) {
  // 1. Add App Group capability (needed for shared UserDefaults between app and widget)
  config = withInfoPlist(config, (c) => {
    c.modResults['NSLocationWhenInUseUsageDescription'] =
      'Twynd uses your location to show your partner how far away you are.';
    c.modResults['NSLocationAlwaysAndWhenInUseUsageDescription'] =
      'Twynd uses your location to update your distance in the partner widget.';
    return c;
  });

  // 2. Copy widget source into ios/ during prebuild
  config = withDangerousMod(config, [
    'ios',
    async (c) => {
      const widgetSrc = path.join(__dirname, 'widgets', 'ios');
      const iosDir    = path.join(c.modRequest.platformProjectRoot, 'TwyndWidget');

      if (!fs.existsSync(iosDir)) fs.mkdirSync(iosDir, { recursive: true });

      for (const file of fs.readdirSync(widgetSrc)) {
        fs.copyFileSync(path.join(widgetSrc, file), path.join(iosDir, file));
      }

      console.log('[app.plugin] Copied iOS widget files to', iosDir);
      return c;
    },
  ]);

  return config;
}

// ── Android: deep-link + AppWidget receiver ───────────────────────────────────

function withAndroidWidget(config) {
  config = withAndroidManifest(config, (c) => {
    const app = c.modResults.manifest.application[0];

    // Deep-link intent filter on MainActivity (twynd://us → Us screen)
    const mainActivity = app.activity?.find(
      (a) => a.$['android:name'] === '.MainActivity'
    );
    if (mainActivity) {
      mainActivity['intent-filter'] = mainActivity['intent-filter'] ?? [];
      const alreadyAdded = mainActivity['intent-filter'].some(
        (f) => f?.data?.[0]?.$?.['android:scheme'] === 'twynd'
      );
      if (!alreadyAdded) {
        mainActivity['intent-filter'].push({
          action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
          category: [
            { $: { 'android:name': 'android.intent.category.DEFAULT' } },
            { $: { 'android:name': 'android.intent.category.BROWSABLE' } },
          ],
          data: [{ $: { 'android:scheme': 'twynd', 'android:host': 'us' } }],
        });
      }
    }

    // Widget receiver
    const receiverAlreadyAdded = app.receiver?.some(
      (r) => r.$['android:name'] === 'app.twynd.widget.TwyndWidgetProvider'
    );
    if (!receiverAlreadyAdded) {
      app.receiver = app.receiver ?? [];
      app.receiver.push({
        $: {
          'android:name': 'app.twynd.widget.TwyndWidgetProvider',
          'android:exported': 'true',
          'android:label': 'Twynd Partner Status',
        },
        'intent-filter': [
          {
            action: [
              { $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } },
            ],
          },
        ],
        'meta-data': [
          {
            $: {
              'android:name': 'android.appwidget.provider',
              'android:resource': '@xml/twynd_widget_info',
            },
          },
        ],
      });
    }

    return c;
  });

  return config;
}

// ── Export ────────────────────────────────────────────────────────────────────

module.exports = (config) => {
  config = withIosWidget(config);
  config = withAndroidWidget(config);
  return config;
};
