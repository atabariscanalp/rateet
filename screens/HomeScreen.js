import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, LogBox, Dimensions, ActivityIndicator, Platform } from 'react-native'
import { connect} from 'react-redux'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import { getPosts, incrementPage, getMorePosts } from '../src/actions/posts'
import { getBlockedUsersInfo, getFetchingInfo, getNextPageUrlInfo, getPageInfo, getPostsInfo } from '../src/constants/selector'
import Card from '../src/components/Card'
import Add from '../src/components/Admob'
import { shallowEqual } from '../src/constants/context'
import { useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerDevice } from '../src/actions/user'


const PAGE_SIZE = 20
const WIDTH = Dimensions.get('window').width

export class HomeScreen extends React.Component {

    constructor(props){
        super(props)
            this.state = {
                isRefreshing: false,
            }
        this.viewabilityConfig = {
            waitForInteraction: false,
            viewAreaCoveragePercentThreshold: 80,
            /* itemVisiblePercentThreshold: 75 */
        }        
        this.itemHeights = []
        this.currentVisibleIndex = 0
        this.cellRefs = {}
    }

    shouldComponentUpdate(nextProps, nextState){
        //POSTS
        if (!shallowEqual(this.props.posts, nextProps.posts))
            return true
        //NAVIGATION
        if (!shallowEqual(this.props.navigation, nextProps.navigation))
            return true
        //COLORS
        if (!shallowEqual(this.props.route.params.colors, nextProps.route.params.colors))
            return true
        //IS_REFRESHING
        if (this.state.isRefreshing !== nextState.isRefreshing)
            return true

        return false
    }

    componentDidMount(){
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ])

        AsyncStorage.getItem('fcm_token').then(token => {
            if (token)
              this.props.registerDevice(token, Platform.OS)
            else 
              console.log("no token: ", token)
          })

        this.props.getPosts(1, PAGE_SIZE)
    }

    refresh = () => {
        const { getPosts, fetching } = this.props
        this.setState({ isRefreshing: true })
        getPosts(1, PAGE_SIZE)
        this.setState({ isRefreshing: false })
    }

    onEndReached = () => {
        const { nextPageUrl, page, getMorePosts } = this.props
        if (nextPageUrl !== null){
            getMorePosts(page, PAGE_SIZE)
            incrementPage()
        } 
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        changed.forEach(item => {
            const cell = this.cellRefs[item.key]
            if (cell && cell.props.post.video)
                if (item.isViewable)
                    cell.playVideo()
                else
                    cell.stopVideo()
        })
    }

    backgroundStyle = () => {
        const { colors } = this.props.route.params
        return colors ? colors.background : null
    }

    statusBarStyle = () => {
        const { colors } = this.props.route.params
        return colors ? colors.statusBarSearch : null
    }

    itemSeparatorComponent = () => {
        return <SafeAreaView style={[styles.itemSeperator, this.statusBarStyle()]}/>
    }

    getItemLayout = (data, index) => {
        /* const { posts } = this.props
        const ratio = data[index].image_height ? data[index].image_height / data[index].width : data[index].video_height / data[index].video_width
        const length = ratio * WIDTH + 15
        const offset = length * index
        console.log("index " + index + " " + data[index].title)
        console.log("item h ", {...this.itemHeights})
        return ({length: 500, offset: 500 * index, index}) */
        /* const length = this.itemHeights[index]
        const offset = this.itemHeights.slice(0,index).reduce((a, c) => a + c, 0)
        return {length, offset, index} */
    }

    keyExtractor = (post) => {
        return post ? post.id.toString() : null
    }

    renderItem = ({ item, index }) => {
        const { navigation } = this.props
        const { colors } = this.props.route.params
        if (item.isAdd)
            return (
                <Add />
            )
        return (
            <Card 
                post={item} 
                navigation={navigation} 
                colors={colors} 
                itemHeights={this.itemHeights}
                cellRefs={this.cellRefs}
            /> 
        )    
    }

    listEmptyComponent = () => {
        return (
            <SafeAreaView style={styles.loading}>
                <SafeAreaView style={styles.activityIndicator}>
                    <ActivityIndicator />
                </SafeAreaView>
            </SafeAreaView>
        )
    }

    doesArrayContains = (prop) => {
        const { blockedUsers } = this.props
        blockedUsers.map(id => {
            if (prop === id)
                return true
        })
        return false
    }

    render(){
        const { isRefreshing } = this.state
        const { colors, scrollRef } = this.props.route.params
        const { posts, navigation } = this.props

        posts.map((val, ind) => {
            if (this.doesArrayContains(val.author.pk))
                posts.splice(ind, 1)
        })

        console.log("HOMESCREEN RENDER! ")

        return (
            <SafeAreaView style={styles.homeStyle}>
                <ChangeTheme nav={navigation} />
                <StatusBar backgroundColor={colors.statusBarHome} barStyle={colors.statusBarHomeContent}/>
                    <KeyboardAwareFlatList
                        ref={scrollRef} 
                        data={posts}
                        ListEmptyComponent={this.listEmptyComponent} 
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        showsVerticalScrollIndicator={false}
                        style={this.backgroundStyle()}
                        onRefresh={this.refresh}
                        refreshing={isRefreshing}
                        onEndReachedThreshold={posts.length < 5 ? 2 : 5}
                        onEndReached={this.onEndReached}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        viewabilityConfig={this.viewabilityConfig}
                        ItemSeparatorComponent={this.itemSeparatorComponent}
                        /* getItemLayout={this.getItemLayout} */
                        initialNumToRender={8}
                        enableResetScrollToCoords={false}
                    />
            </SafeAreaView>
        )
    }
}

const ChangeTheme = ({ nav }) => {
    const { colors } = useTheme()
    React.useEffect(() => {
        nav.setParams({ colors: colors })
    }, [colors, nav])
    return null
}

const styles = StyleSheet.create({
    homeStyle: {
        flex: 1,
    },
    itemSeperator: {
        height: 15, 
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicator: {
        marginTop: '60%'
    }
})

const mapStateToProps = state => {
    return {
        page: getPageInfo(state),
        fetching: getFetchingInfo(state),
        nextPageUrl: getNextPageUrlInfo(state),
        posts: getPostsInfo(state),
        blockedUsers: getBlockedUsersInfo(state)
    }
}

export default connect(mapStateToProps, { getPosts, incrementPage, getMorePosts, registerDevice })(HomeScreen)