import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { Rating } from 'react-native-rating-element'
import TimeAgo from 'react-native-timeago'
import Modal from 'react-native-modal'
import { SafeAreaView, StyleSheet, Image, Pressable, Dimensions } from 'react-native'
/* import SwipeableRating from 'react-native-swipeable-rating' */

import { ratePost, rateUpdate } from '../actions/posts'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import RatedBy from './RatedBy'
import Rater from './Rater'
import { MemoizedImage } from './PostImage'
import { MemoizedVideo } from './PostVideo'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { shallowEqual } from '../constants/context'
import { CustomText } from '../../shared/components'
import languages from '../languages/Languages'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

export class Card extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            rate: 0,
            isVisible: false,
            isVideoPaused: true,
        }
        this.videoRef = createRef()
    }

    static whyDidYouRender = true

    width = Dimensions.get('window').width
    defaultProfilePic = require('../../assets/images/default-profile-pic.jpg')

    shouldComponentUpdate(nextProps, nextState){
        //RATE
        if (this.state.rate !== nextState.rate)
            return true
        //IS_VISIBLE
        if (this.state.isVisible !== nextState.isVisible)
            return true
        //IS_VIDEO_PAUSED
        if (this.state.isVideoPaused !== nextState.isVideoPaused)
            return true
        //COLORS
        if (!shallowEqual(this.props.colors, nextProps.colors))
            return true
        //NAVIGATION
        if (!shallowEqual(this.props.navigation, nextProps.navigation))
            return true
        //POST
        if (!shallowEqual(this.props.post, nextProps.post))
            return true
        
        return false
    }
    
    componentDidMount(){
        const { navigation, post, cellRefs } = this.props
        this._unsubscribe = navigation.addListener(
            /* 'focus', () => {
                //this.videoRef.seek(0)
                this.setState({isVideoPaused: false})
            }, */
            'blur', () => {
                this.setState({isVideoPaused: true})
            }
        )
        cellRefs[post.id] = this
    }

    componentWillUnmount(){
        this._unsubscribe()
    }
    

    static getDerivedStateFromProps(nextProps, prevState){
        const rate = nextProps.post.rated_by[nextProps.currentUserId] ? nextProps.post.rated_by[nextProps.currentUserId].rate : 0
        if (prevState.rate !== rate)
            return { rate: rate }
        return null
    }

    setCategory = (category) => {
        if (category === "Sport") return require('../../assets/icons/ball-512.png')
        else if (category === "Fashion") return require('../../assets/icons/handbag-512.png')
        else if (category === "Books") return require('../../assets/icons/books-512.png')
        else if (category === "Movies") return require('../../assets/icons/popcorn-512.png')
        else if (category === "Games") return require('../../assets/icons/gameconsole-512.png')
        else if (category === "Cars") return require('../../assets/icons/f1-512.png')
        else if (category === "Landscape") return require('../../assets/icons/mountain-512.png')
        else if (category === "Art") return require('../../assets/icons/statue-512.png')
        else if (category === "Memes") return require('../../assets/icons/humor-512.png')
        else if (category === "Foods") return require('../../assets/icons/veganfood-512.png')
    }

    onRatePost = pos => {
        const { post, currentUserId, ratePost, rateUpdate } = this.props
        if (!post.rated_by[currentUserId]){
            ratePost(pos, post.id, currentUserId)
        } else {
            rateUpdate(pos, post.id, currentUserId)
        }
    }

    setModalVisible = (condition) => {
        this.setState({isVisible: condition})
    }

    playVideo = () => {
        /* this.videoRef && this.videoRef.seek(0) */
        this.setState({ isVideoPaused: false })
    }

    stopVideo = () => {
        this.setState({ isVideoPaused: true })
    }

    navigateToProfile = () => {
        const { navigation, post } = this.props
        navigation.navigate('Profile', {screen: 'profile', params: {username: post.author.username, id: post.author.pk}})
    }

    getAvgRate = () => {
        const { post } = this.props
        return parseFloat(parseFloat(post.avg_rate).toFixed(2))
    }

    hideModal = () => {this.setModalVisible(false)}

    /* onLayout = obj => {
        const { currentIndex, itemHeights } = this.props
        itemHeights[currentIndex] = obj.nativeEvent.layout.height
    }  */

    usernameStyle = () => {
        const { colors } = this.props
        return {color: colors.text, fontSize: 15, fontWeight: 'bold'}
    }
    postTitleStyle = () => {
        const { colors } = this.props
        return {fontSize: responsiveScreenFontSize(2.5), textAlign: 'center', color: colors.postTitle, marginTop: '3%'}
    }
    avgRateStyle = () => {
        return {fontSize: 16, marginRight: 5, color: 'grey'}
    }
    ratedByNoneStyle = () => {
        const { colors } = this.props
        return {fontWeight: 'bold', marginRight: 4, color: colors.ratedBy}
    }
    
    starFilledColored = require('../../assets/icons/starFilledColored.png')
    starEmptyColored = require('../../assets/icons/starEmptyColored.png')
    starFilled = require('../../assets/icons/starFilled.png')
    starEmpty = require('../../assets/icons/starEmpty.png')

    render(){
        const { post, colors, navigation } = this.props
        const categoryImg = this.setCategory(post.category)
        const { isVideoPaused } = this.state

        const commentCount = Object.values(post.comments).length
        
        return (
            <SafeAreaView style={styles.container} shouldRasterizeIOS={true}>
                <SafeAreaView style={styles.postHeader}>
                    <SafeAreaView style={styles.innerPostHeader}>
                        <SafeAreaView style={styles.userInfo}>
                            <Pressable style={styles.userPhoto} onPress={this.navigateToProfile}>
                                <MemoizedProfilePhoto size={45} userId={post.author.pk} />
                            </Pressable>
                            <SafeAreaView style={styles.username_date}>
                                <CustomText 
                                    style={this.usernameStyle()}
                                    onPress={this.navigateToProfile}
                                >{post.author.username}
                                </CustomText>
                                <CustomText style={styles.timeAgo}><TimeAgo time={post.created_at} hideAgo={true} /></CustomText>
                            </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView>
                            <Image source={categoryImg} style={styles.postCategory}/>
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.postTitle}>
                        <CustomText style={this.postTitleStyle()}>{post.title}</CustomText>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.postImage}>
                    {post.image ? 
                        <MemoizedImage image={post.image} imgHeight={post.image_height} imgWidth={post.image_width} />
                        :
                        <MemoizedVideo video={post.video} videoHeight={post.video_height} videoWidth={post.video_width} isVideoPaused={isVideoPaused} />
                    }
                </SafeAreaView>
                <SafeAreaView>
                    <SafeAreaView style={styles.postRates}>
                        <SafeAreaView style={styles.innerPostRate}>
                            <Rating 
                                type="custom"
                                rated={this.state.rate}
                                selectedIconImage={this.starFilledColored}
                                emptyIconImage={this.starEmptyColored}
                                size={26}
                                ratingBackgroundColor="#f2f2f2"
                                marginBetweenRatingIcon={0.6}
                                onIconTap={this.onRatePost}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={styles.avgRateStars}>
                            <CustomText style={this.avgRateStyle()}>{post.avg_rate > 0 ? this.getAvgRate() : null}</CustomText>
                            <Rating 
                                type="custom"
                                selectedIconImage={this.starFilled}
                                emptyIconImage={this.starEmpty}
                                readonly={true}
                                rated={this.getAvgRate()}
                                size={20}
                                marginBetweenRatingIcon={0.1}
                                ratingBackgroundColor="#f2f2f2"
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.ratedBy}>
                        {Object.keys(post.rated_by).length > 0 ? 
                            <RatedBy raters={post.rated_by} setModalVisible={this.setModalVisible}/>
                        : 
                            <SafeAreaView style={styles.raters}>
                                <CustomText style={this.ratedByNoneStyle()}>{languages.ratedByNone}</CustomText>
                            </SafeAreaView>
                        }
                    </SafeAreaView>
                    <CommentList 
                        comments={post.comments} 
                        postId={post.id} 
                        navigation={navigation} 
                    />
                    <CommentForm 
                        postId={post.id} 
                        navigation={navigation}
                        commentCount={commentCount}
                    />
                </SafeAreaView>
                <Modal 
                    isVisible={this.state.isVisible}
                    coverScreen={true}
                    onBackButtonPress={this.hideModal}
                    onBackdropPress={this.hideModal}
                    style={styles.modal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.3}
                    swipeDirection="down"
                    onSwipeComplete={this.hideModal}
                    useNativeDriver={false}
                >
                    <SafeAreaView style={[styles.modalContainer, {backgroundColor: colors.modal}]}>
                        {Object.values(post.rated_by).map(rater => (
                            <Rater 
                                rater={rater} 
                                navigation={navigation} 
                                setModalVisible={this.setModalVisible}
                                fullstarIcon={this.starFilled} 
                                emptystarIcon={this.starEmpty}
                                key={rater.id} 
                            />
                        ))}
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        marginVertical: 35,
        flex: 1,
    },
    postHeader: {
        paddingVertical: 4,
    },
    postTitle: {
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    userPhoto: {
        alignItems: 'center',
    },
    username_date: {
        marginLeft: 10
    },
    postCategory: {
        marginRight: 10,
        width: 30,
        height: 30
    },
    postImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    postRates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'
    },
    modalContainer: {
        backgroundColor: 'white',
        height: '75%',
        borderRadius: 10,
    },
    raters: {
        flexDirection: 'row',
        marginHorizontal: 3,
        marginTop: 6,
        marginLeft: '2%',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center', 
        margin: 0
    },
    innerPostHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    timeAgo: {
        color: '#808080'
    },
    innerPostRate: {
        marginLeft: '2%'
    },
    avgRateStars: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginRight: '2%'
    },
    ratedBy: {
        marginBottom: '3%'
    }
})

function mapStateToProps(state, ownProps) {
    const userId = state.auth.user.pk
    //const postId = ownProps.post.id
    return {
        currentUserId: userId,
        //avgRate: getAverageRateInfo(state, postId),
    }
}

export default connect(mapStateToProps, { ratePost, rateUpdate })(Card)
