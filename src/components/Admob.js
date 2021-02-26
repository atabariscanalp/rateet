import React from 'react';
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';

export default function Add() {

    const unitId = Platform.OS === 'ios' ? 'ca-app-pub-8587973257970555/9320870917' : 'ca-app-pub-8587973257970555/9998871220'

    return (
        <SafeAreaView style={styles.container}>
            <BannerAd 
                unitId={unitId}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})