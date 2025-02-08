import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flowerpowerdispensers.app',
  appName: 'Flower Power Dispensers',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      launchShowDuration: 0, // Disables Capacitor's default splash screen to use custom Angular component
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    FirebaseMessaging: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
};

export default config;
