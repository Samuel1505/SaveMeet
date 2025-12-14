import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RedirectHandler() {
  const [shouldRedirect, setShouldRedirect] = useState<{ to: string } | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      if (!onboardingCompleted) {
        setShouldRedirect({ to: '/onboarding' });
      } else {
        setShouldRedirect({ to: '/index' });
      }
    };

    checkOnboarding();
  }, []);

  if (!shouldRedirect) {
    return null; // or a loading spinner
  }

  return <Redirect href={shouldRedirect.to} />;
}

