import React, { useEffect, useRef } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import { useScrollToTop } from '@react-navigation/native'
import RNBootSplash from "react-native-bootsplash";



import { getIsAuthenticatedInfo, getIsLoadingInfo, getPostTitleInfo, getRegisterSuccessInfo } from '../src/constants/selector'
import languages from '../src/languages/Languages'

import AddProfilePhoto from './AddProfilePhotoScreen'
import AddProfileInfo from './AddProfileInfoScreen'
import AddPost from './AddPost'
import AddPostAfter from './AddPostAfter'
import Category from './CategoryScreen'
import ChangePassword from './ChangePasswordScreen'
import CommentDetail from './CommentDetailScreen'
import EditProfile from './EditProfileScreen'
import ForgotPassword from './ForgotPasswordScreen'
import GetStarted from './GetStartedScreen'
import Header from '../shared/header'
import Home from './HomeScreen'
import Login from './LoginScreen'
import NotificationCenter from './NotificationsScreen'
import PasswordResetSent from './PasswordResetSentScreen'
import Profile from './ProfileScreen'
import PostDetail from './PostDetailScreen'
import Search from './SearchScreen'
import SignUp from './SignupScreen'
import TabNav from './TabNavigation'

const Stack = createStackNavigator()

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="profile">
            <Stack.Screen name="profile" component={Profile} options={{headerShown: false, headerBackground: '#87CEFA'}}/>
            <Stack.Screen name="edit-profile" component={EditProfile} 
                options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false}}/>
        </Stack.Navigator>
    )
}
    
const NotificationsStack = () => {

    return (
        <Stack.Navigator initialRouteName="NotificationCenter">
            <Stack.Screen name="NotificationCenter" component={NotificationCenter} options={{headerTitle: languages.notifications, headerTitleAlign: 'center', headerBackTitle: languages.home}}/>
            <Stack.Screen name="PostDetail" component={PostDetailStack} options={{ headerShown: false, headerBackTitle: languages.notifications }}/>
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    const { colors } = useTheme()
    const ref = useRef(null)
    useScrollToTop(ref)
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home}  initialParams={{ scrollRef: ref, colors: colors }} options={({navigation}) => {
                return {
                    headerStyle: {backgroundColor: colors.header, borderBottomWidth: 1.4},
                    headerTitle: () => <Header navigation={navigation} colors={colors}/>,
                }
            }}/>
            <Stack.Screen name="CommentDetail" component={CommentDetail} options={{headerTitle: languages.commentsHeader, headerTitleAlign: 'center', headerBackTitle: languages.home}}/>
            <Stack.Screen name="NotificationCenter" component={NotificationsStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const AddPostStack = () => {
    return (
        <Stack.Navigator initialRouteName="add-post" mode="modal" headerMode="none">
            <Stack.Screen name="add-post" component={AddPost} options={{animationEnabled: false ,cardStyle: {backgroundColor: 'transparent'}}} />
            <Stack.Screen name="add-post-after" component={AddPostAfter} options={{animationEnabled: false ,cardStyle: {backgroundColor: 'transparent'}}} />
        </Stack.Navigator>
    )
}

const RegisterStack = () => {
    return (
        <Stack.Navigator initialRouteName="register" screenOptions={{headerShown: false}} mode="modal">
            <Stack.Screen name="add-profile-info" component={AddProfileInfo} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <Stack.Screen name="add-profile-photo" component={AddProfilePhoto} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
        </Stack.Navigator>
    )
}

const AuthStack = () => {

    return (
        <Stack.Navigator initialRouteName="get-started" screenOptions={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            <Stack.Screen name="get-started" component={GetStarted}/>
            <Stack.Screen name="register" component={SignUp}/>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="forgot-password" component={ForgotPassword}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            <Stack.Screen name="password-reset-sent" component={PasswordResetSent}/>
        </Stack.Navigator>
    )    
}


const CategoryStack = ({route}) => {

    const { category } = route.params
    const { colors } = useTheme()
    return (
        <Stack.Navigator initialRouteName="category">
            <Stack.Screen name="category" component={Category} initialParams={{ category: category, colors: colors}} options={({navigation}) => {
                return {
                    headerTitle: () => <Header navigation={navigation} colors={colors} category={category} />
                }
            }}/>
            <Stack.Screen name="CommentDetail" component={CommentDetail} options={{headerTitle: languages.commentsHeader, headerTitleAlign: 'center', headerBackTitle: languages.category}}/>
        </Stack.Navigator>
    )
}

const MainStack = () => {

    const isAuthenticated = useSelector(getIsAuthenticatedInfo)
    const registerSuccess = useSelector(getRegisterSuccessInfo)
    const isLoading = useSelector(getIsLoadingInfo)

    useEffect(() => {       
        const timer = setTimeout(() => {
            if (!isLoading) {
                RNBootSplash.hide()
            }
        }, 250)
        return () => {
            clearTimeout(timer)
        }
    }, [isLoading])

    
    return (        
        <Stack.Navigator>
            {isAuthenticated ? 
                <Stack.Screen name="HomeStack" component={RootStack} options={{headerShown: false}}/>
                :
                registerSuccess ? 
                        <Stack.Screen name="RegisterStack" component={RegisterStack} options={{headerShown: false}}/>
                    :
                        <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}}/>
            }
        </Stack.Navigator>
    )
}

const RootStack = () => {

    return (
        <Stack.Navigator initialRouteName="home" mode="modal" headerMode="none">
            <Stack.Screen name="home" component={TabNav}/>
            <Stack.Screen name="add-post" component={AddPostStack} options={{animationEnabled: false ,cardStyle: {backgroundColor: 'transparent'}}} />
        </Stack.Navigator>
    )
}

const PostDetailStack = ({ route }) => {
    
    const postId = route?.params?.postId
    var postTitle = useSelector(state => getPostTitleInfo(state, postId))
    if (route.params.params.postTitle) 
        postTitle = route.params.params.postTitle

    return (
        <Stack.Navigator initialRouteName="PostDetail" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            <Stack.Screen name="PostDetail" component={PostDetail} options={({ route }) => ({
                headerTitle: postTitle ? postTitle : "post",
                headerTitleAlign: 'center',
                //headerBackTitle: languages.search
            })}/>
            <Stack.Screen name="CommentDetail" component={CommentDetail} options={{headerTitle: languages.commentsHeader, headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
    )
}

const SearchStack = () => {

    return (
        <Stack.Navigator initialRouteName="search" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
            <Stack.Screen name="search" component={Search} options={{ headerShown: false, headerTitle: languages.search }}/>
            <Stack.Screen name="PostDetail" component={PostDetailStack} options={{ headerShown: false }}/>
            <Stack.Screen name="profile" component={Profile} options={{ headerShown: false, headerTitle: languages.profile }}/>
        </Stack.Navigator>
    )
}


export {HomeStack, AddPostStack, RegisterStack, AuthStack, CategoryStack, MainStack, RootStack, SearchStack, ProfileStack}

