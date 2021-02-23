import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { connect, useSelector } from 'react-redux'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob'

import language from './src/languages/Languages'
import { loadUser } from './src/actions/auth'
import { changePrefferedLanguage, getBlockedUsers, getUsers, registerDevice } from './src/actions/user'
import { MainStack }  from './screens/navigation'
import { ThemeContext, themes } from './src/constants/context'
import { refreshToken, registerAppWithFCM, unSubscribeRefreshToken, checkPermission, messageListener } from './src/notifications/FCM'
import { getIsDarkThemeInfo, getPreferredLanguageInfo } from './src/constants/selector'
import { notificationLinking } from './src/notifications/DeepLinking'


const App = ({ loadUser, getUsers, registerDevice, changePrefferedLanguage, getBlockedUsers }) => {

  const isDark = useSelector(getIsDarkThemeInfo)
  const prefferedLanguage = useSelector(getPreferredLanguageInfo)

  const [isDarkTheme, setIsDarkTheme] = useState(isDark)

  const toggleTheme = useCallback(() => {
    return setIsDarkTheme(!isDarkTheme)
  }, [isDarkTheme])

  const themeContext = useMemo(() => ({
    toggleTheme,
    isDarkTheme
  }), [toggleTheme,isDarkTheme])

  const admobConf = () => {
    admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    })
  }
  


  const chooseLanguage = useCallback(() => {

      const lng = language.getInterfaceLanguage().substring(0,2)

      let moment = require('moment')
      require('moment/locale/tr')
      require('moment/locale/en-gb')
      
      if (lng === 'tr')
      {
        moment.locale('tr')
        if (prefferedLanguage === 'en')
          changePrefferedLanguage('tr')
      }

      language.setLanguage(lng)
  }, [changePrefferedLanguage, prefferedLanguage])


  useEffect(() => {
    chooseLanguage()
    getBlockedUsers()

    checkPermission()
    registerAppWithFCM()
    admobConf()
    refreshToken()
      
    loadUser()
    getUsers()

    return () => {
      messageListener()
      unSubscribeRefreshToken()
    }
  }, [chooseLanguage, getBlockedUsers, getUsers, loadUser, registerDevice])



  return (
    <ThemeContext.Provider value={themeContext}>
      <PaperProvider theme={isDarkTheme ? themes.dark : themes.light}>
        <NavigationContainer theme={isDarkTheme ? themes.dark : themes.light} linking={notificationLinking}>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export default connect(null, { loadUser, getUsers, registerDevice, changePrefferedLanguage, getBlockedUsers })(App)
