import React, { memo, useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect, useSelector } from 'react-redux'
import { muteVideos } from '../actions/posts'
import { getMutedInfo } from '../constants/selector'

const MemoizedVideo = memo(({ video, videoHeight, videoWidth, isVideoPaused, muteVideos }) => {

    const muted = useSelector(getMutedInfo)
    const [pressed, setPressed] = useState(false)

    const volumeIcon = (     
        <SafeAreaView style={styles.iconView}>
            <Ionicons name="ios-volume-high-outline" size={17} color={"white"} />
        </SafeAreaView>   
    )
    
    const muteIcon = (
        <SafeAreaView style={styles.iconView}>
            <Ionicons name="ios-volume-mute-outline" size={17} color={"white"} />
        </SafeAreaView>
    )

    const setVideoHeight = () => {
        const videoRatio = videoHeight / videoWidth
        const width = Dimensions.get('window').width
        return { height: videoRatio * width, width: width }
    }

    const getUri = () => {
        return { uri: video }
    }

    const onPress = () => {
        muteVideos()
        setPressed(true)
    }

    useEffect(() => {
        if (pressed) {
            setTimeout(() => {
                setPressed(false)
            }, 2000)
        }
    }, [pressed])

    return (
        <SafeAreaView style={setVideoHeight()}>
            <TouchableWithoutFeedback style={styles.view} onPress={onPress}>
                <Video 
                    source={getUri()} 
                    style={styles.video} 
                    repeat={true} 
                    resizeMode="stretch"
                    playWhenInactive={false} 
                    paused={isVideoPaused} 
                    playInBackground={false} 
                    muted={muted}
                    />  
            </TouchableWithoutFeedback>
            {pressed ? (muted ? muteIcon : volumeIcon) : null}
        </SafeAreaView>
    )
})

export default connect(null, { muteVideos })(MemoizedVideo)


const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    icon: {
        position: 'absolute',
        bottom: '5%',
        right: '4%'
    },
    view: {
       width: '100%',
       height: '100%',
       flex: 1 
    },
    iconView: {
        backgroundColor: 'black', 
        opacity: 0.8, 
        borderRadius: 15, 
        width: 30, 
        height: 30, 
        position: 'absolute', 
        bottom: '5%', 
        right: '4%', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})