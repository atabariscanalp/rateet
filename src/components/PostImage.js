import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

export const MemoizedImage = React.memo(({ image, imgHeight, imgWidth }) => {
    
    const getUri = () => {
        return {uri: image}
    }

    const setImageHeight = () => {
        const imgRatio  = imgHeight / imgWidth
        const width = Dimensions.get('window').width
        return { height: imgRatio * width }
    }

    return (
        <FastImage 
            source={getUri()} 
            style={[styles.image, setImageHeight()]} 
            resizeMethod={FastImage.resizeMode.contain}
        />
    )
})

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%'
    },
})