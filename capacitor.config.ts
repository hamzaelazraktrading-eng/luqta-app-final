import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.luqta.deals',
  appName: 'لُقطة',
  webDir: 'client/dist', // هذا هو المسار الصحيح الذي ينتجه Vite
  server: {
    androidScheme: 'https'
  }
};

export default config;
