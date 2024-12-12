# Welcome to PizzaWorld app 🍕

This is an App for orders management of Pizza.

Need:

1. Supabase for users, products and orders management.

2. Stripe for payments

# Setup environment on .env

EXPO_PUBLIC_SUPABASE_URL=https://????????.supabase.co
EXPO_PUBLIC_SUPABASE_ANON=?????????

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_***
STRIPE_SECRET_KEY=sk_test_***

## Dependecies

npm i @tanstack/react-query

npx expo install expo-file-system base64-arraybuffer

npx expo install @stripe/stripe-react-native

npm install --global eas-cli

eas login

## Set Deno environment 

https://docs.deno.com/runtime/getting_started/setup_your_environment/

## Expo Stripe Documentations

https://docs.expo.dev/versions/v51.0.0/sdk/stripe/

## Stripe Test Integration

https://docs.stripe.com/payments/accept-a-payment?platform=react-native#react-native-test

## Setup EAS Build

npm install --global eas-cli

eas login

eas build:configure

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
