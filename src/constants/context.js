import { createContext } from 'react'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native'


export const ThemeContext = createContext({
    setTheme: () => {},
    isDarkTheme: false
})

export const themes = {
    dark: {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        background: 'black',
        text: 'white',
        tabnav: '#141414',
        tabnavIcon: 'white',
        drawernavText: 'white',
        header: '#141414',
        headerTintColor: 'white',
        drawerMenuIcon: 'white',
        postTitle: 'white',
        ratedBy: 'white',
        comment: 'white',
        replyToComment: 'grey',
        placeholder: '#777',
        postRateText: 'grey',
        star: '#939393',
        searchScreenText: 'white',
        modal: '#141414',
        statusBarHome: '#141414',
        statusBarHomeContent: 'light-content',
        statusBarSearch: 'black',
        textInputBackground: '#2e2e2e',
        commentForm: '#2a2a2a',
        inputBorderColor: '#777',
        inputBackgroundColor: 'black'
        }
    },
    light: {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        text: 'black',
        tabnav: 'white',
        tabnavIcon: 'black',
        drawernavText: 'black',
        header: 'white',
        headerTintColor: 'black',
        drawerMenuIcon: 'black',
        postTitle: 'black',
        ratedBy: 'black',
        comment: 'black',
        replyToComment: 'grey',
        placeholder: '#C7C7CD',
        postRateText: 'black',
        star: 'black',
        searchScreenText: 'black',
        modal: 'white',
        statusBarHome: 'white',
        statusBarHomeContent: 'dark-content',
        statusBarSearch: '#F2F2F2',
        textInputBackground: '#DCDCDC',
        commentForm: '#f7f7f7',
        inputBorderColor: '#aaa',
        inputBackgroundColor: '#ececec'
        }
    }
}

export function shallowEqual(objA, objB) {
    if (objA === objB) 
        return true
    
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) 
        return false
    
    var keysA = Object.keys(objA)
    var keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) 
        return false

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB)
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) 
            return false
        
    }
  
    return true
}