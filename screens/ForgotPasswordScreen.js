import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'

import { CustomText } from '../shared/components'
import { resetPassword } from '../src/actions/auth'
import languages from '../src/languages/Languages'

const ForgotPasswordScreen = ({ resetPassword, navigation }) => {

    const [email, setEmail] = useState("")

    const onChangeText = text => setEmail(text)
    const onSubmit = () => 
    {
      resetPassword(email)
      navigation.navigate('password-reset-sent')
    }

    return (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.titles}>
            <CustomText style={styles.title}>{languages.forgotPasswordTitle}</CustomText>
            <SafeAreaView style={styles.subtitleView}>
              <CustomText style={styles.subtitle}>{languages.enterEmailToResetPassword}</CustomText>
            </SafeAreaView>	
          </SafeAreaView>
          <TextInput 
            placeholder={languages.emailAddressPlaceholder}
            placeholderTextColor="#8f8f8f"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            returnKeyType="send"
            keyboardType="email-address"
          />
          <Button 
            mode="contained"
            onPress={onSubmit}
            uppercase={true}
            style={styles.button}
            labelStyle={styles.labelStyle}
            color={'#fb8208'}  
          >
            {languages.sendEmail}
          </Button>	
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: 'black',
    fontSize: responsiveScreenFontSize(2.1)
  },
  button: {
    width: '85%',
    height: 45
  },
  titles: {
    position: 'absolute',
    top: '15%'
  },
  title: {
    color: 'white',
    fontSize: responsiveScreenFontSize(4.2),
    marginBottom: '3%'
  },
  subtitle: {
    color: '#aaa',
    fontSize: responsiveScreenFontSize(1.8),
  },
  textInput: {
    width: '85%',
    marginBottom: '12%',
    height: 45,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 7,
    paddingLeft: '3%',
    color: 'white',
  },
  subtitleView: {
    maxWidth: '89%',
    alignSelf: 'center'
  }
})

export default connect(null, { resetPassword })(ForgotPasswordScreen)
