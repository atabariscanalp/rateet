import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN' 

import SInfo from 'react-native-sensitive-info'
import { deleteToken } from '../notifications/FCM'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FETCHING_REGISTER_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    COMPLETED_REGISTRATION,
    FETCH_URL,
    RESET_PASSWORD_EMAIL_SENT_SUCCESS,
    RESET_PASSWORD_EMAIL_SENT_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL } from '../constants/index'



//LOAD USER
export const loadUser = () => (dispatch) => {

    dispatch({ type: USER_LOADING })
        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        axios.get(`${FETCH_URL}/auth/user/`, config)
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: AUTH_ERROR
                })
            })
}


//LOGIN USER
export const login = (username, password) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        },
        withCredentials: true
    }

    //Request body
    const body = JSON.stringify({ username, password })

    axios.post(`${FETCH_URL}/auth/login/`, body, config)
        .then(res => {
            SInfo.setItem('access_token', res.data.access_token, {})
            SInfo.setItem('refresh_token', res.data.refresh_token, {})
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: LOGIN_FAIL,
                response: err.response,
                message: err.message
            })
        })
}


//LOGOUT USER
export const logout = () => dispatch => {

    SInfo.deleteItem('access_token', {}).then(async () => {
        const config = {
            headers: {
                "Content-type": "application/json", 
            },
            withCredentials: true
        }

        deleteToken() //***deletes the FCM token!***

        /* axios.get() */ //?

        await SInfo.deleteItem('refresh_token', {}) //also delete refresh token to prevent login automatically if not logged in as another user
    
        axios.post(`${FETCH_URL}/auth/logout/`, config)
            .then(() => {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: LOGOUT_FAIL
                })
            })
    })
}

//REGISTER USER
export const register = (email, username, password) => dispatch => {
    
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    dispatch({ type: FETCHING_REGISTER_ERRORS })

    const body = JSON.stringify({ email: email, username: username, password: password })

    axios.post(`${FETCH_URL}/auth/register/`, body, config)
        .then(res => {
            SInfo.setItem('access_token', res.data.access_token, {})
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: REGISTER_FAIL,
                response: err.response,
                message: err.message
            })
        })
}

export const completeRegistration = () => (dispatch) => {
    dispatch({
        type: COMPLETED_REGISTRATION
    })
}

export const resetPassword = email => dispatch => {
        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
        }

        const body = JSON.stringify({ email: email })
        
        axios.post(`${FETCH_URL}/auth/password/reset/`, body, config)
            .then(() => {
                dispatch({
                    type: RESET_PASSWORD_EMAIL_SENT_SUCCESS,
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RESET_PASSWORD_EMAIL_SENT_FAIL
                })
            })
        
}

export const resetPasswordConfirm = (uid, token, new_password1, new_password2) => dispatch => {
    const config = {
        headers: 
        {
            'Content-type': 'application/json',
        },
    }

    const body = JSON.stringify({ uid, token, new_password1, new_password2 })
    
    axios.post(`${FETCH_URL}/auth/password/reset/confirm/`, body, config)
        .then(() => {
            dispatch({
                type: RESET_PASSWORD_CONFIRM_SUCCESS,
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            })
        })
}

/* export const refreshToken = async () => dispatch => {

    SInfo.getItem('refresh_token',{}).then(token => {
        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ refresh: token })
        
        axios.post(`${FETCH_URL}/api/v1/token/refresh/`, body, config)
            .then(res => {
                console.log("response: ", res)
                SInfo.setItem('access_token', res.data.access, {})
                SInfo.setItem('refresh_token', res.data.refresh, {})
                dispatch({
                    type: TOKEN_REFRESH_SUCCESS,
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: TOKEN_REFRESH_FAIL
                })
            })
    })

} */