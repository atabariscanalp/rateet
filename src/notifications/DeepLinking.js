import messaging from '@react-native-firebase/messaging'
import { getStateFromPath } from '@react-navigation/native'
import { Linking } from 'react-native'
import { store } from '../../store'
import { getCommentsForPost } from '../actions/posts'


const config = {
    screens: {
        HomeStack: {
            screens: {
                home: {
                    screens: {
                        search: {
                            initialRouteName: 'search',
                            screens: {
                                PostDetail: {
                                    initialRouteName: 'PostDetail',
                                    screens: {
                                        PostDetail: 'post-detail/:postId',
                                        CommentDetail: 'post-detail/:postId/:comment/:commentId/:reply?/:replyId?'
                                    } 
                                }
                            }
                        }
                    }
                } 
            }
        },
        AuthStack: {
            screens: {
                ChangePassword: 'reset/:uid/:token'
            }
        }
    }
}

export const notificationLinking = {
    prefixes: ['rateet://app'],
    config,
    getStateFromPath(path, config){
        const returnedState  = getStateFromPath(path, config)
        const splitString = path.split("/")
        let found = false
        Object.values(splitString).map(str => {
            if (str === 'comment') found = true
        })
        if (found)
          {
            const params = returnedState.routes[0].state.routes[0].state.routes[0].state.routes[1].state.routes[1].params // params of CommentDetail
            returnedState.routes[0].state.routes[0].state.routes[0].state.routes[1].state.routes[0].params = params // adding params to PostDetail
            returnedState.routes[0].state.routes[0].state.routes[0].state.routes[1].state.routes[0].key = "post-detail-1" // adding key to PostDetail
            return returnedState
          }

        return returnedState
    },
    async getInitialUrl(){
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();

        if (url != null) {
            return url;
        }

        // Check if there is an initial firebase notification
        const message = await messaging().getInitialNotification();


        // Get the `url` property from the notification which corresponds to a screen
        // This property needs to be set on the notification payload when sending it
        return message?.data.link;
    },
    subscribe(listener){
        const onReceiveURL = (url) => listener(url);

        // Listen to incoming links from deep linking
        Linking.addEventListener('url', onReceiveURL);

        // Listen to firebase push notifications
        const unsubscribeNotification = messaging().onNotificationOpenedApp(
            (message) => {
            const url = message.data.link;

            if (url) {
                // Any custom logic to check whether the URL needs to be handled
                //...
                const splitString = url.split('/')
                Object.values(splitString).map(str => {
                    if (str === 'comment') store.dispatch(getCommentsForPost(splitString[4]))
                })
                console.log("splitString: ", splitString)
                
                // Call the listener to let React Navigation handle the URL
                listener(url);
                }
            }
        );

        return () => {
            // Clean up the event listeners
            Linking.removeEventListener('url', onReceiveURL);
            unsubscribeNotification();
        }
    },
    
}
