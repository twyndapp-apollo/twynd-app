// TwyndWidgetProvider.kt
// Android App Widget for Twynd
// Requires: EAS Build (bare workflow) or react-native-android-widget library
// Displays: partner emoji, status message, city, distance. Tap → opens app to Us screen.

package app.twynd.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import kotlinx.coroutines.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import kotlin.math.*

class TwyndWidgetProvider : AppWidgetProvider() {

    companion object {
        private const val PREFS_NAME = "app.twynd.widget"
        private const val KEY_TOKEN   = "twynd_widget_token"
        private const val KEY_ROOM_ID = "twynd_widget_roomId"
        private const val KEY_API_URL = "twynd_widget_apiUrl"

        // Store auth token + room from the main app (call this from JS via NativeModule)
        fun saveWidgetPrefs(context: Context, token: String, roomId: String, apiUrl: String) {
            val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            prefs.edit()
                .putString(KEY_TOKEN, token)
                .putString(KEY_ROOM_ID, roomId)
                .putString(KEY_API_URL, apiUrl)
                .apply()
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (widgetId in appWidgetIds) {
            updateWidget(context, appWidgetManager, widgetId)
        }
    }

    private fun updateWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        widgetId: Int
    ) {
        CoroutineScope(Dispatchers.IO).launch {
            val prefs  = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            val token  = prefs.getString(KEY_TOKEN, "") ?: ""
            val roomId = prefs.getString(KEY_ROOM_ID, "") ?: ""
            val apiUrl = prefs.getString(KEY_API_URL, "http://localhost:3000/api") ?: ""

            val data = if (token.isNotEmpty() && roomId.isNotEmpty()) {
                fetchWidgetData("$apiUrl/us/$roomId/widget", token)
            } else null

            withContext(Dispatchers.Main) {
                val views = RemoteViews(context.packageName, R.layout.widget_layout)

                // Populate views
                views.setTextViewText(R.id.widget_emoji, data?.optString("partnerEmoji", "😊") ?: "😊")
                views.setTextViewText(R.id.widget_nickname, data?.optString("partnerNickname", "Partner") ?: "Partner")
                views.setTextViewText(R.id.widget_status, data?.optString("partnerStatusMessage", "") ?: "")

                val city = data?.optString("partnerLocationCity", null)
                val distanceKm = if (data?.isNull("distanceKm") == false) data.getDouble("distanceKm") else null
                val locationLine = buildString {
                    if (!city.isNullOrEmpty()) append("📍 $city")
                    if (distanceKm != null) {
                        if (isNotEmpty()) append("  ")
                        append(formatDistance(distanceKm))
                    }
                }
                views.setTextViewText(R.id.widget_location, locationLine)

                // Deep-link tap → open app at Us screen
                val intent = Intent(Intent.ACTION_VIEW).apply {
                    data = android.net.Uri.parse("twynd://us")
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                }
                val pending = PendingIntent.getActivity(
                    context, 0, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )
                views.setOnClickPendingIntent(R.id.widget_root, pending)

                appWidgetManager.updateAppWidget(widgetId, views)
            }
        }
    }

    private fun fetchWidgetData(urlString: String, token: String): JSONObject? {
        return try {
            val conn = URL(urlString).openConnection() as HttpURLConnection
            conn.requestMethod = "GET"
            conn.setRequestProperty("Authorization", "Bearer $token")
            conn.connectTimeout = 5000
            conn.readTimeout    = 5000

            if (conn.responseCode == 200) {
                val body = BufferedReader(InputStreamReader(conn.inputStream)).readText()
                JSONObject(body)
            } else null
        } catch (e: Exception) {
            null
        }
    }

    private fun formatDistance(km: Double): String {
        return if (km < 1) "${(km * 1000).roundToInt()} m away"
        else "${"%.1f".format(km)} km away"
    }
}
