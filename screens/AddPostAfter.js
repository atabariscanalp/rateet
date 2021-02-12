import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Image, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { connect, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import { TextInput as PaperInput } from 'react-native-paper'

import { addPost } from '../src/actions/posts'
import { getAuthenticatedUser } from '../src/constants/selector'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'


export function AddPostAfter({navigation, route, addPost}) {

    const { colors } = useTheme()
    const { image } = route.params
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(0)
    const user = useSelector(getAuthenticatedUser)

    const addPostHandle = () => {
        const formData = new FormData()
        const img = {
            name: image.mime === 'video/mp4' ? 'video.mp4' : 'img.jpg',
            type: image.mime,
            size: image.size,
            uri: Platform.OS === 'ios' ? image.path.replace("file://", "") : image.path
        }
        formData.append(image.mime === 'video/mp4' ? 'video' : 'image', img)
        formData.append("title", title)
        formData.append("category", category)
        if (!(category === null)){
            addPost(formData, user.pk)
            setTitle('')
            setCategory(0)
        } 
        navigation.navigate('home', {screen: 'home'})
    }

    const placeholder = {
        label: languages.categoryPlaceholder,
        value: null,
        color: '#8f8f8f'
    }

    const navigateToHome = () => navigation.navigate('home')
    const dissmissKeyboard = () => Keyboard.dismiss()
    const onChangeText = text => setTitle(text)
    const onValueChange = (val, index) => setCategory(val)
    const getUri = () => {return {uri: image.path}}

    const postStyle = {opacity: category === 0 || category === null || title === null || title === "" ? 0.3 : 1, color: colors.text}
    const titleStyle = {fontSize: responsiveScreenFontSize(1.9), fontWeight: 'bold', color: colors.text, marginRight: '11.5%'}
    const categoryStyle = {fontSize: responsiveScreenFontSize(1.9), fontWeight: 'bold', color: colors.text, marginRight: '4%', marginTop: '2%'}

    const pickerIOSStyle = {
        inputIOSContainer: {
            width: '100%',
            alignItems: 'center',                                        
        },
        inputIOS: {
            color: 'black',
            width: '100%',
            textAlign: 'center'
        },
        placeholder: {
            color: '#8f8f8f'
        },
        viewContainer: {
            width: '65%',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.inputBorderColor,
            backgroundColor: colors.inputBackgroundColor,
            borderRadius: 4,
            borderWidth: 1,
            height: 38,
            position: 'absolute',
            left: '31%',
        }
    }

    const pickerAndroidStyle = {
        placeholder: {
            color: '#8f8f8f'
        },
        inputAndroid: {
            color: colors.text,
            textAlign: 'center',
            borderColor: colors.inputBorderColor,
            borderWidth: 1,
            width: '100%',
            borderRadius: 4,
            backgroundColor: colors.inputBackgroundColor,
            marginLeft: '6%'
        },
    }

    const setPicker = () => {
        if (Platform.OS === 'ios') {
            return (
                <RNPickerSelect 
                    onValueChange={onValueChange}
                    placeholder={placeholder}
                    value={category}
                    style={pickerStyle}
                    items={items}
                />
            )
        } else {
            return (
                <SafeAreaView style={styles.inlineCategoryContainer}>
                    <RNPickerSelect 
                        onValueChange={onValueChange}
                        placeholder={placeholder}
                        value={category}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        items={items}
                    />
                </SafeAreaView>
            )
        }
    }

    const pickerStyle = Platform.OS === 'ios' ? pickerIOSStyle : pickerAndroidStyle
    const behavior = Platform.OS === 'ios' ? "padding" : "undefined"

    const items = [
        { label: languages.movies, value: 7, key: 7},
        { label: languages.games, value: 6, key: 6},
        { label: languages.books, value: 8, key: 8},
        { label: languages.sport, value: 1, key: 1},
        { label: languages.fashion, value: 4, key: 4},
        { label: languages.cars, value: 2, key: 2},
        { label: languages.art, value: 5, key: 5},
        { label: languages.foods, value: 9, key: 9},
        { label: languages.landscape, value: 3, key: 3},
        { label: languages.memes, value: 10, key: 10}
    ]

    return (
        <Modal
            isVisible={true}
            coverScreen={false}
            onBackButtonPress={navigateToHome}
            onBackdropPress={navigateToHome}
            style={styles.modalStyle}
            animationIn="slideInRight"
            animationOut="slideOutDown"
            backdropOpacity={0.3}
            swipeDirection="down"
            onSwipeComplete={navigateToHome}
            useNativeDriver={false}
        >
            <KeyboardAvoidingView behavior={behavior} >
                <TouchableWithoutFeedback onPress={dissmissKeyboard}>
                    <SafeAreaView style={[styles.container, {backgroundColor: colors.modal}]}>
                        <SafeAreaView style={styles.dragLineView} />
                        <CustomText 
                            style={[styles.submitText, postStyle]} 
                            onPress={addPostHandle}>
                                {languages.post}
                        </CustomText>
                        <SafeAreaView style={styles.innerContainer}>
                            <Image source={getUri()} style={styles.postImage}/>
                            <SafeAreaView style={styles.thirdContainer}>
                                <SafeAreaView style={styles.titleContainer}>
                                    <CustomText style={titleStyle}>{languages.title} </CustomText>
                                    <PaperInput 
                                        autoCapitalize="words"
                                        onChangeText={onChangeText}
                                        style={styles.inlineInputStyle}
                                        mode="outlined"
                                    />
                                </SafeAreaView>
                                <SafeAreaView style={styles.categoryContainer}>
                                    <CustomText style={categoryStyle}>{languages.category} </CustomText>
                                    {setPicker()}
                                </SafeAreaView>
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        borderRadius: 6
    },
    textInput: {
        alignSelf: 'stretch',
        width: '100%',
        height: 35,
        marginLeft: 4,
        marginTop: 7,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
    },
    submitText: {
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        fontSize: responsiveScreenFontSize(2.3),
        position: 'absolute',
        right: '7%',
        top: '7%'
    },
    dragLineView: {
        borderWidth: 1.5, 
        borderRadius: 10, 
        borderColor: '#708090',
        height: '1%', 
        backgroundColor: '#708090', 
        width: '15%', 
        alignSelf: 'center', 
        position: "absolute", 
        top: '3%'
    },
    innerContainer: {
        flexDirection: 'column', 
        justifyContent: 'space-evenly', 
        alignItems: 'flex-start'
    },
    postImage: {
        width: '100%', 
        height: '60%', 
        resizeMode: 'contain', 
        alignSelf: 'stretch', 
        marginBottom: '4%',
        maxHeight: '65%'
    },
    titleContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    categoryContainer: {
        flexDirection: 'row', 
        marginTop: 17, 
        alignItems: 'center',
    },
    inlineCategoryContainer: {
        width: '65%', 
        marginLeft: '1%', 
        height: 40
    },
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0
    },
    thirdContainer: {
        maxWidth: '100%', 
        marginLeft: '4%'
    },
    inlineInputStyle: {
        height: 38,
        width: '65%', 
        marginLeft: '6%'
    }
})

export default connect(null, { addPost })(AddPostAfter)