import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'


export function CustomText(props) {
    const defaultStyle = { fontFamily: 'Open Sans' }
    //const incomingStyle = Array.isArray(props.style) ? props.style : [props.style]
    return <Text {...props} style={[defaultStyle, props.style]}>{props.children}</Text>
}

export function CustomView(props) {
    return <SafeAreaView style={[styles.viewStyle, props.style]} {...props}>{props.children}</SafeAreaView>
}

const styles = StyleSheet.create({
    viewStyle: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})

/* if (Platform.OS === 'ios')
        return <SafeAreaView {...props}>{props.children}</SafeAreaView>
else 
    return <View style={[viewStyle, ...props.style]} {...props}>{props.children}</View> */