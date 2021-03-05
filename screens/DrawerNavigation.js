import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { CardStyleInterpolators } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect, useSelector } from 'react-redux'
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import {
    useTheme,
    Title,
    Drawer,
} from 'react-native-paper'

import { ThemeContext } from '../src/constants/context'
import { CategoryStack, HomeStack, ProfileStack } from './navigation'
import { logout } from '../src/actions/auth'
import { getAuthenticatedUser, getIsDarkThemeInfo } from '../src/constants/selector'
import { MemoizedProfilePhoto } from '../src/components/PostProfilePhoto'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'
import { changeTheme, deleteDevice } from '../src/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
    foodsIcon,
    gamesIcon,
    carsIcon,
    memesIcon,
    landscapeIcon,
    artIcon,
    booksIcon,
    fashionIcon,
    moviesIcon,
    sportIcon,
    catIcon,
    tiktokIcon,
    musicIcon
} from '../src/constants/index'

const DrawerNav = createDrawerNavigator()


const DrawerNavigator = ({deleteDevice, logout, navigation, changeTheme}) => {

    const user = useSelector(getAuthenticatedUser)
    const isDark = useSelector(getIsDarkThemeInfo)

    const { colors } = useTheme()

    const { toggleTheme, isDarkTheme } = useContext(ThemeContext)

    const onSwitch = () => {
        toggleTheme()
        changeTheme()
    }

    const extraStyle = { overflow: 'hidden' }

    const navigateToProfile = () => navigation.navigate('Profile', { screen: 'profile', params: {username: user.username}})

    const onLogout = () => {
        AsyncStorage.getItem('fcm_token').then(token => {
            console.log("token ", token)
            deleteDevice(token)
        }) //Deletes FCM device
        
        logout()
    }

    const getFashionIcon = () => <Image style={styles.icon} source={fashionIcon}/>
    const getBooksIcon = () => <Image style={styles.icon} source={booksIcon}/>
    const getSportIcon = () => <Image style={styles.icon} source={sportIcon}/>
    const getGamesIcon = () => <Image style={styles.icon} source={gamesIcon}/>
    const getArtIcon = () => <Image style={styles.icon} source={artIcon}/>
    const getMemesIcon = () => <Image style={styles.icon} source={memesIcon}/>
    const getMoviesIcon = () => <Image style={styles.icon} source={moviesIcon}/>
    const getCarsIcon = () => <Image style={styles.icon} source={carsIcon}/>
    const getLandscapeIcon = () => <Image style={styles.icon} source={landscapeIcon}/>
    const getFoodsIcon = () => <Image style={styles.icon} source={foodsIcon}/>
    const getAnimalsIcon = () => <Image style={styles.icon} source={catIcon}/>
    const getTikTokIcon = () => <Image style={styles.icon} source={tiktokIcon}/>
    const getMusicIcon = () => <Image style={styles.icon} source={musicIcon}/>

    const getFashionLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.fashion}</CustomText>
    const getBooksLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.books}</CustomText>
    const getSportLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.sport}</CustomText>
    const getGamesLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.games}</CustomText>
    const getArtLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.art}</CustomText>
    const getMemesLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.memes}</CustomText>
    const getMoviesLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.movies}</CustomText>
    const getCarsLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.cars}</CustomText>
    const getLandscapeLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.landscape}</CustomText>
    const getFoodsLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.foods}</CustomText>
    const getAnimalsLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.animals}</CustomText>
    const getTikTokLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.tiktok}</CustomText>
    const getMusicLabel = () => <CustomText style={[styles.drawerLabel,{color: colors.drawernavText}]}>{languages.music}</CustomText>

    const navigateToFashion = () => navigation.navigate('Fashion', {category: 'fashion'})
    const navigateToBooks = () => navigation.navigate('Books', {category: 'books'})
    const navigateToSport = () => navigation.navigate('Sport', {category: 'sport'})
    const navigateToGames = () => navigation.navigate('Games', {category: 'games'})
    const navigateToArt = () => navigation.navigate('Art', {category: 'art'})
    const navigateToMemes = () => navigation.navigate('Memes', {category: 'memes'})
    const navigateToMovies = () => navigation.navigate('Movies', {category: 'movies'})
    const navigateToCars = () => navigation.navigate('Cars', {category: 'cars'})
    const navigateToLandscape = () => navigation.navigate('Landscape', {category: 'landscape'})
    const navigateToFoods = () => navigation.navigate('Foods', {category: 'foods'})
    const navigateToAnimals = () => navigation.navigate('Animals', {category: 'animals'})
    const navigateToTikTok = () => navigation.navigate('TikTok', {category: 'tiktok'})
    const navigateToMusic = () => navigation.navigate('Music', {category: 'music'})

    const DrawerContent = (props) => {
        return (
            <SafeAreaView style={styles.container}> 
                <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={styles.drawerContent}>
                        <SafeAreaView style={styles.userInfoSection}>
                            <TouchableOpacity onPress={navigateToProfile}>
                                <SafeAreaView style={styles.userSection}>
                                    <MemoizedProfilePhoto size={48} userId={user.pk} extraStyles={extraStyle} />
                                    <SafeAreaView style={styles.usernameView}>
                                        <Title style={[styles.username, {color: colors.drawernavText}]}>{user.username}</Title>
                                    </SafeAreaView>
                                </SafeAreaView>
                            </TouchableOpacity>
                        </SafeAreaView>
                        <Drawer.Section style={styles.categorySection}>
                            <Title style={styles.categoriesTitle}>{languages.categories}</Title>
                            <DrawerItem 
                                icon={getFashionIcon}
                                label={getFashionLabel}
                                onPress={navigateToFashion}
                            />
                            <DrawerItem 
                                icon={getSportIcon}
                                label={getSportLabel}
                                onPress={navigateToSport}
                            />
                            <DrawerItem 
                                icon={getMoviesIcon}
                                label={getMoviesLabel}
                                onPress={navigateToMovies}
                            />
                            <DrawerItem 
                                icon={getTikTokIcon}
                                label={getTikTokLabel}
                                onPress={navigateToTikTok}
                            />
                            <DrawerItem 
                                icon={getGamesIcon}
                                label={getGamesLabel}
                                onPress={navigateToGames}
                            />
                            <DrawerItem 
                                icon={getMemesIcon}
                                label={getMemesLabel}
                                onPress={navigateToMemes}
                            />
                            <DrawerItem 
                                icon={getAnimalsIcon}
                                label={getAnimalsLabel}
                                onPress={navigateToAnimals}
                            />
                            <DrawerItem 
                                icon={getMusicIcon}
                                label={getMusicLabel}
                                onPress={navigateToMusic}
                            />
                            <DrawerItem 
                                icon={getCarsIcon}
                                label={getCarsLabel}
                                onPress={navigateToCars}
                            />
                            <DrawerItem 
                                icon={getBooksIcon}
                                label={getBooksLabel}
                                onPress={navigateToBooks}
                            />
                            <DrawerItem 
                                icon={getFoodsIcon}
                                label={getFoodsLabel}
                                onPress={navigateToFoods}
                            />
                            <DrawerItem 
                                icon={getArtIcon}
                                label={getArtLabel}
                                onPress={navigateToArt}
                            />
                            <DrawerItem 
                                icon={getLandscapeIcon}
                                label={getLandscapeLabel}
                                onPress={navigateToLandscape}
                            />
                        </Drawer.Section>

                        <Drawer.Section title={languages.preferences}>
                            <SafeAreaView style={styles.preference}>
                                <CustomText style={{color: colors.drawernavText}}>{languages.darkTheme}</CustomText>
                                <SafeAreaView>
                                    <Switch value={isDark} ios_backgroundColor="grey" trackColor={{ true: '#fd9b2c', false: 'grey' }} onValueChange={onSwitch}/>
                                </SafeAreaView>
                            </SafeAreaView>
                        </Drawer.Section>
                    </SafeAreaView>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Ionicons name="exit-outline" color={color} size={size}/>
                        )}
                        label={() => <CustomText style={styles.signOut}>{languages.signOut}</CustomText>}
                        onPress={onLogout}
                    />
                </Drawer.Section>
            </SafeAreaView>
        )
    }

    return (
        <DrawerNav.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <DrawerNav.Screen name="Home" component={HomeStack}/>
            <DrawerNav.Screen name="Profile" component={ProfileStack} options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} />
            <DrawerNav.Screen name="Fashion" component={CategoryStack}/>
            <DrawerNav.Screen name="Books" component={CategoryStack}/>
            <DrawerNav.Screen name="Sport" component={CategoryStack}/>
            <DrawerNav.Screen name="Games" component={CategoryStack}/>
            <DrawerNav.Screen name="Art" component={CategoryStack}/>
            <DrawerNav.Screen name="Memes" component={CategoryStack}/>
            <DrawerNav.Screen name="Movies" component={CategoryStack}/>
            <DrawerNav.Screen name="Cars" component={CategoryStack}/>
            <DrawerNav.Screen name="Landscape" component={CategoryStack}/>
            <DrawerNav.Screen name="Foods" component={CategoryStack}/>
            <DrawerNav.Screen name="Animals" component={CategoryStack}/>
            <DrawerNav.Screen name="TikTok" component={CategoryStack}/>
            <DrawerNav.Screen name="Music" component={CategoryStack}/>
        </DrawerNav.Navigator>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        marginLeft: '10%'
    },
    username: {
        fontSize: 18,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    categorySection: {
        marginTop: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    icon: {
        width: 25,
        height: 25
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    drawerLabel: {
        margin: -15, 
        marginTop: -9,
        fontWeight: 'bold'
    },
    userSection: {
        flexDirection: 'row', 
        marginTop: 15, 
        alignItems: 'center'
    },
    usernameView: {
        marginLeft: 15
    },
    categoriesTitle: {
        color: 'grey', 
        alignSelf: 'center', 
        fontWeight: 'bold', 
        fontSize: 17, 
        marginTop: 5
    },
    signOut: {
        marginHorizontal: -17, 
        color: 'grey'
    }
})

export default connect(null, { logout, deleteDevice, changeTheme })(DrawerNavigator) 