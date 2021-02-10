import React from 'react'
import { SafeAreaView, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export default function GetStartedScreen({navigation}) {

    const logo = require('../assets/icons/rateet_logo/adjusted_logo.png')

    const navigateToRegisterScreen = () => navigation.navigate('register')
    const navigateToLoginScreen = () => navigation.navigate('login')

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/> 
            <Image style={styles.logo} source={logo} />
            <CustomText style={styles.catchword}>{languages.getStartedCatchWord}</CustomText>
            <TouchableOpacity onPress={navigateToRegisterScreen} style={styles.getStarted}>
                <CustomText style={styles.getStartedText}>{languages.getStarted}</CustomText>
            </TouchableOpacity>
            <CustomText style={styles.loginText}>{languages.haveAnAccount} <CustomText style={styles.colorText} onPress={navigateToLoginScreen}>{languages.getStartedLogin}</CustomText></CustomText>            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'black'
    },
    logo: {
        width: 330,
        height: 120,
        resizeMode: 'stretch',
        marginTop: '-5%'
    },
    catchword: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: responsiveScreenFontSize(5.9), 
        paddingLeft: Platform.OS === 'ios' ? '1%' : '13%'
    },
    button: {
        alignItems: 'center',
        width: '50%',
        position: 'relative',
        bottom: 50,
        right: 38
    },
    getStarted: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 50,
        backgroundColor: '#fb8208',
        marginRight: '23%',
        marginTop: '-14%',
        marginBottom: '15%',
        width: '50%'
    },
    loginText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: responsiveScreenFontSize(2),
        flexDirection: 'row',
        marginLeft: '13%',
        marginBottom: '-5%'
    },
    colorText: {
        color: '#fb8208',
        fontSize: responsiveScreenFontSize(2),
        width: '100%'
    },
    getStartedText: {
        color: 'white', 
        fontSize: responsiveScreenFontSize(2.4)
    }
})