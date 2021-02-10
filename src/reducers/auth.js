import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    PROFILE_PHOTO_UPLOAD_SUCCESS,
    COMPLETED_REGISTRATION,
    UPDATE_LAST_NAME_SUCCESS,
    UPDATE_FIRST_NAME_SUCCESS,
    FETCHING_REGISTER_ERRORS,
    UPDATE_LANGUAGE_SUCCESS} from '../constants/index'

import { produce, enableES5 } from 'immer'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    registerErrors: [],
    loginErrors: [],
    firstLogin: true,
    fetchingRegisterErrors: true,
    registerSuccess: false,
    registerFail: false
} 


export default function(state = initialState, action){
    enableES5()
    return (
        produce(state, draft => {
            switch (action.type){
                case USER_LOADING:
                    draft.isLoading = true
                    break
                case USER_LOADED:
                    draft.isAuthenticated = true
                    draft.isLoading = false
                    draft.user = action.payload
                    draft.firstLogin = false
                    break
                case AUTH_ERROR:
                    draft.isLoading = false
                    break
                case LOGIN_FAIL:
                    draft.loginErrors = action.response
                    break
                case LOGOUT_SUCCESS:
                    draft.isAuthenticated = false
                    draft.isLoading = false
                    /* draft.user = null */
                    break
                case REGISTER_SUCCESS:
                    draft.isAuthenticated = false
                    draft.isLoading = false
                    draft.user = action.payload.user
                    draft.firstLogin = true
                    draft.fetchingRegisterErrors = false
                    draft.registerSuccess = true
                    break
                case LOGIN_SUCCESS:
                    draft.isAuthenticated = true
                    draft.isLoading = false
                    draft.user = action.payload.user
                    draft.firstLogin = false
                    draft.loginErrors = []
                    break
                case PROFILE_PHOTO_UPLOAD_SUCCESS:
                    draft.user.profile_photo = action.payload.profile_photo
                    break
                case FETCHING_REGISTER_ERRORS:
                    draft.registerErrors = []
                    draft.fetchingRegisterErrors = true
                    draft.registerFail = false
                    break
                case REGISTER_FAIL: 
                    draft.registerErrors.push(action.response)
                    draft.fetchingRegisterErrors = false
                    draft.registerFail = true
                    break
                case COMPLETED_REGISTRATION:
                    draft.isAuthenticated = true
                    draft.registerSuccess = false
                    break
                case UPDATE_LAST_NAME_SUCCESS:
                    draft.user.last_name = action.payload.last_name
                    break
                case UPDATE_FIRST_NAME_SUCCESS:
                    draft.user.first_name = action.payload.first_name
                    break
                case UPDATE_LANGUAGE_SUCCESS:
                    draft.user.language = action.payload.language
                    break
                default:
                    return draft
            }
        })
    )
    
}

