import {  Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getAdminsExpoToken, getProfileExpoToken } from '@/app/api/users';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type pushMessage = {
    to: string;
    sound: string;
    title: string;
    body: string;
    data: any;
}

/*const message = {
    to: profile?.expo_push_token,
    sound: 'default',
    title: `#${order.id} order update`,
    body: `Your order status is ${order.status}`,
    data: { someData: 'goes here' },
  };*/

async function sendPushNotification(expoPushToken: string, message: pushMessage) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
    let pushTokenString;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
        pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    //handleRegistrationError('Must use physical device for push notifications');
  }
  return pushTokenString;
}

export async function notifyUserAboutOrderUpdate(order: any, status: string) {
    const expo_push_token = await getProfileExpoToken(order.user_id);
    if(expo_push_token) {
        const message = {
            to: expo_push_token,
            sound: 'default',
            title: `#${order.id} order update`,
            body: `Your order status is ${status}`,
            data: undefined
        };
        await sendPushNotification(expo_push_token, message);
    }
}

export async function notifyNewOrder(order: any) {
    const expo_push_tokens = await getAdminsExpoToken();
    if(expo_push_tokens) {
        expo_push_tokens.map((expo_push_token) => {
            const message = {
                to: expo_push_token!,
                sound: 'default',
                title: `#${order.id} new order`,
                body: `New order arrived`,
                data: undefined
            };
            sendPushNotification(expo_push_token!, message);
        });
    }
}