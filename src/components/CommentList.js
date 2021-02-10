import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import Comment from './Comment'
import { CustomText } from '../../shared/components'
import languages from '../languages/Languages'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

export default function CommentList({comments, postId, navigation}) {

    //THEME
    const { colors } = useTheme()
    //VARIABLES
    let noReply = true
    const inCommentDetailScreen = false
    const commentCount = Object.values(comments).length
    const moreCommentsStyle = {fontWeight: 'bold', alignSelf: 'center', marginTop: '4%', color: colors.comment, fontSize: responsiveScreenFontSize(1.6)}
    //METHODS
    const navigateToComments = () => navigation.navigate('CommentDetail', {postId: postId})

    for (var i = 0; i < commentCount; i++)
    {
        let obj = Object.values(comments)[i].replies
        if (Object.keys(obj).length > 0)
        {
            noReply = false
            break
        }
    }

    if (commentCount <= 3){
        return (
            <SafeAreaView>
                {Object.values(comments).map((comment) => (
                    <Comment 
                        comment={comment} 
                        postId={postId} 
                        key={comment.id} 
                        navigation={navigation} 
                        inCommentDetailScreen={inCommentDetailScreen}
                    />
                ))}
            {noReply ? null : 
            <TouchableOpacity onPress={navigateToComments}>
                <CustomText style={moreCommentsStyle}>{languages.seeMoreComments}</CustomText>
            </TouchableOpacity>
            }
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView>
                {Object.entries(comments).map(([key, comment], index) => {
                    if (index <= 2){
                        return (
                            <Comment 
                                comment={comment} 
                                postId={postId} 
                                key={comment.id} 
                                navigation={navigation}
                                inCommentDetailScreen={inCommentDetailScreen}
                            />
                        )
                    }
                })}
                <TouchableOpacity onPress={navigateToComments}>
                    <CustomText style={moreCommentsStyle}>{languages.seeMoreComments}</CustomText>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
