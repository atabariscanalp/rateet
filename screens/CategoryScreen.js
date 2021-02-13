import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet } from 'react-native'


import { getFetchingInfo, getNextPageUrlInfo, getPageInfo, getPostsByCategoryInfo } from '../src/constants/selector'
import { fetchingNewCategory, getMorePostsCategory, getPostsByCategory, incrementPage } from '../src/actions/posts'
import { shallowEqual } from '../src/constants/context'
import Card from '../src/components/Card'
import FastImage from 'react-native-fast-image'
import language from '../src/languages/Languages'
import { ThemeContext } from '../src/constants/context'
import Add from '../src/components/Admob'


const PAGE_SIZE = 20

const notFoundIconLight = require('../assets/icons/English-404-light.png')
const notFoundIconDark = require('../assets/icons/English-404-dark.png')
const notFoundIconTurkishLight = require('../assets/icons/Turkish-404-light.png')
const notFoundIconTurkishDark = require('../assets/icons/Turkish-404-dark.png')

export class CategoryScreen extends React.Component {
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
        //CATEGORY
        if (!shallowEqual(this.props.route.params.category, nextProps.route.params.category))
            return true
        //IS_REFRESHING
        if (this.state.isRefreshing !== nextState.isRefreshing)
            return true
        //CURRENT_VISIBLE_INDEX
        if (this.state.currentVisibleIndex !== nextState.currentVisibleIndex)
            return true
        
        return false
    }


    componentDidMount(){
        const { fetchingNewCategory, getPostsByCategory } = this.props
        const { category } = this.props.route.params
        getPostsByCategory(category, 1, PAGE_SIZE)
        fetchingNewCategory()
    }

    refresh = () => {
        const { getPostsByCategory, fetching } = this.props
        const { category } = this.props.route.params
        this.setState({ isRefreshing: true })
        getPostsByCategory(category, 1, PAGE_SIZE)
        this.setState({ isRefreshing: false })
    }

    onEndReached = () => {
        const { category } = this.props.route.params
        const { nextPageUrl, page, getMorePostsCategory } = this.props
        if (nextPageUrl !== null){
            getMorePostsCategory(category, page, PAGE_SIZE)
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

    statusBarStyle = () => {
        const { colors } = this.props.route.params
        return colors ? colors.statusBarSearch : null
    }

    itemSeparatorComponent = () => {
        return <SafeAreaView style={[styles.itemSeperator, this.statusBarStyle()]}/>
    }

    renderItem = ({ item, index }) => {
        const { navigation } = this.props
        const { colors } = this.props.route.params
        if (item.isAdd)
            return <Add />
            
        return <Card post={item} navigation={navigation} colors={colors} cellRefs={this.cellRefs} />
    }

    keyExtractor = (post) => {
        return post.id.toString()
    }

    /* getItemLayout = (data, index) => {
        const width = Dimensions.get('window').width
        return ({length: width * data["0"].image_height, offset: width * data["0"].image_height * index, index})
    } */

    setListEmptyComponent = () => {
        const lng = language.getInterfaceLanguage().substring(0,2)
        const theme = this.context
        var isDarkTheme = theme.isDarkTheme

        if (lng === 'en'){
            if (isDarkTheme)
                return (
                    <SafeAreaView style={styles.loading}>
                        <SafeAreaView style={{marginTop: '40%'}}>
                            <FastImage source={notFoundIconDark} style={styles.notFoundIcon} />
                        </SafeAreaView>
                    </SafeAreaView>
                )
            else
                return (
                    <SafeAreaView style={styles.loading}>
                        <SafeAreaView style={{marginTop: '40%'}}>
                            <FastImage source={notFoundIconLight} style={styles.notFoundIcon} />
                        </SafeAreaView>
                    </SafeAreaView>
                )
        } else {
            if (isDarkTheme)
                return (
                    <SafeAreaView style={styles.loading}>
                        <SafeAreaView style={{marginTop: '40%'}}>
                            <FastImage source={notFoundIconTurkishDark} style={styles.notFoundIcon} />
                        </SafeAreaView>
                    </SafeAreaView>
                )
            else
                return (
                    <SafeAreaView style={styles.loading}>
                        <SafeAreaView style={{marginTop: '40%'}}>
                            <FastImage source={notFoundIconTurkishLight} style={styles.notFoundIcon} />
                        </SafeAreaView>
                    </SafeAreaView>
                )
        }
    }

    listEmptyComponent = () => {
        const { posts } = this.props
        
        if (Object.values(posts).length > 0)
            return (
                <SafeAreaView style={styles.loading}>
                    <SafeAreaView style={{marginTop: '60%'}}>
                        <ActivityIndicator />
                    </SafeAreaView>
                </SafeAreaView>
            )
        else 
            return this.setListEmptyComponent()
    }

    backgroundStyle = () => {
        const { colors } = this.props.route.params
        return colors ? colors.background : null
    }

    setStatusBarColor = () => {
        const theme = this.context
        if (theme.isDarkTheme) return '#141414'
        else return 'white'
    }

    setStatusBarStyle = () => {
        const theme = this.context
        if (theme.isDarkTheme) return 'light-content'
        else return 'dark-content'
    }

    render(){
        const { posts } = this.props
        const { isRefreshing } = this.state

        const postsData = Object.values(posts)

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={this.setStatusBarColor()} barStyle={this.setStatusBarStyle()}/>
                <KeyboardAwareFlatList 
                    data={postsData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    style={this.backgroundStyle()}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    onRefresh={this.refresh}
                    refreshing={isRefreshing}
                    onEndReachedThreshold={2}
                    onEndReached={this.onEndReached}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.listEmptyComponent}
                    ItemSeparatorComponent={this.itemSeparatorComponent}
                    //getItemLayout={this.getItemLayout}
                    />
            </SafeAreaView>
        )
    }
}

CategoryScreen.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
notFoundIcon: {
        height: 300,
        width: 300
    }
})

const mapStateToProps = state => {
    return {
        page: getPageInfo(state),
        fetching: getFetchingInfo(state),
        nextPageUrl: getNextPageUrlInfo(state),
        posts: getPostsByCategoryInfo(state)
    }
}

export default connect(mapStateToProps, { getPostsByCategory, incrementPage, fetchingNewCategory, getMorePostsCategory })(CategoryScreen)