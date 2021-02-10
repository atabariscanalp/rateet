import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DrawerNavigator from './DrawerNavigation'
import { SearchStack } from './navigation'
import AddPost from './AddPost'
import { useTheme } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

    const { colors } = useTheme()

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName
                    if (route.name === "home"){
                        iconName = focused ? 'ios-home' : 'ios-home-outline'
                        color = colors.tabnavIcon
                        size = 32
                    } else if (route.name === "add"){
                        iconName = focused ? 'add-circle-sharp' : 'add-circle-outline'
                        color = 'orange'
                        size = 32
                    } else if (route.name === "search"){
                        iconName = focused ? 'search' : 'search-outline'
                        color = colors.tabnavIcon
                        size = 32
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            initialRouteName="home"
            tabBarOptions={{
                showLabel: false,
                activeBackgroundColor: colors.tabnav,
                inactiveBackgroundColor: colors.tabnav
            }}
            
        >
            <Tab.Screen name="home" component={DrawerNavigator}  listeners={({navigation, route}) => ({
                tabPress: () => {
                    //let r = getFocusedRouteNameFromRoute(route)
                    let routeIndex = route.state?.index
                    
                    
                    if (routeIndex){
                        if (routeIndex !== 0) navigation.navigate('Home')
                        else null
                    }
                    else {
                        navigation.navigate('Home')
                    } 
                }
            })}/>
            <Tab.Screen name="add" component={AddPost} listeners={({navigation}) => ({
                tabPress: event => {
                    event.preventDefault()
                    navigation.navigate('add-post')                    
                }
            })}
             />
            <Tab.Screen name="search" component={SearchStack}/>
        </Tab.Navigator>
    )
}

export default BottomTabNavigator 

