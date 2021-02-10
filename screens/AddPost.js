import React from 'react'
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'

import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export default function AddPost({navigation}) {

    const takePhoto = () => {
        ImagePicker.openCamera({
            //IOS ONLY
            cropperChooseText: languages.cropperChooseText,
            cropperCancelText: languages.cropperCancelText,
            loadingLabelText: languages.loadingLabelText,
            //IOS & ANDROID
            cropperToolbarTitle: languages.cropperToolbarTitle,
            useFrontCamera: true,
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
                navigation.navigate('add-post-after', {image: image})
          }).catch(err => {
                console.log(err)
                navigation.goBack()
          })
    }

    const choosePhotoFromGallery = () => {
        ImagePicker.openPicker({
            //IOS ONLY
            cropperChooseText: languages.cropperChooseText,
            cropperCancelText: languages.cropperCancelText,
            loadingLabelText: languages.loadingLabelText,
            //IOS & ANDROID
            cropperToolbarTitle: languages.cropperToolbarTitle,
            useFrontCamera: true,
            width: 300,
            height: 400,
            cropping: false,
          }).then(image => {
                console.log(image)
                navigation.navigate('add-post-after', {image: image})
          }).catch(err => {
                console.log(err)
                navigation.goBack()
          })
    }

    const choosePhotoOnPress = () => {choosePhotoFromGallery(); setIsVisible(false)}
    const takePhotoOnPress = () => {takePhoto(); setIsVisible(false)}

    const { colors } = useTheme()
    const [isVisible, setIsVisible] = useState(true)
    const goBack = () => navigation.goBack()

    const choosePhotoColor = '#FF8C00'
    const takePhotoColor = '#8A2BE2'
    const cancelColor = '#d00'

    return (
            <Modal 
                isVisible={isVisible}
                coverScreen={false}
                onBackButtonPress={goBack}
                onBackdropPress={goBack}
                style={styles.modalSyle}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.3}
            >
                <SafeAreaView style={[styles.container, {backgroundColor: colors.modal}]}>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={choosePhotoOnPress}>
                        <Ionicons name="ios-library" size={25} color={choosePhotoColor} />
                        <CustomText style={[styles.text, {color: choosePhotoColor}]}>{languages.choosePhotoFromGallery}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={takePhotoOnPress}>
                        <Ionicons name="camera" size={25} color={takePhotoColor} />
                        <CustomText style={[styles.text, {color: takePhotoColor}]}>{languages.takePhoto}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchableOpacity, {marginBottom: '3%'}]} onPress={goBack}>
                        <MaterialIcons name="cancel" size={25} color={cancelColor} />
                        <CustomText style={[styles.text, {color: cancelColor}]}>{languages.cancel}</CustomText>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '26%',
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
    modalSyle: {
        justifyContent: 'flex-end', 
        margin: 0
    }
})