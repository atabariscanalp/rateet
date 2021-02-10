import React, {useEffect, useRef, useState} from 'react'
import { SafeAreaView, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { connect, useSelector } from 'react-redux'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import axios from 'axios'

import { register } from '../src/actions/auth'
import { getRegisterFailInfo } from '../src/constants/selector'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'
import { FETCH_URL } from '../src/constants'

export function SignupScreen({navigation, register}) {

    //VARIABLES
    const usernameRegex = /^[a-zA-Z][\w@-]{2,20}$/ //between 2 and 20 chars, only @ _ - allowed
    const numericPasswordRegex = /^\d+$/
    const atLeastOneDigitRegex = /\d/

    //STATES
    const [generalError, setGeneralError] = useState('')
    //username
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    //password
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    //email
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    
    //HOOKS
    const registerFail = useSelector(getRegisterFailInfo)
    const usernameRef = useRef()
    const passwordRef = useRef()

    //METHODS
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const checkIfUsernameIsTaken = () => {
        axios.get(`${FETCH_URL}/api/v1/user/${username}`)
        .then(res => {
            if (res.status === 200) setUsernameError(languages.usernameError3)
        })
        .catch()
    }
    
    const checkIfEmailIsTaken = () => {
        axios.get(`${FETCH_URL}/api/v1/email/${email}`)
        .then(res => {
            console.log(res.data.message)
            if (res.data.message === 'not-valid') setEmailError(languages.emailError2)
        })
        .catch()
    }

    const checkUsernameError = (val) => {
        if (val.length < 2 || val.length > 20) setUsernameError(languages.usernameError1)
        else if (!usernameRegex.test(val)) setUsernameError(languages.usernameError2)
    }

    const checkEmailError = (val) => {
        if (val.length === 0) setEmailError(languages.emailError1)
    }

    const checkPasswordError = (val) => {
        if (val.length < 8) setPasswordError(languages.passwordError1)
        else if (numericPasswordRegex.test(val)) setPasswordError(languages.passwordError2)
        else if (!atLeastOneDigitRegex.test(val)) setPasswordError(languages.passwordError3)
        else if (val === username || val === email) setPasswordError(languages.passwordError4)
    }

    const dissmissKeyboard = () => Keyboard.dismiss()

    const emailOnChangeText = (val) => {
        setEmail(val) 
        if (emailError !== '') setEmailError('')
        if (generalError !== '') setGeneralError('')
        checkEmailError(val)
    }
    const emailOnSubmitEditing = () => {
        /* checkIfEmailIsTaken() */
        usernameRef.current.focus()
    }
    const usernameOnChangeText = (val) => {
        setUsername(val)
        if (usernameError !== '') setUsernameError('')
        if (generalError !== '') setGeneralError('')
        checkUsernameError(val)
    }
    const usernameOnSubmitEditing = () => {
        /* checkIfUsernameIsTaken() */
        passwordRef.current.focus()
    }
    const passwordOnChangeText = (val) => {
        setPassword(val) 
        if (passwordError !== '') setPasswordError('')
        if (generalError !== '') setGeneralError('')
        checkPasswordError(val)
    }

          
    const handleRegister = () => {
        checkIfEmailIsTaken()
        checkIfUsernameIsTaken()
        if (!usernameError && !emailError && !passwordError) register(email, username, password)
        Keyboard.dismiss()
    }

    useEffect(() => {
        if (registerFail)
        {
            setGeneralError(languages.generalError)
        }
    }, [registerFail])

    
    
    const logo = require('../assets/icons/rateet_logo/adjusted_logo.png')

    return (
        <TouchableWithoutFeedback onPress={dissmissKeyboard}>
            <SafeAreaView style={styles.container}> 
                <Image style={styles.logo} source={logo} />
                {generalError ? <CustomText style={styles.generalError}>{generalError}</CustomText> : null}
                <SafeAreaView style={styles.action}>
                    <Feather
                        name="mail"
                        color="#D3D3D3"    
                        size={20}
                        style={styles.actionIcon} 
                    />
                    <TextInput 
                        placeholder={languages.emailPlaceholder}
                        autoFocus={true}
                        placeholderTextColor="grey"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={emailOnChangeText}
                        keyboardType="email-address"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={emailOnSubmitEditing}
                    />
                </SafeAreaView>
                {emailError ? <CustomText style={styles.errorMsg}>{emailError}</CustomText> : null}
                <SafeAreaView style={styles.action}>
                    <Feather
                        name="user"
                        color="#D3D3D3"    
                        size={20} 
                        style={styles.actionIcon}
                    />
                    <TextInput 
                        ref={usernameRef} 
                        placeholder={languages.usernamePlaceholder}
                        placeholderTextColor="grey"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={usernameOnChangeText}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={usernameOnSubmitEditing}
                    />
                </SafeAreaView>
                {usernameError ? <CustomText style={styles.errorMsg}>{usernameError}</CustomText> : null}
                <SafeAreaView style={styles.action}>
                    <Feather
                        name="lock"
                        color="#D3D3D3"    
                        size={20} 
                        style={styles.actionIcon}
                    />
                    <TextInput
                        ref={passwordRef}
                        placeholder={languages.passwordPlaceholder}
                        placeholderTextColor="grey"
                        secureTextEntry={secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={passwordOnChangeText}
                        returnKeyType="send"
                        onSubmitEditing={handleRegister}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {secureTextEntry ? 
                            <Feather 
                                name="eye-off"
                                color="grey"
                                size={20}
                                style={{marginRight: 8}}
                            />
                        :
                            <Feather 
                                name="eye"
                                color="grey"
                                size={20}
                                style={{marginRight: 8}}
                            />
                        }
                    </TouchableOpacity>
                </SafeAreaView>
                {passwordError ? <CustomText style={styles.errorMsg}>{passwordError}</CustomText> : null}
                <Button
                    mode="contained"
                    color="#fb8208" 
                    labelStyle={styles.labelStyle}
                    contentStyle={styles.contentStyle} 
                    onPress={handleRegister}
                    style={styles.buttonStyle}
                >
                    {languages.signUp}
                </Button>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 80,
        resizeMode: 'stretch',
        marginTop: '15%',
        marginBottom: '10%'
    },
    action: {
        flexDirection: 'row',
        paddingBottom: 2,
        width: '75%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2e2e2e',
        height: 45,
        marginBottom: '5%'
    },
    actionIcon: {
        marginLeft: 8
    },
    textInput: {
        flex: 1,
        marginBottom: 2,
        paddingLeft: 10,
        color: '#d3d3d3'
    },
    errorMsg: {
        color: '#ff0000',
        marginBottom: '5%',
        marginTop: '-2%',
        maxWidth: '75%'
    },
    generalError: {
        color: '#ff0000',
        maxWidth: '80%',
        marginTop: '-5%',
        marginBottom: '5%',
        alignSelf: 'center'
    },
    nextButtonSafeAreaView: {
        alignItems: 'stretch',
        width: '70%',
        position: 'relative',
        backgroundColor: '#fb8208',
    },
    nextButton: {
        width: '100%',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20
    },
    nextText: {
        fontSize: 20
    },
    labelStyle: {
        color: 'white', 
        fontSize: responsiveScreenFontSize(2.3), 
        fontWeight: 'bold'
    },
    contentStyle: {
        width: '100%', 
        marginTop: '1.5%'
    },
    buttonStyle: {
        width: '74%', 
        height: 50
    }
})

export default connect(null, { register })(SignupScreen)