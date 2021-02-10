import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import languages from '../src/languages/Languages'

export default class Header extends React.Component {
    openMenu = () => {
        this.props.navigation.openDrawer()
    }

    openNotificationCenter = () => {
        this.props.navigation.navigate('NotificationCenter')
    }

    
    render(){
        const { colors } = this.props
        const categoryTitle = this.props.category ? this.props.category : null
        return (
            <SafeAreaView style={styles.header}>
                <Ionicons name="menu" size={28} color={colors.drawerMenuIcon} style={styles.icon} onPress={this.openMenu} />
                <SafeAreaView style={styles.textView}>
                    <Text style={[styles.headerText, {color: colors.headerTintColor}]}>{categoryTitle ? languages[categoryTitle] : 'rateet' }</Text>
                </SafeAreaView>
                <Ionicons name="ios-notifications-outline" size={28} color={colors.drawerMenuIcon} style={styles.notificationIcon} onPress={this.openNotificationCenter} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        fontStyle: 'italic',
    },
    icon: {
        marginRight: 'auto'
    },
    textView: {
        alignItems: 'center'
    },
    notificationIcon: {
        marginLeft: 'auto'
    }
})