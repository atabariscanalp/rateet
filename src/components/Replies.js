import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Rating } from 'react-native-rating-element'
import { connect, useSelector } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'

import { rateChildComment, rateUpdateChildComment } from '../actions/posts'
import { getAuthenticatedUser, getBlockedUsersInfo } from '../constants/selector'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { CustomText } from '../../shared/components'
import languages from '../languages/Languages'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

export function Replies({reply, parentId, postId, rateChildComment, rateUpdateChildComment, setParentId, commentRef}) {

    //SELECTORS
    const currentUser = useSelector(getAuthenticatedUser)
    const blockedUsers = useSelector(getBlockedUsersInfo)
    //STATES
    const [rate, setRate] = useState(0)
    //THEME HOOK
    const { colors } = useTheme()
    //NAVIGATION HOOK
    const navigation = useNavigation()
    //VARIABLES
    const avgRate = parseFloat(parseFloat(reply.avg_rate).toFixed(2))
    const currentUserId = currentUser.pk
    const starFilledColored = require('../../assets/icons/starFilledColored.png')
    const starEmptyColored = require('../../assets/icons/starEmptyColored.png')
    const starFilled = require('../../assets/icons/starFilled.png')
    const starEmpty = require('../../assets/icons/starEmpty.png')

    //FUNCTIONS
    const onRateComment = (rate) => {
        if (!(reply.rated_by[currentUserId])){
            rateChildComment(rate, parentId, reply.id, postId)
        } else {
            rateUpdateChildComment(rate, parentId, reply.id, postId, currentUserId)
        }
    }
    
    const navigateToProfile = () => navigation.navigate('profile', { screen: 'profile', params: {username: reply.author.username, id: reply.author.pk}})
    const replyPress = () => {
        commentRef.current.focus()
        setParentId(parentId)
    }

    const doesArrayContains = (prop) => {
        blockedUsers.map(id => {
            if (prop === id)
                return true
        })
        return false
    }
    //DYNAMIC STYLES
    const authorStyle = {fontWeight: 'bold', marginLeft: 4, color: colors.comment, fontSize: responsiveScreenFontSize(1.6)}
    const contentStyle = {color: colors.comment, fontSize: responsiveScreenFontSize(1.7)}
    const replyStyle = {fontWeight: 'bold', color: 'grey', marginRight: 10, fontSize: responsiveScreenFontSize(1.5)}
    const avgRateStyle = {marginRight: 3, fontSize: 13, color: 'grey'}


    useEffect(() => {
        if (reply.rated_by[currentUserId])
            setRate(reply.rated_by[currentUserId].rate)
        
    }, [reply.rated_by, currentUserId])

    if (!doesArrayContains(reply.author.pk))
        return (
            <SafeAreaView style={styles.comment}>
                <SafeAreaView style={styles.innerComment}>
                    <SafeAreaView style={styles.flexRow}>
                        <TouchableOpacity style={styles.commentInfo} onPress={navigateToProfile}>
                            <MemoizedProfilePhoto size={25} userId={reply.author.pk} />
                            <CustomText style={authorStyle}>{reply.author.username}</CustomText>
                        </TouchableOpacity>
                        <SafeAreaView style={styles.commentContent}>
                            <CustomText style={contentStyle}>{reply.content}</CustomText>
                            <SafeAreaView style={styles.commentMeta}>
                                <SafeAreaView style={styles.flexRow}>
                                    <CustomText onPress={replyPress} style={replyStyle}>{languages.reply}</CustomText>
                                    <Rating 
                                        type="custom"
                                        rated={rate}
                                        selectedIconImage={starFilledColored}
                                        emptyIconImage={starEmptyColored}
                                        size={14}
                                        marginBetweenRatingIcon={0.2}
                                        onIconTap={onRateComment}
                                    />
                                </SafeAreaView>
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.rating}>
                        <CustomText style={avgRateStyle}>{avgRate !== 0 ? avgRate : null}</CustomText>
                        <Rating 
                            type="custom"
                            rated={avgRate}
                            selectedIconImage={starFilled}
                            emptyIconImage={starEmpty}
                            size={10}
                            ratingBackgroundColor="#f2f2f2"
                            marginBetweenRatingIcon={0.1}
                            readonly={true}
                        />
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
        )
    else
        return null
}

const styles = StyleSheet.create({
    comment: {
        marginTop: '5%',
        width: '90%',
        alignSelf: 'flex-end',
        marginRight: '4%'
    },
    commentInfo: {
        flexDirection: 'row',
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    commentContent: {
        alignSelf: 'stretch',
        maxWidth: '65%',
        width: '65%'
    },
    commentMeta: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    replyContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-start', 
        alignItems: 'center',
        marginTop: '4%', 
        height: 35,
        backgroundColor: 'red',
        width: '93%'
    },
    rating: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: '-9%'
    },
    innerComment: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    flexRow: {
        flexDirection: 'row'
    },
})

export default connect(null, { rateChildComment, rateUpdateChildComment })(Replies)