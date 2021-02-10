import React, { memo } from 'react'
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import Video from 'react-native-video'

export const MemoizedVideo = memo(({ video, videoHeight, videoWidth, isVideoPaused }) => {

    const setVideoHeight = () => {
        const videoRatio = videoHeight / videoWidth
        const width = Dimensions.get('window').width
        return { height: videoRatio * width, width: width }
    }

    const getUri = () => {
        return { uri: video }
    }

    return (
        <SafeAreaView style={setVideoHeight()}>
            <Video 
                source={getUri()} 
                style={styles.video} 
                repeat={true} 
                resizeMode="stretch"
                playWhenInactive={false} 
                paused={isVideoPaused} 
                playInBackground={false} 
            />          
        </SafeAreaView>
    )
})


const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
})