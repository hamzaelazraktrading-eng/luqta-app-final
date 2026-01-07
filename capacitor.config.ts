import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.luqta.deals',
  appName: 'لُقطة',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*.replit.dev']
  }
};

export default config;
