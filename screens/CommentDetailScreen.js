import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { getCommentsFetchingInfo, getCommentUploadInfo, getPostCommentsByIdInfo } from '../src/constants/selector'

import Comment from '../src/components/Comment'
import CommentForm from '../src/components/CommentForm'

export default function CommentDetailScreen({route, navigation}) {

    //THEME
    const { colors } = useTheme()
    //SELECTORS
    const { postId, commentId } = route.params
    const comments = useSelector(state => getPostCommentsByIdInfo(state, postId))
    const addedComment = useSelector(getCommentUploadInfo)
    const commentsFetching = useSelector(getCommentsFetchingInfo)
    //STATES
    const [parentId, setParentId] = useState(0)
    //VARIABLES
    const inCommentDetailScreen = true
    const commentData = Object.values(comments)
    const offset = Platform.OS === 'ios' ? 79 : -130 //-85 //-110
    const behavior = Platform.OS === 'ios' ? "position" : "undefined"  //padding
    //REFS
    const ref = useRef()
    const commentRef = useRef()
    //METHODS
    const renderItem = ({ item }) => <Comment 
                                    comment={item} 
                                    postId={postId} 
                                    inCommentDetailScreen={inCommentDetailScreen} 
                                    navigation={navigation}
                                    commentRef={commentRef}
                                    setParentId={setParentId} />
    const itemSeparatorComponent = () => <SafeAreaView style={{height: 18, backgroundColor: colors.statusBarSearch}}/>
    const keyExtractor = comment => comment.id.toString()
    const setBackgroundColor = () => {return {backgroundColor: colors.commentForm}}
    const scrollToEnd = () => {
        if (ref.current) ref.current.scrollToEnd()
    }

    /* const scrollToComment = useCallback((commentId) => {
        if (ref !== null && ref.current !== null && !commentsFetching) {
            const index = Object.keys(comments).indexOf(`${commentId}`)
            console.log("comments: ", Object.keys(comments))
            console.log("comment id: " + commentId + " index of comment: " + index)
            if (typeof ref.current.scrollToIndex() === 'function')
                ref.current.scrollToIndex({ animated: true, index: index})
            else console.log("type of scrolltoindex: ", typeof ref.current.scrollToIndex())
        }
    }, [comments, commentsFetching])

    const onScrollToIndexFailed = (err) => {
        console.log("error: ", err)
        if (ref && ref.current)
            ref.current.scrollToEnd()
    } */

    /* const getItemLayout = (data, index) => {
        let length = 0
        data.map(comment => {
            if (Object.keys(comment.replies).length > 0) length += 74
            else length += 52
        })
        return { length: length, offset: length * index, index}
    } */

    useEffect(() => {
        if (addedComment) scrollToEnd()
        
    }, [addedComment, commentData, commentId, comments, commentsFetching])

    return (
        <SafeAreaView style={styles.commentContainer}>
            <SafeAreaView style={styles.flatlist}>
                <KeyboardAwareFlatList
                    ref={ref}
                    data={commentData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={itemSeparatorComponent}
                    /* onScrollToIndexFailed={onScrollToIndexFailed}  */
                    /* getItemLayout={getItemLayout}
                    enableOnAndroid={true} */
                />
            </SafeAreaView>
            <KeyboardAvoidingView behavior={behavior} style={styles.container} contentContainerStyle={{flex: 1}} keyboardVerticalOffset={offset} enabled>
                <SafeAreaView style={styles.commentFormContainer}>
                    <SafeAreaView style={[styles.innerCommentFormContainer, setBackgroundColor()]}>
                        <CommentForm postId={postId} commentRef={commentRef} parentId={parentId}/>
                    </SafeAreaView>
                </SafeAreaView>
            </KeyboardAvoidingView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        marginTop: 15,
    },
    flatlist: {
        flex: 0.9,
    },
    innerCommentFormContainer: {
        flex: 1
    },
    commentFormContainer: {
        flex: 1
    },
    container: {
        flex: 0.1,
        flexShrink: 0,
    }
})