import React, { useState } from 'react' 
import { SafeAreaView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'

import { CustomText } from '../shared/components'
import { resetPasswordConfirm } from '../src/actions/auth'
import languages from '../src/languages/Languages'

export function ChangePasswordScreen({ route, navigation, resetPasswordConfirm }) {

    const { uid, token } = route.params

    const numericPasswordRegex = /^\d+$/
    const atLeastOneDigitRegex = /\d/

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [password1Error, setPassword1Error] = useState("")
    const [password2Error, setPassword2Error] = useState("")

    const onPassword1Change = (val) => {
        setPassword1(val)
        if (val.length < 8) setPassword1Error(languages.passwordError1)
        else if (numericPasswordRegex.test(val)) setPassword1Error(languages.passwordError2)
        else if (!atLeastOneDigitRegex.test(val)) setPassword1Error(languages.passwordError3)
    }

    const onPassword2Change = (val) => {
        setPassword2(val)
        if (val !== password1) setPassword2Error(languages.samePasswordError)
        else if (val.length < 8) setPassword2Error(languages.passwordError1)
        else if (numericPasswordRegex.test(val)) setPassword2Error(languages.passwordError2)
        else if (!atLeastOneDigitRegex.test(val)) setPassword2Error(languages.passwordError3)
    }

    const onSubmit = () => {
        resetPasswordConfirm(uid, token, password1, password2)
        navigation.navigate('login')
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <CustomText style={styles.title}>{languages.changePassword}</CustomText>
            <SafeAreaView style={styles.actions}>
                <SafeAreaView style={styles.action}>
                    <CustomText style={styles.actionText1}>{languages.newPassword1}</CustomText>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={onPassword1Change}
                        returnKeyType="next"
                    />
                </SafeAreaView>
                {password1Error ? <CustomText style={styles.errorMsg}>{password1Error}</CustomText> : null}
                <SafeAreaView style={styles.action}>
                    <CustomText style={styles.actionText2}>{languages.newPassword2}</CustomText>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={onPassword2Change}
                        returnKeyType="send"
                    />
                </SafeAreaView>
                {password2Error ? <CustomText style={styles.errorMsg}>{password2Error}</CustomText> : null}
            </SafeAreaView>
            <Button 
                mode="contained"
                onPress={onSubmit}
                uppercase={true}
                style={styles.button}
                labelStyle={styles.labelStyle}
                color={'#fb8208'}  
            >
                {languages.setPassword}
          </Button>	
        </KeyboardAwareScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    actions: {
        marginTop: '15%',
        marginBottom: '-25%'
    },
    textInput: {
        backgroundColor: '#2e2e2e',
        width: '59%',
        color: 'white',
        height: '95%',
        paddingLeft: '3%',
        borderRadius: 4
    },
    action: {
        flexDirection: 'row',
        marginBottom: '9%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '15%',
        width: '85%'
    },
    actionText1: {
        color: 'white',
        marginRight: '24%'
    },
    actionText2: {
      color: 'white',
      marginRight: '11%'  
    },
    title: {
        color: 'white',
        fontSize: responsiveScreenFontSize(4)
    },
    button: {
        width: '85%',
        height: 45
    },
    labelStyle: {
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        color: 'black',
        fontSize: responsiveScreenFontSize(2.1)
    },
    errorMsg: {
        color: '#ff0000',
        marginTop: '2%',
        maxWidth: '75%'
    }
})

export default connect(null, { resetPasswordConfirm })(ChangePasswordScreen)