import React from 'react'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { getProfilePhoto } from '../constants/selector'

export const MemoizedProfilePhoto = React.memo(({ size, userId, extraStyles }) => {
    const profilePhoto = useSelector(state => getProfilePhoto(state, userId))

    const profilePhotoStyle = {
        height: size, 
        width: size, 
        borderRadius: size / 2,
    }

    const mergedStyle = {...profilePhotoStyle, ...extraStyles}

    const getProfilePhotoUri = () => {
        const defaultProfilePic = require('../../assets/images/default-profile-pic.jpg')
        return profilePhoto === "" ? defaultProfilePic : { uri: profilePhoto }
    }

    if (profilePhoto !== null) {
        return <FastImage source={getProfilePhotoUri()} style={mergedStyle} />
    } else {
        return null
    }

}) 
