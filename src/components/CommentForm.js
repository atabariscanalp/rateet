import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView, Platform } from 'react-native'
import { connect, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

import { addComment, replyComment } from '../actions/posts'
import { getAuthenticatedUser } from '../constants/selector'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { CustomText } from '../../shared/components'
import languages from '../languages/Languages'

export function CommentForm({postId, addComment, replyComment, navigation, commentCount, commentRef, parentId}) {

    //SELECTORS
    const user = useSelector(getAuthenticatedUser)
    //STATES
    const [text, setText] = useState('')
    //THEME
    const { colors } = useTheme()
    //VARIABLES
    const usernameStyle = {marginTop: 3, fontWeight: 'bold', marginLeft: 5, color: colors.comment, fontSize: responsiveScreenFontSize(1.7)}
    const postStyle = {fontWeight: 'bold', opacity: text.length > 0 ? 1 : 0.3, color: colors.comment, marginLeft: '3%', alignSelf: 'flex-start', marginTop: '2%', fontSize: responsiveScreenFontSize(1.7)}
    //METHODS
    const onSubmit = (text) => {
        if (text.length > 0){
            if (parentId !== 0 && parentId !== null && parentId !== undefined) {
                replyComment(text, parentId, postId)
            } else {
                addComment(text, postId)
            }

            setText('')
            Keyboard.dismiss()

            if (commentCount >= 3)
                navigation.navigate('CommentDetail', { postId: postId })
        } else {
            null
        }
    }
    const navigateToProfile = () => navigation.navigate('Profile', { screen: 'profile', params: {username: user.username, id: user.pk}})
    const onSubmitEditing = text => {onSubmit(text)}
    const onChangeText = text => setText(text)


    return (
        <SafeAreaView style={styles.input}>
            <TouchableOpacity style={styles.userInfo} onPress={navigateToProfile}>
                <MemoizedProfilePhoto size={26} userId={user.pk} />
                <CustomText style={usernameStyle}>{user.username}</CustomText>
            </TouchableOpacity>
            <SafeAreaView style={styles.inputSafeAreaView}>
                {/* <MentionInput 
                    multiline
                    numberOfLines={7}  
                    textAlignVertical="bottom" 
                    style={[styles.textInput, {color: colors.comment}]} 
                    autoCapitalize="sentences" 
                    onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text)} 
                    blurOnSubmit={true} 
                    onChangeText={onChangeText} 
                    value={text} 
                    placeholder={languages.commentFormPlaceholder}
                    placeholderTextColor={colors.placeholder} 
                    returnKeyType="send"
                    ref={commentRef ? commentRef : null}
                    partTypes={}
                /> */}
                <TextInput  
                    multiline 
                    numberOfLines={7}  
                    textAlignVertical="bottom" 
                    style={[styles.textInput, {color: colors.comment}]} 
                    autoCapitalize="sentences" 
                    onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text)} 
                    blurOnSubmit={true} 
                    onChangeText={onChangeText} 
                    value={text} 
                    placeholder={languages.commentFormPlaceholder}
                    placeholderTextColor={colors.placeholder} 
                    returnKeyType="send"
                    ref={commentRef ? commentRef : null}
                    //onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                />
                <CustomText style={postStyle} onPress={() => onSubmitEditing(text)}>{languages.postComment}</CustomText>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: '4%',
    },
    userInfo: {
        flexDirection: 'row', 
        marginTop: 2, 
        marginRight: '3%',
        alignContent: 'center'
    },
    inputSafeAreaView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginRight: '5%',
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 60,
        textAlignVertical: 'center',
        paddingVertical: 0,
        paddingBottom: Platform.OS === 'ios' ? 30 : 32,
        fontSize: responsiveScreenFontSize(1.6),
        marginTop: 1
    },
})

export default connect(null, { addComment, replyComment })(CommentForm)