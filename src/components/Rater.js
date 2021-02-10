import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-rating-element'
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { useNavigation, useTheme } from '@react-navigation/native'
import { MemoizedProfilePhoto } from './PostProfilePhoto'
import { CustomText } from '../../shared/components'

export default function Rater({ rater, setModalVisible, fullstarIcon, emptystarIcon }) {
    
    //THEME
    const { colors } = useTheme()
    //NAVIGATION
    const navigation = useNavigation()
    //METHODS
    const onPress = () => {
        navigation.navigate('Profile', { screen: 'profile', params: {username: rater.user, id: rater.user_id}})
        setModalVisible(false)
    }
    //DYNAMIC STYLES
    const usernameStyle = {fontWeight: 'bold', color: colors.text}
    const extraStyle = {marginHorizontal: '5%', marginTop: '6%'}

    return (
        <SafeAreaView key={rater.id} style={styles.container}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <MemoizedProfilePhoto size={40} userId={rater.user_id} extraStyles={extraStyle} />
                <CustomText style={usernameStyle}>{rater.user}</CustomText>
            </TouchableOpacity>
            <SafeAreaView style={styles.rateView}>
                <CustomText style={styles.text}>{rater.rate}</CustomText>
                <Rating 
                    type="custom"
                    selectedIconImage={fullstarIcon}
                    emptyIconImage={emptystarIcon}
                    readonly={true}
                    rated={rater.rate}
                    size={22}
                    marginBetweenRatingIcon={0.1}
                />
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    text: {
        fontSize: responsiveScreenFontSize(2.6), 
        marginRight: '5%',
        color: 'grey'
    },
    touchableOpacity: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    rateView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

