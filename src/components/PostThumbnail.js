import React from 'react'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'

import { getPostImageInfo } from '../constants/selector'
import { useTheme } from '@react-navigation/native'

export const MemoizedThumbnail = React.memo(({ postId }) => {

    const postThumbnail = useSelector(state => getPostImageInfo(state, postId))

    const { colors } = useTheme()

    const getUri = () => {
        if (postThumbnail.imageUri)
            return {uri: postThumbnail.imageUri}
        else
            return {uri: postThumbnail.videoUri}
    }
    if (postThumbnail.imageUri)
        return (
            <FastImage 
                source={getUri()} 
                style={styles.thumbnail} 
                resizeMethod={FastImage.resizeMode.contain}
            />
        )
    else {
        return (
            <Entypo 
                name="video"
                size={35}
                color={colors.text}
            />
        ) 
    }
})

const styles = StyleSheet.create({
    thumbnail: {
        height: 50,
        width: 50
    },
})