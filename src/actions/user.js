import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN' 

import SInfo from 'react-native-sensitive-info'
import {
    PROFILE_PHOTO_UPLOAD_SUCCESS,
    PROFILE_PHOTO_UPLOAD_FAIL,
    PROFILE_PHOTO_UPLOADING,
    ALL_USERS_LOADED_SUCCESS,
    ALL_USERS_LOADED_FAIL,
    ALL_USERS_LOADING,
    FETCH_URL,
    UPDATE_FIRST_NAME_SUCCESS,
    UPDATE_FIRST_NAME_FAIL,
    UPDATE_LAST_NAME_SUCCESS,
    UPDATE_LAST_NAME_FAIL,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAIL,
    REGISTER_DEVICE_SUCCESS,
    REGISTER_DEVICE_FAIL,
    DELETE_DEVICE_SUCCESS,
    DELETE_DEVICE_FAIL,
    UPDATE_LANGUAGE_SUCCESS,
    UPDATE_LANGUAGE_FAIL,
    THEME_CHANGED_SUCCESS} from '../constants/index'


//UPLOAD PROFILE PHOTO
export const uploadProfilePhoto = (formData, userId) => (dispatch) => {

    dispatch({type: PROFILE_PHOTO_UPLOADING})
    
        const config = {
            headers: 
            {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
            },
            withCredentials: true
        }

        axios.put(`${FETCH_URL}/api/v1/user/profile/addphoto`, formData, config)
            .then(res => {
                dispatch({
                    type: PROFILE_PHOTO_UPLOAD_SUCCESS,
                    payload: res.data,
                    userId
                    })
                }).catch(err => {
                    console.log(err)
                    dispatch({
                        type: PROFILE_PHOTO_UPLOAD_FAIL
                    })
            })
}

//GET USERS
export const getUsers = () => (dispatch) => {

    dispatch({type: ALL_USERS_LOADING})
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/users/`, config)
        .then(res => {
            dispatch({
                type: ALL_USERS_LOADED_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: ALL_USERS_LOADED_FAIL
            })
        })
}

//CHANGE FIRST NAME
export const updateFirstName = (firstName) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ first_name: firstName })

        axios.patch(`${FETCH_URL}/api/v1/user/edit/`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_FIRST_NAME_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: UPDATE_FIRST_NAME_FAIL
            })
        })    
}

//CHANGE LAST NAME
export const updateLastName = (lastName) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ last_name: lastName })

        axios.patch(`${FETCH_URL}/api/v1/user/edit/`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_LAST_NAME_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: UPDATE_LAST_NAME_FAIL
            })
        })
}

export const loadProfile = (username) => dispatch => {
  
    const config = {
        headers: {
            "Content-type": "application/json"
        },
        withCredentials: true
    }
    axios.get(`${FETCH_URL}/api/v1/user/${username}/profile`, config)
        .then(res => {
            dispatch({
                type: PROFILE_LOAD_SUCCESS,
                payload: res.data,
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: PROFILE_LOAD_FAIL
            })
        })
} 

export const registerDevice = (registerId, type) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ registration_id: registerId, type: type })
        
        axios.post(`${FETCH_URL}/add/device/`, body, config)
        .then(() => {
            dispatch({
                type: REGISTER_DEVICE_SUCCESS
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: REGISTER_DEVICE_FAIL
            })
        })
}

export const deleteDevice = (registerId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ registration_id: registerId})
        
        axios.delete(`${FETCH_URL}/delete/device/${registerId}/`, body, config)
        .then(() => {
            dispatch({
                type: DELETE_DEVICE_SUCCESS
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: DELETE_DEVICE_FAIL
            })
        })  
    
}

export const changePrefferedLanguage = (language) => dispatch => {

    const config = {
        headers: 
        {
            'Content-type': 'application/json',
        },
        withCredentials: true
    }

    const body = JSON.stringify({ language: language })

    axios.patch(`${FETCH_URL}/api/v1/user/profile/langauge`, body, config)
    .then((res) => {
        dispatch({
            type: UPDATE_LANGUAGE_SUCCESS,
            payload: res.data
        })
    }).catch(() => {
        dispatch({
            type: UPDATE_LANGUAGE_FAIL
        })
    })

}

export const changeTheme = () => dispatch => {

    dispatch({ type: THEME_CHANGED_SUCCESS })
}