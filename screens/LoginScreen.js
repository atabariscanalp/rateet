import React, { useState } from 'react'
import { SafeAreaView, TextInput, StyleSheet, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { connect, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

import { login } from '../src/actions/auth'
import { getLoginErrorInfo } from '../src/constants/selector'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function LoginScreen({login, navigation}) {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const error = useSelector(getLoginErrorInfo)

    const handleLogin = () => {
        login(username, password)
        setLoading(true)

        if (error !== undefined && error !== null && Object.values(error).length > 0) {
            setLoading(false)
            console.log("not loading!")
        }
    }

    const errorMessage = languages.loginErrorMessage
    const logo = require('../assets/icons/rateet_logo/adjusted_logo.png')

    const forgotPassword = () => navigation.navigate('forgot-password')

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <Image style={styles.logo} source={logo} />
            {error !== undefined && error !== null && Object.values(error).length > 0 ? <CustomText style={styles.errorMessage}>{errorMessage}</CustomText> : null}
            <SafeAreaView style={styles.action}>
                <Feather
                    name="user"
                    color="#D3D3D3"    
                    size={20}
                    style={styles.actionIcon} 
                />
                <TextInput 
                    placeholder={languages.usernamePlaceholder}
                    placeholderTextColor="#8f8f8f"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setUsername(val)}
                    returnKeyType="next"
                />
            </SafeAreaView>
            <SafeAreaView style={styles.action}>
                <Feather
                    name="lock"
                    color="#D3D3D3"    
                    size={20} 
                    style={styles.actionIcon}
                />
                <TextInput 
                    placeholder={languages.passwordPlaceholder}
                    placeholderTextColor="#8f8f8f"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    onSubmitEditing={handleLogin}
                    returnKeyType="send"
                />
            </SafeAreaView>
            <CustomText onPress={forgotPassword} style={styles.forgotPassword}>{languages.forgotPassword}</CustomText>
            <Button
                mode="contained"
                color="#fb8208" 
                labelStyle={styles.loginText}
                contentStyle={styles.contentStyle}
                style={styles.loginBtn} 
                onPress={handleLogin}
                loading={loading}
            >
                {languages.login}
            </Button>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    action: {
        flexDirection: 'row',
        marginBottom: '6%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2e2e2e',
        height: '7%'
    },
    actionIcon: {
        marginLeft: '2%'
    },
    logo: {
        width: 220,
        height: 80,
        resizeMode: 'stretch',
        marginBottom: '20%',
        marginTop: 30
    },
    textInput: {
        flex: 0.6,
        paddingLeft: 10,
        color: '#d3d3d3',
        marginTop: 0
    },
    loginBtn: {
        marginTop: '5%', 
        width: '62%',
        height: 45
    },
    loginInner: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 0.6
    },
    loginText: {
        color: 'black', 
        fontSize: responsiveScreenFontSize(2.3), 
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    forgotPassword: {
        color: '#00BFFF',
        fontSize: responsiveScreenFontSize(1.5),
        alignSelf: 'center',
        marginLeft: languages.getInterfaceLanguage().substring(0,2) === 'en' ? '36%' : '32%',
        marginBottom: '5%',
        marginTop: '-3%'
    },
    errorMessage: {
        color: 'red',
        marginTop: '-5%',
        marginBottom: '6%',
        width: '65%'
    },
    contentStyle: {
        width: '100%', 
        marginTop: '1.5%'
    }
})


export default connect(null, { login })(LoginScreen)