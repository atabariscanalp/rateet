//Post
export const GET_POSTS = 'GET_POSTS'
export const GETTING_POSTS = 'GETTING_POSTS'
export const GET_MORE_POSTS_SUCCESS = 'GET_MORE_POSTS_SUCCESS'
export const GET_MORE_POSTS_FAIL = 'GET_MORE_POSTS_FAIL'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_MORE_POSTS_BY_CATEGORY_SUCCESS = 'GET_MORE_POSTS_BY_CATEGORY_SUCCESS'
export const GET_MORE_POSTS_BY_CATEGORY_FAIL = 'GET_MORE_POSTS_BY_CATEGORY_FAIL'
export const FETCHING_NEW_CATEGORY = 'FETCHING_NEW_CATEGORY'
export const FETCHING_POST = 'FETCHING_POST'
export const GET_POST_DETAIL = 'GET_POST_DETAIL'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const ADD_POST_FAIL = 'ADD_POST_FAIL'
export const RATE_POST = 'RATE_POST'
export const RATE_POST_FAIL = 'RATE_POST_FAIL'
export const RATE_POST_UPDATE = 'RATE_POST_UPDATE'
export const RATE_POST_UPDATE_FAIL = 'RATE_POST_UPDATE_FAIL'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const ADDING_POST = 'ADDING_POST'
export const INCREMENT_PAGE = 'INCREMENT_PAGE'
export const REPORT_POST_SUCCESS = 'REPORT_POST_SUCCESS'
export const REPORT_POST_FAIL = 'REPORT_POST_FAIL'

//Comments
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL'
export const GET_COMMENTS_FOR_POST_SUCCESS = 'GET_COMMENTS_FOR_POST_SUCCESS'
export const GET_COMMENTS_FOR_POST_FETCHING = 'GET_COMMENTS_FOR_POST_FETCHING'
export const GET_COMMENTS_FOR_POST_FAIL = 'GET_COMMENTS_FOR_POST_FAIL'
export const UPLOADING_COMMENT = 'UPLOADING_COMMENT'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL'
export const AFTER_ADDED_COMMENT = 'AFTER_ADDED_COMMENT'
export const REPLY_COMMENT_SUCCESS = 'REPLY_COMMENT_SUCCESS'
export const REPLY_COMMENT_FAIL = 'REPLY_COMMENT_FAIL'
export const REPLY_TO_REPLY_SUCCESS = 'REPLY_TO_REPLY_SUCCESS'
export const REPLY_TO_REPLY_FAIL = 'REPLY_TO_REPLY_FAIL'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL'
export const GET_MORE_COMMENTS_SUCCESS = 'GET_MORE_COMMENTS_SUCCESS'
export const GET_MORE_COMMENTS_FAIL = 'GET_MORE_COMMENTS_FAIL'
export const RATE_COMMENT_SUCCESS = 'RATE_COMMENT_SUCCESS'
export const RATE_COMMENT_FAIL = 'RATE_COMMENT_FAIL'
export const RATE_COMMENT_UPDATE_SUCCESS = 'RATE_COMMENT_UPDATE_SUCCESS'
export const RATE_COMMENT_UPDATE_FAIL = 'RATE_COMMENT_UPDATE_FAIL'
export const RATE_CHILD_COMMENT_SUCCESS = 'RATE_CHILD_COMMENT_SUCCESS'
export const RATE_CHILD_COMMENT_FAIL = 'RATE_CHILD_COMMENT_FAIL'
export const RATE_UPDATE_CHILD_COMMENT_SUCCESS = 'RATE_UPDATE_CHILD_COMMENT_SUCCESS'
export const RATE_UPDATE_CHILD_COMMENT_FAIL = 'RATE_UPDATE_CHILD_COMMENT_FAIL'

//User
export const USER_LOADING = 'USER_LOADING'
export const USER_LOADED = 'USER_LOADED'
export const ALL_USERS_LOADING = 'ALL_USERS_LOADING'
export const ALL_USERS_LOADED_SUCCESS = 'ALL_USERS_LOADED_SUCCESS'
export const ALL_USERS_LOADED_FAIL = 'ALL_USERS_LOADED_FAIL'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const FETCHING_REGISTER_ERRORS = 'FETCHING_REGISTER_ERRORS'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS'
export const PROFILE_LOAD_FAIL = 'PROFILE_LOAD_FAIL'
export const PROFILE_PHOTO_UPLOAD_SUCCESS = 'PROFILE_PHOTO_UPLOAD_SUCCESS'
export const PROFILE_PHOTO_UPLOAD_FAIL = 'PROFILE_PHOTO_UPLOAD_FAIL'
export const PROFILE_PHOTO_UPLOADING = 'PROFILE_PHOTO_UPLOADING'
export const COMPLETED_REGISTRATION  = 'COMPLETED_REGISTRATION'
export const UPDATE_FIRST_NAME_SUCCESS = 'UPDATE_FIRST_NAME_SUCCESS'
export const UPDATE_FIRST_NAME_FAIL = 'UPDATE_FIRST_NAME_FAIL'
export const UPDATE_LAST_NAME_SUCCESS = 'UPDATE_LAST_NAME_SUCCESS'
export const UPDATE_LAST_NAME_FAIL = 'UPDATE_LAST_NAME_FAIL'
export const RESET_PASSWORD_EMAIL_SENT_SUCCESS = 'RESET_PASSWORD_EMAIL_SENT_SUCCESS'
export const RESET_PASSWORD_EMAIL_SENT_FAIL = 'RESET_PASSWORD_EMAIL_SENT_FAIL'
export const RESET_PASSWORD_CONFIRM_SUCCESS = 'RESET_PASSWORD_CONFIRM_SUCCESS'
export const RESET_PASSWORD_CONFIRM_FAIL = 'RESET_PASSWORD_CONFIRM_FAIL'
export const UPDATE_LANGUAGE_SUCCESS = 'UPDATE_LANGUAGE_SUCCESS'
export const UPDATE_LANGUAGE_FAIL = 'UPDATE_LANGUAGE_FAIL'

//NOTIFICATIONS
export const REGISTER_DEVICE_SUCCESS = 'REGISTER_DEVICE_SUCCESS'
export const REGISTER_DEVICE_FAIL = 'REGISTER_DEVICE_FAIL'
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS'
export const DELETE_DEVICE_FAIL = 'DELETE_DEVICE_FAIL'

//AUTH
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS'
export const TOKEN_REFRESH_FAIL = 'TOKEN_REFRESH_FAIL'

//UI
export const THEME_CHANGED_SUCCESS = 'THEME_CHANGED_SUCCESS'
export const THEME_CHANGED_FAIL = 'THEME_CHANGED_FAIL'

//URLS
export const FETCH_URL = 'https://rateet.com'
export const MEDIA_URL = 'https://rateappbucket.s3.amazonaws.com/media/'