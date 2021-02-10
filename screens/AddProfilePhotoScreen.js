import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import { Button } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import Modal from 'react-native-modal'
import { connect, useSelector } from 'react-redux'

import { uploadProfilePhoto } from '../src/actions/user'
import { completeRegistration } from '../src/actions/auth'
import { getAuthenticatedUser } from '../src/constants/selector'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export function AddProfilePhotoScreen({navigation, uploadProfilePhoto, completeRegistration}) {

    const [isVisible, setIsVisible] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [imageAdded, setImageAdded] = useState(false)
    const [image, setImage] = useState({})

    const user = useSelector(getAuthenticatedUser)

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: "photo"
          }).then(image => {
                setImage(image)
                setImageAdded(true)
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
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: "photo"
          }).then(image => {
                setImage(image)
                setImageAdded(true)
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

    const getUri = () => {return {uri: image.path}}
    const userCircle = require('../assets/images/usercircle1.png')
    const changePhotoOnPress = () => {setIsVisible(true); setIsDisabled(true)}
    const onBackButtonPress = () => {setIsVisible(false); setIsDisabled(false)}
    const onModalHide = () => setIsDisabled(false)
    const onSwipeComplete = () => setIsVisible(false)
    const onCancel = () => setIsVisible(false)

    const libraryColor = '#FF8C00'
    const takePhotoColor = '#8A2BE2'
    const cancelColor = '#d00'

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.maxWidth}>    
                <CustomText style={styles.addProfilePhotoText}>{languages.addProfilePhoto}</CustomText>
                <CustomText style={styles.addPhotoTextColor}>{languages.addProfilePhotoSubtitle}</CustomText>
            </SafeAreaView>
            <SafeAreaView style={styles.imageContainer}>
                {imageAdded ? 
                    <Image source={getUri()} style={styles.image}/>
                :
                    <>
                        <Image source={userCircle} style={styles.userCircle} />
                        <MaterialIcons name="add-a-photo" size={90} color="#fb8208" style={styles.addPhotoIcon}/>
                    </>
                }
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                {imageAdded ? 
                    <>
                        <Button
                            mode="contained"
                            color="#fb8208" 
                            uppercase="false"
                            labelStyle={styles.labelStyle}
                            contentStyle={styles.contentStyle} 
                            disabled={isDisabled} 
                            onPress={() => completeRegistration()}>                 
                                {languages.next}
                        </Button>
                        <CustomText 
                            style={styles.changePhotoText} 
                            onPress={changePhotoOnPress}>
                                {languages.changePhoto}
                        </CustomText>
                    </>
                :
                    <>
                        <Button
                            mode="contained"
                            color="#fb8208" 
                            uppercase="false"
                            labelStyle={styles.labelStyle}
                            contentStyle={styles.contentStyle}
                            style={styles.button} 
                            disabled={isDisabled} 
                            onPress={changePhotoOnPress}>
                                {languages.addPhoto}
                        </Button>
                        <CustomText 
                            style={styles.changePhotoText}
                            onPress={() => completeRegistration()}
                            >
                                {languages.skip}
                        </CustomText>
                    </>
                }
                
            </SafeAreaView>
            <Modal 
                isVisible={isVisible}
                coverScreen={false}
                onBackButtonPress={onBackButtonPress}
                onBackdropPress={onBackButtonPress}
                style={styles.modalStyle}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.3}
                onModalHide={onModalHide}
                swipeDirection="down"
                onSwipeComplete={onSwipeComplete}
                useNativeDriver={false}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <SafeAreaView style={styles.dragLineView} />
                    <TouchableOpacity style={styles.touchableOpacity} onPress={choosePhotoFromGallery}>
                        <Ionicons name="ios-library" size={25} color={libraryColor} />
                        <CustomText style={[styles.text, {color: libraryColor}]}>{languages.choosePhotoFromGallery}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={takePhoto}>
                        <Ionicons name="camera" size={25} color={takePhotoColor} />
                        <CustomText style={[styles.text, {color: takePhotoColor}]}>{languages.takeOnlyPhoto}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={onCancel}>
                        <MaterialIcons name="cancel" size={25} color={cancelColor} />
                        <CustomText style={[styles.text, {color: cancelColor}]}>{languages.cancel}</CustomText>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        justifyContent: 'space-evenly'
    },
    modalContainer: {
        height: '28%',
        width: '100%',
        backgroundColor: '#333',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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
    addProfilePhotoText: {
        color: 'white', 
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(4.5),
        marginBottom: '5%'
    },
    image: {
        width: 230,
        height: 230, 
        borderRadius: 115
    },
    addPhotoIcon: {
        position: 'absolute', 
        bottom: '-7%', 
        right: '5%'
    },
    userCircle: {
        width: 300, 
        height: 300
    },
    changePhotoText: {
        color: 'white', 
        textAlign: 'center', 
        marginTop: '4%',
        fontSize: responsiveScreenFontSize(2.1),
        marginBottom: '7%',
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
    button: {
        height: 40
    },
    maxWidth: {
        maxWidth: '75%'
    },
    addPhotoTextColor: {
        color: '#778899'
    },
    imageContainer: {
        justifyContent: 'center', 
        marginBottom: '25%'
    },
    buttonContainer: {
        alignItems: 'stretch', 
        width: '60%'
    },
    labelStyle: {
        color: 'white', 
        fontSize: responsiveScreenFontSize(2)
    },
    contentStyle: {
        width: '100%'
    },
    modalStyle: {
        justifyContent: 'flex-end', 
        margin: 0
    }
})


export default connect(null, { uploadProfilePhoto, completeRegistration })(AddProfilePhotoScreen)