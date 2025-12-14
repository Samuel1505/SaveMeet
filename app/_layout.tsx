import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AppSplashScreen } from '@/components/splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    // Wait for splash screen to complete (3 seconds total: 2.5s display + 0.5s fade)
    const timer = setTimeout(() => {
      setIsSplashReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isSplashReady) {
    return <AppSplashScreen onFinish={() => setIsSplashReady(true)} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
