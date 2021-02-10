import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput, Keyboard, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'

import { CustomText } from '../shared/components'
import { updateFirstName, updateLastName } from '../src/actions/user'
import languages from '../src/languages/Languages'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export function AddProfileInfoScreen({navigation, updateLastName, updateFirstName}) {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isValidFirstName, setIsValidFirstName] = useState(true)
    const [isValidLastName, setIsValidLastName] = useState(true)
    const nameRegex = /^[a-zA-Z]{0,15}$/

    const hasWhitespace = (val) => {
        return val.indexOf(' ') >= 0
    }

    const handleValidFirstName = (val) => {
        if (hasWhitespace(val)) setIsValidFirstName(false)
        if (nameRegex.test(val)){
            setIsValidFirstName(true)
        } else {
            setIsValidFirstName(false)
        }
    }
    const handleValidLastName = (val) => {
        if (hasWhitespace(val)) setIsValidLastName(false)
        if (nameRegex.test(val)){
            setIsValidLastName(true)
        } else {
            setIsValidLastName(false)
        }
    }

    const handleSubmit = () => {
        if (isValidFirstName) updateFirstName(firstName)
        if (isValidLastName) updateLastName(lastName)
        navigation.navigate('add-profile-photo')
    }
    const dissmissKeyboard = () => Keyboard.dismiss()

    const onFirstNameChange = (val) => {setFirstName(val); handleValidFirstName(val)}
    const onLastNameChange = (val) => {setLastName(val); handleValidLastName(val)}

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={dissmissKeyboard} style={styles.touchableView} accessible={false}>
                <CustomText style={styles.addInfoTitle}>{languages.addProfileInfo}</CustomText>
                {isValidFirstName ? null : <CustomText style={styles.errorMsg}>{languages.firstNameErrorMsg}</CustomText>}
                <SafeAreaView style={styles.action}>
                    <Feather
                        name="user"
                        color="#D3D3D3"    
                        size={20} 
                        style={styles.actionIcon}
                    />
                    <TextInput 
                        placeholder={languages.firstNamePlaceholderOptional}
                        placeholderTextColor="grey"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={onFirstNameChange}
                        returnKeyType="next"
                    />
                </SafeAreaView>
                {isValidLastName ? null : <CustomText style={styles.errorMsg}>{languages.firstNameErrorMsg}</CustomText>}
                <SafeAreaView style={styles.action}>
                    <Feather
                        name="user"
                        color="#D3D3D3"    
                        size={20} 
                        style={styles.actionIcon}
                    />
                    <TextInput 
                        placeholder={languages.lastNamePlaceholderOptional}
                        placeholderTextColor="grey"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={onLastNameChange}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                </SafeAreaView>
                <TouchableWithoutFeedback onPress={handleSubmit} style={styles.button}>
                    <Button
                        mode="contained"
                        color="#fb8208" 
                        labelStyle={styles.buttonLabel}
                        contentStyle={styles.contentStyle}
                        style={styles.buttonStyle} 
                        onPress={handleSubmit}
                    >
                        {languages.next}
                    </Button>
                </TouchableWithoutFeedback>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default connect(null, { updateFirstName, updateLastName })(AddProfileInfoScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    touchableView: {
        flex: 1, 
        width: width, 
        height: height, 
        alignItems: 'center',
        /* backgroundColor: 'red'  */       
    },
    action: {
        flexDirection: 'row',
        paddingBottom: 2,
        width: '75%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2e2e2e',
        marginBottom: '12%',
        height: '7%'
    },
    actionIcon: {
        marginLeft: '5%'
    },
    textInput: {
        flex: 1,
        paddingLeft: '5%',
        color: '#d3d3d3',
        fontSize: responsiveScreenFontSize(1.9),
    },
    buttonLabel: {
        color: 'black', 
        fontSize: responsiveScreenFontSize(2.4), 
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    button: {
        width: '100%',
        marginTop: '3%',
        height: '25%',
        backgroundColor: 'red'
    },
    errorMsg: {
        color: 'red',
        marginBottom: '2%'
    },
    addInfoTitle: {
        color: 'white',
        marginTop: '16%',
        marginBottom: '15%',
        fontSize: responsiveScreenFontSize(4),
        fontFamily: 'Open Sans'
    },
    contentStyle: {
        width: '100%', 
        marginTop: '1.5%'
    },
    buttonStyle: {
        flex: 1
    }
})