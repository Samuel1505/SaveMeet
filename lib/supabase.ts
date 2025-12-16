import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

// Get Supabase URL and anon key from environment variables
// You can set these in a .env file or in app.json under expo.extra
const supabaseUrl = 
  Constants.expoConfig?.extra?.supabaseUrl || 
  process.env.EXPO_PUBLIC_SUPABASE_URL || 
  'https://nzxjpwcjuoagulhmnulg.supabase.co';

const supabaseAnonKey = 
  Constants.expoConfig?.extra?.supabaseAnonKey || 
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 
  '';

if (!supabaseAnonKey) {
  console.error('❌ Supabase anon key is missing!');
  console.error('Please set EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file or app.json');
  console.error('Example: EXPO_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
