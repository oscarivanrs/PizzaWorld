import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/../hooks/useColorScheme';
import CartProvider from './providers/CartProvider';
import AuthProvider from './providers/AuthProvider';
import QueryProvider from './providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import NotificationProvider from './providers/NotificationProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <NotificationProvider>
            <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}>
              <CartProvider>
                <Stack>
                  <Stack.Screen name="(user)" options={{ headerShown: false }} />
                  <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </CartProvider>
            </StripeProvider>
          </NotificationProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
