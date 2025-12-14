import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AppSplashScreen } from '@/components/splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);

  useEffect(() => {
    // Wait for splash screen to complete (3 seconds total: 2.5s display + 0.5s fade)
    const timer = setTimeout(async () => {
      setIsSplashReady(true);
      
      // Check onboarding status and redirect only once
      if (!hasCheckedOnboarding) {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        setHasCheckedOnboarding(true);
        
        if (!onboardingCompleted) {
          // Small delay to ensure router is ready
          setTimeout(() => {
            router.replace('/onboarding');
          }, 50);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasCheckedOnboarding, router]);

  if (!isSplashReady) {
    return <AppSplashScreen onFinish={() => setIsSplashReady(true)} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
