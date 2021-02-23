import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { StyleSheet, Image,TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import { Title, Caption, Button } from 'react-native-paper'
import { Rating } from 'react-native-rating-element'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect, useSelector } from 'react-redux'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'

import Card from '../src/components/Card'
import { getAuthenticatedUser, getBlockedUsersInfo, getProfileAvgRateInfo, getProfilePostsInfo, getProfileUserInfo, getUserBlockedInfo } from '../src/constants/selector'
import { blockUser, loadProfile, unblockUser } from '../src/actions/user'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export function ProfileScreen({navigation, route, loadProfile, blockUser, unblockUser}) {

    const FocusAwareStatusBar = (props) => {
        return isFocused ? <StatusBar {...props} /> : null
    }
    const isFocused = useIsFocused()
    const { colors } = useTheme()
    const { username } = route.params

    useEffect(() => {
        if (isFocused) loadProfile(username)
    }, [isFocused, loadProfile, username])

    const cellRefs = useMemo(() => {
        return {}
    }, [])
    
    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        changed.forEach(item => {
            const cell = cellRefs[item.key]
            if (cell && cell.props.post.video)
                if (item.isViewable)
                    cell.playVideo()
                else
                    cell.stopVideo()
        })
    }, [cellRefs])

    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 }

    const [isVisible, setIsVisible] = useState(false)

    const englishDarkLogo = require('../assets/icons/English-notfound-dark.png')
    const englishLightLogo = require('../assets/icons/English-notfound-light.png')
    const turkishDarkLogo = require('../assets/icons/Turkish-notfound-dark.png')
    const turkishLightLogo = require('../assets/icons/Turkish-notfound-light.png')

    const user = useSelector(getProfileUserInfo)
    const userAvgRate = useSelector(getProfileAvgRateInfo)
    const userPosts = useSelector(getProfilePostsInfo)
    const authUser = useSelector(getAuthenticatedUser)
    const blockedUsers = useSelector(getBlockedUsersInfo)

    const firstName = user.first_name
    const lastName = user.last_name
    const profilePhoto = user.profile_photo
    const postCount = Object.values(userPosts).length
    const avgRateFloat = parseFloat(parseFloat(userAvgRate).toFixed(2))

    const starFilledBlack = require('../assets/icons/starFilledBlack.png')
    const starEmptyBlack = require('../assets/icons/starEmptyBlack.png')

    var isUserBlocked = false
    blockedUsers.map(id => {
        if (id === user.pk)
            isUserBlocked = true
    })

    const listEmptyComponent = () => {

        if (isUserBlocked)
            return (
                <SafeAreaView style={styles.listEmptyComponent}>
                    <MaterialCommunityIcons name="block-helper" size={150} color={colors.text} />
                </SafeAreaView>
            )
        else {
            if (languages.getInterfaceLanguage().substring(0,2) === 'tr') {
                if (colors.text === 'white') 
                    return (
                        <SafeAreaView style={styles.listEmptyComponent}>
                            <FastImage source={turkishDarkLogo} style={styles.notFoundIcon} resizeMode="contain"/>
                        </SafeAreaView>
                    )
                else 
                    return (
                        <SafeAreaView style={styles.listEmptyComponent}>
                            <FastImage source={turkishLightLogo} style={styles.notFoundIcon} resizeMode="contain"/>
                        </SafeAreaView>
                )
            } else {
                if (colors.text === 'white') 
                    return (
                        <SafeAreaView style={styles.listEmptyComponent}>
                            <FastImage source={englishDarkLogo} style={styles.notFoundIcon} resizeMode="contain"/>
                        </SafeAreaView>
                    )
                else 
                    return (
                        <SafeAreaView style={styles.listEmptyComponent}>
                            <FastImage source={englishLightLogo} style={styles.notFoundIcon} resizeMode="contain"/>
                        </SafeAreaView>
                    )
                }
            }
        }
            
            const ReturnProfileInfo = () => {
        if (firstName && lastName){
            return (
                <SafeAreaView style={styles.nameStlye}>
                    <Title>{firstName} {lastName}</Title>
                    <Caption style={styles.caption}>@{username}</Caption>
                </SafeAreaView>
            )
        } else if (firstName){
            return (
                <SafeAreaView style={styles.nameStlye}>
                    <Title>{firstName}</Title>
                    <Caption style={styles.caption}>@{username}</Caption>
                </SafeAreaView>
            )
        } else if (lastName){
            return (
                <SafeAreaView style={styles.nameStlye}>
                    <Title>{lastName}</Title>
                    <Caption style={styles.caption}>@{username}</Caption>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={styles.nameStlye}>
                    <Caption style={styles.caption}>@{username}</Caption>
                </SafeAreaView>
            )
        }
    }

    const hideModal = () => { setIsVisible(false) }
    const showModal = () => { setIsVisible(true) }

    const goBack = () => {navigation.goBack()}
    const editProfile = () => {navigation.navigate('edit-profile')}
    const getProfileImg = () => profilePhoto ? {uri: profilePhoto} : require('../assets/images/default-profile-pic.jpg')

    const renderItem = ({ item }) => <Card post={item} navigation={navigation} colors={colors} cellRefs={cellRefs} />
    const keyExtractor = post => post.id.toString()
    const getData = () => {
        if (isUserBlocked)
            return null

        return Object.values(userPosts)
    }
    const getPostCount = () => {
        if (isUserBlocked)
            return 0
        
        return postCount
    }
    const getAvgRate = () => {
        if (isUserBlocked)
            return 0
        
        return avgRateFloat
    }

    const block = () => {
        blockUser(user.pk)
        setIsVisible(false)
    }
    const unblock = () => {
        unblockUser(user.pk)
        setIsVisible(false)
    }

    return (
        <KeyboardAwareFlatList
            ListHeaderComponent={
                <SafeAreaView style={styles.header}>
                    <FocusAwareStatusBar backgroundColor="#4682B4" barStyle="dark-content"/>
                    <Ionicons name="chevron-back-outline" size={35} color="black" style={styles.backIcon} onPress={goBack} />
                    <SafeAreaView>
                        <SafeAreaView style={styles.photoAndInfo}>
                            <SafeAreaView style={styles.profileContainer}>
                                <Image source={getProfileImg()} style={styles.profilePhoto}/>
                                <ReturnProfileInfo />
                            </SafeAreaView>
                            {authUser.username === username ? 
                                <TouchableOpacity onPress={editProfile}>
                                    <Ionicons name="settings-outline" size={30} style={styles.settingsIcon} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={showModal}>
                                    <MaterialCommunityIcons name="block-helper" size={30} style={styles.settingsIcon} />
                                </TouchableOpacity>
                            }
                        </SafeAreaView>
                        <SafeAreaView style={styles.lineView} />
                        <SafeAreaView style={styles.profileMetaContainer}>
                            <SafeAreaView style={styles.postCountContainer}>
                                <CustomText style={styles.posts}>{languages.posts}</CustomText>
                                <CustomText style={styles.postCount}>{getPostCount()}</CustomText>
                            </SafeAreaView>
                            <SafeAreaView style={styles.rateContainer}>
                                <CustomText style={styles.rateText}>{languages.ratedAveragely}</CustomText>
                                <CustomText style={styles.avgRate}>{getAvgRate()}</CustomText>
                                <Rating 
                                    type="custom"
                                    selectedIconImage={starFilledBlack}
                                    emptyIconImage={starEmptyBlack}
                                    readonly={true}
                                    rated={getAvgRate()}
                                    size={20}
                                    marginBetweenRatingIcon={0.1}
                                />
                            </SafeAreaView>
                        </SafeAreaView>
                        {/* <SafeAreaView style={styles.about}>
                            <Text style={{fontWeight: 'bold', fontSize: responsiveScreenFontSize(2.5), marginLeft: '3%', fontFamily: 'Open Sans'}}>About</Text>
                            <Text style={{marginLeft: '3%'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus turpis.
                                In pretium quis leo nec mollis. Vivamus imperdiet est vitae nulla vestibulum,
                                eget laoreet augue rutrum. Maecenas non.
                            </Text>
                        </SafeAreaView> */}
                    </SafeAreaView>
                    <SafeAreaView style={styles.profileMetaShadow} />
                    {/* <SafeAreaView style={{backgroundColor: colors.statusBarSearch, paddingTop: '5%', paddingLeft: '3%'}}>
                        <Text style={{fontWeight: 'bold',
                        color: 'grey',
                        fontSize: responsiveScreenFontSize(2.2)}}>Posts</Text>
                    </SafeAreaView> */}
                    <Modal
                        isVisible={isVisible}
                        coverScreen={true}
                        onBackButtonPress={hideModal}
                        onBackdropPress={hideModal}
                        style={styles.modal}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        backdropOpacity={0.3}
                        swipeDirection="down"
                        onSwipeComplete={hideModal}
                        useNativeDriver={true}
                    >
                        {!isUserBlocked ? 
                            <SafeAreaView style={styles.modalContainer}>
                                <CustomText style={styles.blockQuestion}>Do you really want to block this user?</CustomText>
                                <Button
                                    mode="contained"
                                    color="#DC143C" 
                                    labelStyle={styles.blockText}
                                    contentStyle={styles.blockButtonContent}
                                    style={styles.blockButton} 
                                    onPress={block}
                                >
                                    BLOCK
                                </Button>
                                <Button
                                    mode="contained"
                                    color="#808080" 
                                    labelStyle={styles.cancelText}
                                    contentStyle={styles.cancelButtonContent}
                                    style={styles.cancelButton}  
                                    onPress={hideModal}
                                >
                                    CANCEL
                                </Button>
                            </SafeAreaView>
                            :
                            <SafeAreaView style={styles.modalContainer}>
                                <CustomText style={styles.blockQuestion}>Do you really want to lift the block?</CustomText>
                                <Button
                                    mode="contained"
                                    color="#9ACD32" 
                                    labelStyle={styles.blockText}
                                    contentStyle={styles.blockButtonContent}
                                    style={styles.blockButton} 
                                    onPress={unblock}
                                >
                                    UNBLOCK
                                </Button>
                                <Button
                                    mode="contained"
                                    color="#808080" 
                                    labelStyle={styles.cancelText}
                                    contentStyle={styles.cancelButtonContent}
                                    style={styles.cancelButton}  
                                    onPress={hideModal}
                                >
                                    CANCEL
                                </Button>
                            </SafeAreaView>
                        }
                    </Modal>
                </SafeAreaView>
            }
            showsVerticalScrollIndicator={false}
            data={getData()}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            /* onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig} */
            ListEmptyComponent={listEmptyComponent()}
        />
    )
    
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4682B4'
    },
    photoAndInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        justifyContent: 'space-between',
        marginLeft: '10%',
    },
    profilePhoto: {
        width: 85,
        height: 85,
        borderRadius: 10,
    },
    profileContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    caption: {
        fontSize: responsiveScreenFontSize(2.2),
    },
    about: {
        
    },
    modalContainer: {
        height: '28%',
        width: '100%',
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    touchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        flexDirection: 'row'
    },
    text: {
        fontSize: responsiveScreenFontSize(2.1),
        marginLeft: 10,
    },
    lineView: {
        width: '78%', 
        borderBottomWidth: 1,
        alignSelf: 'center', 
        borderColor: '#87CEFA'
    },
    profileMetaContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        marginTop: '3%'
    },
    profileMetaShadow: {
        height: 10,
        marginTop: '5%',
        borderBottomColor: '#696969',
        borderBottomWidth: 1.4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 40,
    },
    avgRate: {
        marginRight: 2, 
        fontWeight: 'bold', 
        fontSize: responsiveScreenFontSize(1.8), 
        marginTop: '1%'
    },
    settingsIcon: {
        marginRight: '11%'
    },
    backIcon: {
        marginLeft: '2%', 
        marginBottom: '-1.3%'
    },
    nameStlye: {
        marginLeft: '4%'
    },
    postCountContainer: {
        flexDirection: 'row',  
        marginTop: '0.5%'
    },
    posts: {
        marginRight: 3, 
        fontSize: responsiveScreenFontSize(1.8)
    },
    postCount: {
        fontWeight: 'bold', 
        fontSize: responsiveScreenFontSize(1.8)
    },
    rateContainer: {
        flexDirection: 'row'
    },
    rateText: {
        marginRight: 4, 
        fontSize: responsiveScreenFontSize(1.8), 
        marginTop: '1%'
    },
    listEmptyComponent: {
        alignItems: 'center',
        marginTop: '25%'
    },
    notFoundIcon: {
        height: 250,
        width: 307
    },
    blockButton: {
        marginTop: '12%',
        marginBottom: '3%',
        width: '65%'
    },
    blockText: {
        fontWeight: 'bold',
        fontSize: responsiveScreenFontSize(2.1),
    },
    blockQuestion: {
        color: 'white',
        fontSize: responsiveScreenFontSize(2.1),
        fontWeight: 'bold',
        marginTop: '8%'
    },
    cancelButton: {
        width: '65%',
        marginBottom: '8%'
    },
    cancelText: {
        fontWeight: 'bold',
        fontSize: responsiveScreenFontSize(2.1)
    }
})

export default connect(null, { loadProfile, blockUser, unblockUser })(ProfileScreen)