import React from 'react'
import { StyleSheet, SafeAreaView, Image, StatusBar } from 'react-native'

export default function SplashScreen() {

    const logo = require('../assets/icons/rateet_logo/adjusted_logo.png')
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Image style={styles.logo} source={logo} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    logo: {
        width: 430,
        height: 170,
        resizeMode: 'stretch',
        marginBottom: '5%'
    }
})