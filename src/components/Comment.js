import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { useTheme } from 'react-native-paper'
import { connect, useSelector } from 'react-redux'
import { Rating } from 'react-native-rating-element'

import { rateComment, rateCommentUpdate, replyComment } from '../actions/posts'
import Replies from './Replies'
import { getAuthenticatedUser } from '../constants/selector'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { CustomText } from '../../shared/components'
import languages from '../languages/Languages'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'


export function Comment({rateComment, rateCommentUpdate, replyComment, comment, postId, inCommentDetailScreen, navigation, commentRef, setParentId}) {

    //THEME
    const { colors } = useTheme()
    //SELECTORS
    const currentUser = useSelector(getAuthenticatedUser)
    //STATES
    const [limit, setLimit] = useState(3)
    const [replyText, setReplyText] = useState('')
    const [initialRate, setInitialRate] = useState(0)
    const [isEditable, setIsEditable] = useState(false)
    const [replyTriggered, setReplyTriggered] = useState(false)
    const [repliesVisible, setRepliesVisible] = useState(false)
    const [seeRepliesTextVisible, setSeeRepliesTextVisible] = useState(true)
    //VARIABLES
    const avgRate = parseFloat(parseFloat(comment.avg_rate).toFixed(2))
    const currentUserId = currentUser.pk
    const currentUsername = currentUser.username
    const replyCount = Object.values(comment.replies).length
    const replies = Object.values(comment.replies).slice(0, limit)
    const starEmpty = require('../../assets/icons/starEmpty.png')
    const starFilled = require('../../assets/icons/starFilled.png')
    const starEmptyColored = require('../../assets/icons/starEmptyColored.png')
    const starFilledColored = require('../../assets/icons/starFilledColored.png')
    //DYNAMIC STYLES
    const authorStyle = {fontWeight: 'bold', marginLeft: 4, color: colors.comment, marginTop: 2, fontSize: responsiveScreenFontSize(1.6)}
    const contentStyle = {color: colors.comment, marginTop: 1, fontSize: responsiveScreenFontSize(1.7)}
    const replyStyle = {fontWeight: 'bold', color: colors.replyToComment, marginRight: '4%', fontSize: responsiveScreenFontSize(1.5)}
    const avgRateStyle = {marginRight: 3, fontSize: 10, color: 'grey'}
    const usernameStyle = {fontWeight: 'bold', marginLeft: 4, color: colors.comment, marginTop: 2.5, fontSize: responsiveScreenFontSize(1.6)}
    const replyContentStyle = {flex: 0.8, color: colors.comment, fontSize: responsiveScreenFontSize(1.6), marginBottom: 2}
    const postStyle = {fontWeight: 'bold', color: colors.comment, opacity: replyText.length > 0 ? 1 : 0.3, marginLeft: '3%', fontSize: responsiveScreenFontSize(1.7)}
    const seeRepliesStyle = {fontWeight: 'bold', alignSelf: 'center', paddingTop: 3, color: colors.comment}
    const commentContent = {
        alignSelf: 'stretch',
        minWidth: '40%',
        maxWidth: comment.author.username.length > 11 ? 127 : 160,
    }

    //FUNCTIONS
    const onRateComment = (rate) => {
        if (!(comment.rated_by[currentUserId]))
            rateComment(rate, comment.id, postId)
        else 
            rateCommentUpdate(rate, comment.id, postId, currentUserId)
    }

    const reply = (replyText) => {
        if (replyText.length > 0){
            replyComment(replyText, comment.id, postId)
            Keyboard.dismiss()
            setReplyTriggered(false)
            setReplyText("")
        }
    }

    const navigateToProfile = () => {
        navigation.navigate('Profile', { screen: 'profile', params: {username: comment.author.username, id: comment.author.pk}})
    }

    const replyOnPress = () => {
        if (inCommentDetailScreen) {
            commentRef.current.focus()
            setParentId(comment.id)
        } else {
            setReplyTriggered(!replyTriggered) 
            setIsEditable(true)
        }
    }

    const onChangeText = (replyText) => {
        setReplyText(replyText)
        /* if (replyText.includes('@')) {
            const splitString = replyText.split(' ')
            Object.values(splitString).map(str => {
                if (str[0] === '@')
            })
        } */
    }
    const onSubmitEditing = (text) => reply(text)
    const seeReplies = () => {
        setRepliesVisible(true) 
        setSeeRepliesTextVisible(false)
    }

    /* const onLayout = (layout) => {
        var { x, y, width, height } = layout
        console.log("x: ", x)
        console.log("y: ", y)
        console.log("width: ", width)
        console.log("height: ", height)
    } */

    useEffect(() => {
        const rateObj = comment.rated_by[currentUserId]
        if (rateObj) 
            setInitialRate(rateObj.rate)
    }, [comment.content, comment.rated_by, currentUserId])

    return (
        <SafeAreaView style={styles.container} /* onLayout={(obj) => onLayout(obj.nativeEvent.layout)} */>
            <SafeAreaView style={styles.comment}>
                <SafeAreaView style={styles.flexRow}>
                    <TouchableOpacity style={styles.commentInfo} onPress={navigateToProfile}>
                        <MemoizedProfilePhoto size={25} userId={comment.author.pk} />
                        <CustomText style={authorStyle}>{comment.author.username}</CustomText>
                    </TouchableOpacity>
                    <SafeAreaView style={commentContent}>
                        <CustomText style={contentStyle}>{comment.content}</CustomText>
                        <SafeAreaView style={styles.commentMeta}>
                            <SafeAreaView style={styles.flexRow}>
                                <CustomText onPress={replyOnPress} style={replyStyle}>{languages.reply}</CustomText>
                                <Rating 
                                    type="custom"
                                    rated={initialRate}
                                    selectedIconImage={starFilledColored}
                                    emptyIconImage={starEmptyColored}
                                    size={15}
                                    marginBetweenRatingIcon={0.2}
                                    onIconTap={onRateComment}
                                />
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.commentStars}>
                    <CustomText style={avgRateStyle}>{comment.avg_rate !== 0 ? avgRate : null}</CustomText>
                    <SafeAreaView style={styles.average_rate}>
                        <Rating 
                            type="custom"
                            rated={avgRate}
                            selectedIconImage={starFilled}
                            emptyIconImage={starEmpty}
                            size={10}
                            marginBetweenRatingIcon={0.1}
                            readonly={true}
                        />
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
            {replyTriggered && !inCommentDetailScreen ? 
                <SafeAreaView style={styles.replyContainer}>
                    <SafeAreaView style={styles.commentInfo}>
                        <MemoizedProfilePhoto size={25} userId={currentUserId} />
                        <CustomText style={usernameStyle}>{currentUsername}</CustomText>
                    </SafeAreaView>
                    <SafeAreaView style={styles.textInput}>
                        <TextInput 
                            multiline 
                            numberOfLines={7} 
                            blurOnSubmit={true} 
                            autoFocus={isEditable} 
                            style={replyContentStyle} 
                            autoCapitalize="sentences" 
                            placeholder={languages.commentReplyPlaceholder} 
                            value={replyText} 
                            onChangeText={onChangeText} 
                            onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text)} 
                            returnKeyType="send" 
                        />
                        <CustomText 
                            style={postStyle} 
                            onPress={() => onSubmitEditing(replyText)}>
                                {languages.postComment}
                        </CustomText>
                    </SafeAreaView>
                </SafeAreaView>
                :
                null
            }
            {inCommentDetailScreen && replyCount > 0 && seeRepliesTextVisible ?
                <CustomText onPress={seeReplies} style={seeRepliesStyle}>
                    {languages.seeReplies} - {replyCount}
                </CustomText>
            : 
                null
            }
            {repliesVisible ?
                replies.map((reply) => (
                    <Replies reply={reply} parentId={comment.id} postId={postId} key={reply.id} commentRef={commentRef} setParentId={setParentId}/>
                )) 
            :
                null}
            {inCommentDetailScreen && replyCount > limit && !seeRepliesTextVisible ? 
                <CustomText onPress={() => setLimit(limit + 3)} style={seeRepliesStyle}>{languages.seeReplies} - {replyCount - limit}</CustomText>
                :
                null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: '3%',
        alignSelf: 'stretch'
    },
    commentInfo: {
        flexDirection: 'row',
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    commentContent: {
        alignSelf: 'stretch',
        minWidth: '40%',
        maxWidth: 140,
        backgroundColor: 'red'
    },
    commentMeta: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    replyContainer: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center', 
        marginLeft: '9%', 
        marginTop: '3%', 
        marginBottom: '3%',
        height: 45,
        maxHeight: 60
    },
    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row'
    },
    profilePhoto: {
        height: 25, 
        width: 25, 
        borderRadius: 25 / 2, 
    },
    commentStars: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginRight: '2%',
        marginBottom: '4%'
    },
    average_rate: {
    }
})

export default connect(null, { rateComment, rateCommentUpdate, replyComment })(Comment)