import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { CustomText } from '../../shared/components'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import languages from '../languages/Languages'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

export default function RatedBy({raters, setModalVisible}) {

    //VARIABLES
    const raterCount = Object.values(raters).length
    //THEME
    const { colors } = useTheme()

    if (raterCount <= 3 && raterCount > 0){
        return (
            <SafeAreaView style={styles.raters}>
                <CustomText style={[styles.ratedByText, {color: colors.ratedBy}]} onPress={() => setModalVisible(true)}>{languages.ratedBy}</CustomText>
                {Object.values(raters).map(rater => {
                    return <MemoizedProfilePhoto size={20} userId={rater.user_id} key={rater.user_id}/>
                })}
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.raters}>
                <CustomText style={[styles.ratedByText, {color: colors.ratedBy}]} onPress={() => setModalVisible(true)}>{languages.ratedBy}</CustomText>
                {Object.entries(raters).map(([key, rater], index) => {
                    if (index <= 2){
                        return <MemoizedProfilePhoto size={20} userId={rater.user_id} key={rater.user_id}/>
                    } else if (index === 3){
                        return <CustomText style={[styles.otherText, {color: colors.ratedBy}]} key={rater.user_id} onPress={() => setModalVisible(true)}>{languages.andOthers}</CustomText>
                    } else {
                        return null
                    }
                })}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    raters: {
        flexDirection: 'row',
        marginHorizontal: 3,
        marginTop: 6,
        marginLeft: '2%',
        alignItems: 'center'
    },
    raterAvatar: {
        overflow: 'hidden',
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        marginTop: '2%'
    },
    ratedByText: {
        fontWeight: 'bold', 
        marginRight: 4,
        marginLeft: '2%', 
        marginTop: '2%', 
        marginBottom: '2.5%',
        fontSize: responsiveScreenFontSize(1.7)
    },
    otherText: {
        fontWeight: 'bold', 
        fontFamily: 'Open Sans', 
        marginTop: '2%', 
        marginBottom: '2.5%',
        marginLeft: '2%'
    }
})