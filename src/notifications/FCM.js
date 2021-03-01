import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

import { store } from '../../store'
import { registerDevice } from '../actions/user'


export const registerAppWithFCM = async () => {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages()
    }
    await messaging().setAutoInitEnabled(true)
}

export const notifyDevice = (onNotification, onOpenNotification) => {
    onBackground(onOpenNotification)
    onQuit(onOpenNotification)
}

export const checkPermission = () => {
    messaging().hasPermission()
    .then(enabled => {
        if (enabled) { 
            // User has permissions
            getToken()
        } else {
            // User doesn't have permission
            requestPermission()
        }
    }).catch(error => {
        console.log("[FCMService] Permission rejected ", error)
    })
}

const requestPermission = () => {
    messaging().requestPermission()
   .then(() => {
       console.log("permission accepted")
       getToken()
   }).catch(error => {
       console.log("[FCMService] Request Permission rejected ", error)
   })
}

const setToken = async (fcmToken) => {    
    try {
        await AsyncStorage.setItem('fcm_token', fcmToken)
    } catch (err) {
        console.log(err)
    }
    console.log('set token!')
}

const getToken = () => {
    messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            setToken(fcmToken)
            console.log("fcm token: " + fcmToken)
        } else {
            console.log("[FCMService] User does not have a device token")
        }
    }).catch(error => {
        console.log("[FCMService] getToken rejected ", error)
    })
}

export const deleteToken = () => {
    console.log("[FCMService] deleteToken ")
    messaging().deleteToken()
    .catch(error => {
        console.log("[FCMService] Delete token error ", error)
    })
}

// When the application is running, but in the background
const onBackground = (onOpenNotification) => {
    messaging()
    .onNotificationOpenedApp(remoteMessage => {
        console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',remoteMessage)
        if (remoteMessage) {
            const notification = remoteMessage.notification
            onOpenNotification(notification)
        }
    })
}

// When the application is opened from a quit state.
const onQuit = (onOpenNotification) => {
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:',remoteMessage)
        if (remoteMessage) {
            const notification = remoteMessage.notification
            onOpenNotification(notification)
        }
    })
}

// Foreground state messages
export const messageListener = () => messaging().onMessage(async remoteMessage => {
    console.log('[FCMService] A new FCM message arrived!', remoteMessage)
    if (remoteMessage) {

        const message = {
            id: remoteMessage.messageId,
            link: remoteMessage.data.link,
            senderId: remoteMessage.data.senderId,
            postId: remoteMessage.data.postId,
            message: remoteMessage.notification.body,
            sentTime: remoteMessage.sentTime
        }
        const currentMessages = await AsyncStorage.getItem('notifications')
        if (!currentMessages) {
            const messages = []
            messages.push(message)
            await AsyncStorage.setItem('notifications', JSON.stringify(messages))
        } else {
            const messagesArray = JSON.parse(currentMessages)
            messagesArray.push(message)
            await AsyncStorage.setItem('notifications', JSON.stringify(messagesArray))
        }
        
        // ------ USE FOR REACT-NATIVE-PUSH-NOTIFICATIONS LATER! --------
        //const notification = remoteMessage.notification
        //const id = remoteMessage.messageId
        //onNotification(notification, id)
    }
  })

// Triggered when have new token
export const refreshToken = () => {
    messaging().onTokenRefresh(fcmToken => {
        console.log("[FCMService] New token refresh: ", fcmToken)
        store.dispatch(registerDevice(fcmToken, Platform.OS))
    })
}


export const unSubscribeRefreshToken = () => {
    refreshToken()
}
