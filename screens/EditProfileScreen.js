import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, ImageBackground, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { connect, useSelector } from 'react-redux'
import { useTheme, TextInput as PaperInput } from 'react-native-paper'

import { updateFirstName, updateLastName, uploadProfilePhoto } from '../src/actions/user'
import { getAuthenticatedUser } from '../src/constants/selector'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export function EditProfileScreen({navigation, uploadProfilePhoto, updateFirstName, updateLastName}) {

    const [isVisible, setIsVisible] = useState(false)
    const user = useSelector(getAuthenticatedUser)
    const username = user.username
    const profilePhoto = user.profile_photo
    const firstName = user.first_name
    const lastName = user.last_name
    const email = user.email

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    
    const { colors } = useTheme()

    const submitFirstName = () => {
        if (isValidFirstName)
            updateFirstName(fName)
    }

    const submitLastName = () => {
        if (isValidLastName)
            updateLastName(lName)
    }
    const takePhoto = () => {
        setIsVisible(false)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: "photo"
          }).then(image => {
                const formData = new FormData()
                const img = {
                    name: "profilephoto.jpg",
                    type: 'image/jpeg',
                    size: image.size,
                    uri: Platform.OS === 'ios' ? image.path.replace("file://", "") : image.path
                }
                formData.append("profile_photo", img)
                uploadProfilePhoto(formData, user.pk)
          }).catch(err => {
                console.log(err)
                navigation.goBack()
          })
    }

    const choosePhotoFromGallery = () => {
        setIsVisible(false)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: "photo"
          }).then(image => {
                const formData = new FormData()
                const img = {
                    name: "profilephoto.jpg",
                    type: 'image/jpeg',
                    size: image.size,
                    uri: Platform.OS === 'ios' ? image.path.replace("file://", "") : image.path
                }
                formData.append("profile_photo", img)
                uploadProfilePhoto(formData, user.pk)
          }).catch(err => {
                console.log(err)
                navigation.goBack()
          })
    }

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

    const dissmissKeyboard = () => Keyboard.dismiss()
    const getProfileUri = () => profilePhoto ? {uri: profilePhoto} : require('../assets/images/default-profile-pic.jpg')
    const onPress = () => {setIsVisible(true); Keyboard.dismiss()}
    const onFirstNameChange = val => {setFName(val); handleValidFirstName(val)}
    const onFirstNameSubmit = () => {submitFirstName()}
    const onLastNameChange = val => {setLName(val); handleValidLastName(val)}
    const onLastNameSubmit = () => {submitLastName()}

    const firstNameStyle = {width: '25%', color: colors.text, marginTop: '5%'}
    const fnInputStyle = {backgroundColor: colors.textInputBackground, color: colors.text}
    const lastNameStyle = {width: '25%', color: colors.text, marginTop: '5%'}
    const lnInputStyle = {backgroundColor: colors.textInputBackground, color: colors.text}
    const usernameAndEmailStyle = {width: '25%', color: colors.text, marginTop: '5%'}

    return (
        <TouchableWithoutFeedback onPress={dissmissKeyboard}>
            <SafeAreaView style={styles.container}>
                <ImageBackground 
                source={getProfileUri()} 
                borderRadius={10} 
                style={styles.profilePhoto} 
                imageStyle={{opacity: 0.4}} >
                    <TouchableOpacity 
                    style={styles.cameraStyle} 
                    onPress={onPress}>
                        <Ionicons name="camera" size={58} color="#fff" style={styles.iconStyle} />
                    </TouchableOpacity>
                </ImageBackground>
                <SafeAreaView>
                    <SafeAreaView style={styles.action}>
                        <CustomText style={firstNameStyle}>{languages.firstName}</CustomText>
                        <PaperInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={firstName}
                            placeholderTextColor={colors.text}
                            onChangeText={onFirstNameChange}
                            blurOnSubmit={true}
                            onSubmitEditing={onFirstNameSubmit}
                            mode="outlined"
                            value={fName}
                            style={[styles.input, fnInputStyle]}
                            clearTextOnFocus={true}
                            returnKeyType="send"
                            error={!isValidFirstName}
                        />
                    </SafeAreaView>
                    {isValidFirstName ? null : 
                            <CustomText style={styles.firstNameError}>
                                {languages.enterValidFirstName}
                            </CustomText>}
                    <SafeAreaView style={styles.action}>
                        <CustomText style={lastNameStyle}>{languages.lastName}</CustomText>
                        <PaperInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={lastName}
                            placeholderTextColor={colors.text}
                            onChangeText={onLastNameChange}
                            blurOnSubmit={true}
                            onSubmitEditing={onLastNameSubmit}
                            mode="outlined"
                            value={lName}
                            style={[styles.input, lnInputStyle]}
                            clearTextOnFocus={true}
                            returnKeyType="send"
                            error={!isValidLastName}
                        />
                    </SafeAreaView>
                    {isValidLastName ? null : 
                            <CustomText style={styles.firstNameError}>
                                {languages.enterValidLastName}
                            </CustomText>}
                    <SafeAreaView style={styles.action}>
                        <CustomText style={usernameAndEmailStyle}>{languages.username}</CustomText>
                        <PaperInput
                            placeholder={username}
                            placeholderTextColor={"#808080"}
                            mode="outlined"
                            editable={false}
                            style={[styles.input, {backgroundColor: colors.textInputBackground}]}
                        />
                    </SafeAreaView>
                    <SafeAreaView style={styles.action}>
                        <CustomText style={usernameAndEmailStyle}>{languages.email}</CustomText>
                        <PaperInput
                            placeholder={email}
                            placeholderTextColor={'#808080'}
                            mode="outlined"
                            editable={false}
                            style={[styles.input, {backgroundColor: colors.textInputBackground}]}
                        />
                    </SafeAreaView>
                </SafeAreaView>
                <Modal 
                    isVisible={isVisible}
                    coverScreen={false}
                    onBackButtonPress={() => {setIsVisible(false)}}
                    onBackdropPress={() => {setIsVisible(false)}}
                    style={{justifyContent: 'flex-end', margin: 0}}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.3}
                    swipeDirection="down"
                    onSwipeComplete={() => setIsVisible(false)}
                    useNativeDriver={false}
                >
                    <SafeAreaView style={[styles.modalContainer, {backgroundColor: colors.modal}]}>
                        <SafeAreaView style={styles.dragLineView} />
                        <TouchableOpacity style={styles.touchableOpacity} onPress={choosePhotoFromGallery}>
                            <Ionicons name="ios-library" size={25} color={'#FF8C00'} />
                            <CustomText style={[styles.text, {color: '#FF8C00'}]}>{languages.choosePhotoFromGallery}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableOpacity} onPress={takePhoto}>
                            <Ionicons name="camera" size={25} color={'#8A2BE2'} />
                            <CustomText style={[styles.text, {color: '#8A2BE2'}]}>{languages.takeOnlyPhoto}</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchableOpacity, {marginBottom: '4%'}]} onPress={() => {setIsVisible(false)}}>
                            <MaterialIcons name="cancel" size={25} color={'#d00'} />
                            <CustomText style={[styles.text, {color: '#d00'}]}>{languages.cancel}</CustomText>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        height: '28%',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderRadius: 6
    },
    touchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        flexDirection: 'row'
    },
    text: {
        fontSize: responsiveScreenFontSize(2.1),
        marginLeft: 10,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '5%',
    },
    input: {
        marginLeft: '3%',
        width: '63%',
        marginTop: '5%',
        height: 40
    },
    profilePhoto: {
        width: 125,
        height: 125,
        borderRadius: 20,
        alignSelf: 'center',
        opacity: 0.7,
        marginTop: '12%'
    },
    dragLineView: {
        borderWidth: 1.5, 
        borderRadius: 10, 
        borderColor: '#708090',
        height: '3%', 
        marginTop: '2%', 
        backgroundColor: '#708090', 
        width: '10%', 
        alignSelf: 'center'
    },
    iconStyle: {
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    firstNameError: {
        color: 'red',
        marginTop: '3%', 
        marginLeft: '33%'
    }
})

export default connect(null, { uploadProfilePhoto, updateFirstName, updateLastName })(EditProfileScreen)