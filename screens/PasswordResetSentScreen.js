import React from 'react' 
import { SafeAreaView, StyleSheet } from 'react-native'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { CustomText } from '../shared/components'
import languages from '../src/languages/Languages'

export default function PasswordResetSentScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView>
                <AntDesign name="checkcircleo" color="green" size={90} style={styles.logo} />
                <CustomText style={styles.capsTitle}>
                    {languages.emailSent}
                </CustomText>
                <CustomText style={styles.title}>
                    {languages.instructionsSent}
                </CustomText>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#bbb',
        fontSize: responsiveScreenFontSize(2.3),
        marginTop: '6%'
    },
    capsTitle: {
        color: 'white',
        fontSize: responsiveScreenFontSize(4),
        alignSelf: 'center',
        marginTop: '5%'
    },
    logo: {
        alignSelf: 'center'
    }
})