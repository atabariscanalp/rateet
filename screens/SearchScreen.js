import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'

import global from '../styles/global'
import { useTheme } from '@react-navigation/native'
import { FETCH_URL } from '../src/constants'
import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export default function SearchScreen({navigation, route}) {

    const FocusAwareStatusBar = (props) => {
        const isFocused = useIsFocused()
        return isFocused ? <StatusBar {...props} /> : null
    }

    if (route.params)
        console.log("params: ", route.params)
    else 
        console.log("no params!!")

    //THEME
    const { colors } = useTheme()
    //STATES
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [text, setText] = useState('')
    const [pressed, setPressed] = useState(false)
    //VARIABLES
    var typing = false
    
    const booksImg = require('../assets/icons/books-512.png')
    const moviesImg = require('../assets/icons/popcorn-512.png')
    const carsImg = require('../assets/icons/f1-512.png')
    const gamesImg = require('../assets/icons/gameconsole-512.png')
    const fashionImg = require('../assets/icons/handbag-512.png')
    const foodsImg = require('../assets/icons/veganfood-512.png')
    const sportImg = require('../assets/icons/ball-512.png')
    const artImg = require('../assets/icons/statue-512.png')
    const landscapeImg = require('../assets/icons/mountain-512.png')
    const memesImg = require('../assets/icons/humor-512.png')

    const inputStyle = {fontWeight: 'normal', color: colors.searchScreenText}
    //METHODS
    if (text.length >= 1){
        typing = true
    } else {
        typing = false
    }
    
    const handleChange = text => {
        setText(text)
        setPressed(false)
        if (text.length >= 1 && !pressed){
            getSearchResult(text)
        }
    }

    const getSearchResult = text => {
        const config = {
            headers: {"Content-type": "application/json"}
        }
        axios.get(`${FETCH_URL}/api/v1/?search=${text}`, config)
            .then(res => {
                setPosts(res.data)
            }).catch(err => {
                console.log(err)
            })
        
        axios.get(`${FETCH_URL}/api/v1/users/?search=${text}`, config)
            .then(res => {
                setUsers(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const getPostsByCategory = (category, text) => {
        const config = {
            headers: {"Content-type": "application/json"}
        }
        axios.get(`${FETCH_URL}/api/v1/?category=${category}&search=${text}`, config)
            .then(res => {
                setPosts(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const setBackgroundColor = res => {
        if (res.category === 'Movies') return '#ffc0cb'
        else if (res.category === 'Cars') return '#2929a3'
        else if (res.category === 'Sport') return '#65a31d'
        else if (res.category === 'Games') return '#ee9a00'
        else if (res.category === 'Books') return '#e2c18b'
        else if (res.category === 'Landscape') return '#ff8069'
        else if (res.category === 'Art') return '#c2c2c2'
        else if (res.category === 'Fashion') return '#ffc0cb'
        else if (res.category === 'Foods') return 'red'
        else if (res.category === 'Memes') return '#ffdab9'
    }

    const translateCategory = res => {
        if (res.category === 'Movies') return languages.movies
        else if (res.category === 'Cars') return languages.cars
        else if (res.category === 'Sport') return languages.sport
        else if (res.category === 'Games') return languages.games
        else if (res.category === 'Books') return languages.books
        else if (res.category === 'Landscape') return languages.landscape
        else if (res.category === 'Art') return languages.art
        else if (res.category === 'Fashion') return languages.fashion
        else if (res.category === 'Foods') return languages.foods
        else if (res.category === 'Memes') return languages.memes
    }

    const navigateToPostDetail = (res) => navigation.navigate('PostDetail', { screen: 'PostDetail', params: { postId: res.id, postTitle: res.title } })
    const navigateToProfile = (userName) => {
        console.log("username " + userName)
        navigation.navigate('profile', { username: userName })
        //navigation.navigate('home', { screen: 'Profile', params: { username: userName }})
    }

    const getBooks = () => {setText(languages.books + ':'); setPressed(true); getPostsByCategory('books', '')}
    const getMovies = () => {setText(languages.movies + ':'); setPressed(true); getPostsByCategory('movies', '')}
    const getCars = () => {setText(languages.cars + ':'); setPressed(true); getPostsByCategory('cars', '')}
    const getGames = () => {setText(languages.games + ':'); setPressed(true); getPostsByCategory('games', '')}
    const getFashion = () => {setText(languages.fashion + ':'); setPressed(true); getPostsByCategory('fashion', '')}
    const getFoods = () => {setText(languages.foods + ':'); setPressed(true); getPostsByCategory('foods', '')}
    const getSport = () => {setText(languages.sport + ':'); setPressed(true); getPostsByCategory('sport', '')}
    const getArt = () => {setText(languages.art + ':'); setPressed(true); getPostsByCategory('art', '')}
    const getMemes = () => {setText(languages.memes + ':'); setPressed(true); getPostsByCategory('memes', '')}
    const getLandscape = () => {setText(languages.landscape + ':'); setPressed(true); getPostsByCategory('landscape', '')}

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar backgroundColor={colors.statusBarSearch} barStyle={colors.statusBarHomeContent}/>
            <SafeAreaView style={styles.searchContainer}>
                <Searchbar 
                    placeholder={languages.search} 
                    value={text} 
                    onChangeText={handleChange} 
                    style={styles.searchBar} 
                    inputStyle={[global.openSans, inputStyle]}
                />
                {typing ? 
                    <ScrollView>
                        <SafeAreaView>
                            <CustomText style={[styles.postsText, {color: colors.searchScreenText}]}>{languages.posts}</CustomText>
                        </SafeAreaView>
                        {posts.map(res => {                            
                            return (
                                <TouchableOpacity onPress={() => navigateToPostDetail(res)} key={res.id}>
                                    <SafeAreaView style={[styles.searchItem, {backgroundColor: setBackgroundColor(res)}]}>
                                        <CustomText style={styles.category}>{translateCategory(res)}:</CustomText>
                                        <CustomText style={styles.title}>{res.title}</CustomText>
                                    </SafeAreaView>
                                </TouchableOpacity>
                            )
                        })}
                        <SafeAreaView>
                            <CustomText style={[styles.userTitle, {color: colors.searchScreenText}]}>{languages.users}</CustomText>
                        </SafeAreaView>
                        {users.map(res => {
                            return (
                                <TouchableOpacity key={res.id} onPress={() => navigateToProfile(res.username)}>
                                    <SafeAreaView style={styles.searchItem}>
                                        <Text style={styles.username}>{res.username}</Text>
                                    </SafeAreaView>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                :
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <TouchableOpacity onPress={getBooks} style={[styles.categoryContainer, {backgroundColor: '#e2c18b'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.books}</CustomText>
                            <Image source={booksImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getMemes} style={[styles.categoryContainer, {backgroundColor: '#ffdab9'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.memes}</CustomText>
                            <Image source={memesImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getMovies} style={[styles.categoryContainer, {backgroundColor: '#B0E0E6'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.movies}</CustomText>
                            <Image source={moviesImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getSport} style={[styles.categoryContainer, {backgroundColor: '#65a31d'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.sport}</CustomText>
                            <Image source={sportImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getCars} style={[styles.categoryContainer, {backgroundColor: '#2929a3'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.cars}</CustomText>
                            <Image source={carsImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getGames} style={[styles.categoryContainer, {backgroundColor: '#ee9a00'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.games}</CustomText>
                            <Image source={gamesImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getFashion} style={[styles.categoryContainer, {backgroundColor: '#ffc0cb'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.fashion}</CustomText>
                            <Image source={fashionImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getFoods} style={[styles.categoryContainer, {backgroundColor: 'red'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.foods}</CustomText>
                            <Image source={foodsImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getArt} style={[styles.categoryContainer, {backgroundColor: '#c2c2c2'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.art}</CustomText>
                            <Image source={artImg} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={getLandscape} style={[styles.categoryContainer, {backgroundColor: '#ff8069'}]}>
                            <CustomText style={styles.categoryTitle}>{languages.landscape}</CustomText>
                            <Image source={landscapeImg} style={styles.image}/>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        flex: 1
    },
    searchBar:{
        width: '100%',
        marginTop: 8,
        borderRadius: 10
    },
    searchItem:{
        flexDirection: 'row',
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#ff3333',
        textAlignVertical: 'center'
    },
    username: {
        paddingVertical: 8, 
        paddingLeft: 9, 
        color: 'white'
    },
    categoryContainer:{
        width: '100%',
        height: 95,
        borderRadius: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveScreenFontSize(4.5),
        marginLeft: 9,
    },
    linearGradient:{
        width: '100%', 
        height: '100%', 
        borderRadius: 15, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bookContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookImg:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 15,
        opacity: 0.6
    },
    postsText: {
        fontWeight: 'bold', 
        marginTop: 20, 
        marginBottom: 5,
        fontSize: responsiveScreenFontSize(2), 
        borderBottomWidth: 0.7, 
        borderBottomColor: 'black', 
    },
    category: {
        marginRight: 6, 
        paddingVertical: 10,
        paddingLeft: 9, 
        color: 'white', 
        fontSize: responsiveScreenFontSize(1.8)
    },
    title: {
        paddingVertical: 10, 
        color: 'white',
        fontSize: responsiveScreenFontSize(1.8)
    },
    userTitle: {
        fontWeight: 'bold', 
        marginBottom: 5, 
        marginTop: 10,
        fontSize: responsiveScreenFontSize(2), 
        borderBottomWidth: 0.7, 
        borderBottomColor: 'black'
    },
    scrollView: {
        marginTop: 20, 
        width: '100%', 
        flex: 1
    },
    image: {
        width: 64, 
        height: 64, 
        marginRight: 9
    },
    searchContainer: {
        width: '85%', 
        flex: 1
    }
})
