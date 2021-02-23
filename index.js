//import './wdyr'
import 'react-native-gesture-handler'
        
import './src/actions/interceptors'
import { AppRegistry, Platform } from 'react-native'
import { name as root } from './app.json'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import messaging from '@react-native-firebase/messaging'

import {store, persistor} from './store'



// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("remote message: ", remoteMessage)
});

let isheadless = false

if (Platform.OS === 'ios') {
    messaging().getIsHeadless().then(isHeadless => {
        isheadless = isHeadless
    })
}


const NativeApp = () => {
    if (isheadless)
        return null

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(root, () => NativeApp)
