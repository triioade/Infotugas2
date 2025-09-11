import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.InfoTugas.app',
  appName: 'Info Tugas',
  webDir: 'dist',
  plugins: {
    OneSignal: {
      appId: 'f523ed46-9a99-46f6-8e00-34123d09140f',
    },
  },
};

export default config;
