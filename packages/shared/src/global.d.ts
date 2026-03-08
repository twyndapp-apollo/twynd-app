/// <reference lib="dom" />
declare const __DEV__: boolean;

declare module 'expo-notifications' {
  export function scheduleNotificationAsync(options: any): Promise<string>;
  export function requestPermissionsAsync(): Promise<any>;
}
