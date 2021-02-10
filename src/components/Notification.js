import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Platform, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import TimeAgo from 'react-native-timeago'

import { CustomText } from '../../shared/components'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { MemoizedThumbnail } from './PostThumbnail'

export default function Notification({ data, navigation }) {

    const { colors } = useTheme()

    const sentTime = data.sentTime //Add later!
    const message = data.message
    const senderId = data.senderId
    const postId = data.postId

    const onNotificationPress = () => {
        navigation.navigate('PostDetail', { screen: 'PostDetail', params: { postId: parseInt(postId, 10) } })
    }

    const textStyle = () => {
        return { color: colors.text }
    }

    return (
        <Pressable style={styles.container} onPress={onNotificationPress}>
            <SafeAreaView style={styles.notificationInfo}>
                <SafeAreaView style={styles.userInfo}>
                    <MemoizedProfilePhoto size={45} userId={senderId} />
                </SafeAreaView>
                <CustomText style={textStyle()}>{message}</CustomText>
                <CustomText style={[styles.timeAgo, textStyle()]}><TimeAgo time={Platform.OS === 'ios' ? sentTime * 1000 : sentTime} hideAgo={true} /></CustomText>
            </SafeAreaView>
            <SafeAreaView style={styles.postThumbnail}>
                <MemoizedThumbnail postId={postId} />
            </SafeAreaView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    userInfo: {
        flexDirection: 'row',
        marginRight: '4%',
        marginLeft: '3%'
    },
    notificationInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postThumbnail: {
        marginRight: '5%',
    },
    timeAgo: {
        marginLeft: '3%',
        fontWeight: 'bold'
    },
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
})