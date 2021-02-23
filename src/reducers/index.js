import { combineReducers } from 'redux'
import { posts, postDetail } from './posts'
import { users, profile, ui, blockedUsers } from './users'
import auth from './auth'

export default combineReducers({
    postDetail,
    posts,
    auth,
    users,
    profile,
    ui,
    blockedUsers
})