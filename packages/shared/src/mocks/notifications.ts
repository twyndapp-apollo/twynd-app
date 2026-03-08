export const Notifications = {
  // In dev: just log. In prod: calls expo-notifications.
  schedule: async (content: { title: string; body: string }, trigger: any) => {
    if (__DEV__) {
      console.log('[MOCK NOTIFICATION]', content.title, '|', content.body);
      return 'mock-notification-id';
    }
    const { scheduleNotificationAsync } = await import('expo-notifications');
    return scheduleNotificationAsync({ content, trigger });
  },

  requestPermissions: async () => {
    if (__DEV__) return { granted: true };
    const { requestPermissionsAsync } = await import('expo-notifications');
    return requestPermissionsAsync();
  },
};