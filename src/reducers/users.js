import { produce, enableES5 } from 'immer'
import { ADD_COMMENT_SUCCESS,
    ADD_POST,
    ALL_USERS_LOADED_SUCCESS, 
    DELETE_COMMENT_SUCCESS, 
    PROFILE_LOAD_SUCCESS, 
    PROFILE_PHOTO_UPLOAD_SUCCESS, 
    RATE_CHILD_COMMENT_SUCCESS, 
    RATE_COMMENT_UPDATE_SUCCESS, 
    RATE_POST, 
    RATE_POST_UPDATE, 
    RATE_UPDATE_CHILD_COMMENT_SUCCESS, 
    REGISTER_SUCCESS, 
    REPLY_COMMENT_SUCCESS,
    THEME_CHANGED_SUCCESS} from '../constants'

const initialState = {
    usersById: {},
    usersLoaded: false
}

const profileState = {
    user: {},
    posts: {},
    avgRate: "",
    postCount: 0
}

const uiState = {
    isDark: false
}

export function ui(state = uiState, action){
    enableES5()
    return (
        produce(state, draft => {
            switch (action.type) {
                case THEME_CHANGED_SUCCESS:
                    draft.isDark = !draft.isDark
                    break
                default:
                    return draft
            }
        })
    )
}

export function users(state = initialState, action){
    enableES5()
    return (
        produce(state, draft => {
            const userId = action.userId
            switch (action.type){
                case ALL_USERS_LOADED_SUCCESS:
                    action.payload.map(user => {
                        draft.usersById[user.id] = user
                    })
                    draft.usersLoaded = true
                    break
                case REGISTER_SUCCESS:
                    draft.usersById[action.payload.user.pk] = {'id': action.payload.user.pk, 'profile_photo': action.payload.user.profile_photo, 'username': action.payload.user.username}
                    break
                case PROFILE_PHOTO_UPLOAD_SUCCESS:
                    draft.usersById[userId].profile_photo = action.payload.profile_photo
                    break
                default:
                    return draft
            }
        })
    )
}

export function profile(state = profileState, action){
    enableES5()
    return (
        produce(state, draft => {
            const postId = action.postId
            const commentId = action.commentId
            const parentId = action.parentId
            const rate = action.Rate
            const updateRateId = action.updateRateId
            switch (action.type){
                case PROFILE_LOAD_SUCCESS:
                    draft.user = action.payload.user
                    draft.avgRate = action.payload.average_rate
                    draft.postCount = action.payload.post_num
                    if (Object.values(draft.posts).length > 0){
                        Object.keys(draft.posts).map(key => {
                            delete draft.posts[key]
                        })
                    }
                    action.payload.posts.map(post => {
                        draft.posts[`p-${post.id}`] = post
                    })
                    break
                case ADD_POST:
                    var newPost = {[`p-${action.payload.id}`]: action.payload}
                    draft.posts = {...newPost, ...draft.posts}
                    draft.addingPost = false
                    break
                case ADD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[action.payload.id] = action.payload
                    }
                    break
                case DELETE_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        delete draft.posts[`p-${postId}`].comments[commentId]
                    }
                    break
                case REPLY_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[action.payload.id] = action.payload
                        draft.posts[`p-${postId}`].comments[parentId].reply_count = draft.posts[`p-${postId}`].comments[parentId].reply_count + 1
                    }
                    break
                case RATE_POST:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].rated_by[action.payload.user_id] = action.payload
                        draft.posts[`p-${postId}`].avg_rate = ((draft.posts[`p-${postId}`].avg_rate * draft.posts[`p-${postId}`].rate_count + rate) / (draft.posts[`p-${postId}`].rate_count + 1))
                        draft.posts[`p-${postId}`].rate_count = draft.posts[`p-${postId}`].rate_count + 1
                    }
                    break
                case RATE_POST_UPDATE:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].avg_rate = ((draft.posts[`p-${postId}`].avg_rate * draft.posts[`p-${postId}`].rate_count) + rate - draft.posts[`p-${postId}`].rated_by[updateRateId].rate) / (draft.posts[`p-${postId}`].rate_count)
                        draft.posts[`p-${postId}`].rated_by[updateRateId].rate = rate
                    }
                    break
                case RATE_CHILD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[commentId].rated_by[action.payload.user_id] = action.payload   
                        draft.posts[`p-${postId}`].comments[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[commentId].avg_rate * draft.posts[`p-${postId}`].comments[commentId].rate_count + rate) / (draft.posts[`p-${postId}`].comments[commentId].rate_count + 1)
                        draft.posts[`p-${postId}`].comments[commentId].rate_count = draft.posts[`p-${postId}`].comments[commentId].rate_count + 1
                    }
                    break
                case RATE_COMMENT_UPDATE_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[commentId].avg_rate * draft.posts[`p-${postId}`].comments[commentId].rate_count - draft.posts[`p-${postId}`].comments[commentId].rated_by[updateRateId].rate + rate) / (draft.posts[`p-${postId}`].comments[commentId].rate_count)
                        draft.posts[`p-${postId}`].comments[commentId].rated_by[updateRateId].rate = rate
                    }
                    break
                case RATE_CHILD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[action.payload.user_id] = action.payload
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + rate) / (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1)
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count  = draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1
                    }
                    break
                case RATE_UPDATE_CHILD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count - draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[updateRateId].rate + rate) / (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count)
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[updateRateId].rate = rate
                    }
                    break
                default:
                    return draft
            }
        })
    )
}
