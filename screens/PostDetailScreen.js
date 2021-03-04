import { useIsFocused, useTheme } from '@react-navigation/native'
import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import { connect, useSelector } from 'react-redux'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import { getPostDetail } from '../src/actions/posts'
import Card from '../src/components/Card'
import { getPostDetailInfo } from '../src/constants/selector'

export function PostDetailScreen({route, navigation, getPostDetail}) {

    const { colors } = useTheme()
    const isFocused = useIsFocused()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { postId, comment, commentId } = route.params
    const post = useSelector(state => getPostDetailInfo(state, postId)) //not using memo here?
    const postData = [post]

    
	const cellRefs = useMemo(() => {
        return {}
    }, [])

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        viewableItems.forEach(item => {
            const cell = cellRefs[item.key]
            console.log({...cell})
            if (cell && cell.props.post.video)
                if (item.isViewable)
                    cell.playVideo()
                else
                    cell.stopVideo()
        })
    }, [cellRefs])

    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 }

    const onRefresh = () => {
        setIsRefreshing(true)
        getPostDetail(postId)
        setIsRefreshing(false)
    }
	
    const keyExtractor = post => post.id.toString()
    const renderItem = ({ item }) => <Card post={item} navigation={navigation} colors={colors} cellRefs={cellRefs} />

    const postDetailStyle = {backgroundColor: colors.background}

    useEffect(() => {
        /* if (comment && commentId)
            navigation.navigate('CommentDetail', { postId: postId, commentId: commentId }) */
        getPostDetail(postId)
        if (isFocused) {
            const post = cellRefs[postId]
            if (post && post.props.post.video)
                post.playVideo()
        }        
    }, [cellRefs, comment, commentId, getPostDetail, isFocused, navigation, postId])
    

    if (post){
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareFlatList
                    data={postData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    style={postDetailStyle}
					onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.activityIndicator}>
                <ActivityIndicator size="small" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicator: {
        marginTop: '60%'
    }
})

export default connect(null, { getPostDetail })(PostDetailScreen)
