import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'
import Notification from '../src/components/Notification'

export default function NotificationsScreen({ navigation }) {

    const [notifications, setNotifications] = useState(null)
    const { colors } = useTheme()

    const getNotifications = async () => {
        const notificationsArray  = await AsyncStorage.getItem('notifications')
        const notificationsArr = JSON.parse(notificationsArray)
        const length = notificationsArr.length
        let splittedNotifications = []
        if (length > 0) {
            if (length >= 30){
                splittedNotifications = notificationsArr.slice(length - 30)
            }
            else {
                splittedNotifications = notificationsArr.slice(0)
            }
            setNotifications(splittedNotifications)
        }
    }

    const listEmptyComponent = () => {
        <SafeAreaView style={styles.notification}>
            <SafeAreaView style={styles.notificationIcons}>
                <Ionicons name="ios-notifications-outline" size={100} color={colors.text} />
                <MaterialCommunityIcons name="numeric-0-circle" size={45} color={"red"} style={styles.notificationIcon}/>
            </SafeAreaView>
            <CustomText>{languages.noNotifications}</CustomText>
        </SafeAreaView>
    }

    const renderItem = ({ item, index }) => {
        return <Notification data={item} index={index} navigation={navigation} />
    }

    const keyExtractor = (notification) => {
        return notification.id.toString()
    }

    const backgroundStyle = () => {
        return { backgroundColor: colors.background }
    }

    const textStyle = () => {
        return { color: colors.text }
    }

    useEffect(() => {
        getNotifications()
    }, [])

    if (notifications === null)
        return (
            <SafeAreaView style={styles.notification}>
                <SafeAreaView style={styles.notificationIcons}>
                    <Ionicons name="ios-notifications-outline" size={100} color={colors.text} />
                    <MaterialCommunityIcons name="numeric-0-circle" size={45} color={"red"} style={styles.notificationIcon}/>
                </SafeAreaView>
                <CustomText style={textStyle()}>{languages.noNotifications}</CustomText>
            </SafeAreaView>
        )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={notifications}
                ListEmptyComponent={listEmptyComponent}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                style={backgroundStyle()}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notification: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationIcons: {
        alignItems: 'center'
    },
    notificationIcon: {
        position: 'absolute',
        top: '0%',
        right: '-1%'
    }
})