import {
    GET_POSTS, 
    DELETE_POST, 
    ADD_POST, 
    RATE_POST,
    ADD_COMMENT_SUCCESS, 
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL, 
    ADD_COMMENT_FAIL, 
    RATE_POST_UPDATE, 
    RATE_POST_FAIL, 
    RATE_POST_UPDATE_FAIL, 
    REPLY_COMMENT_SUCCESS, 
    REPLY_COMMENT_FAIL, 
    ADDING_POST, 
    RATE_COMMENT_SUCCESS, 
    RATE_COMMENT_FAIL,
    RATE_CHILD_COMMENT_SUCCESS, 
    RATE_COMMENT_UPDATE_SUCCESS, 
    GET_POSTS_BY_CATEGORY,
    RATE_UPDATE_CHILD_COMMENT_FAIL,
    RATE_UPDATE_CHILD_COMMENT_SUCCESS, 
    GETTING_POSTS,
    INCREMENT_PAGE,
    LOGOUT_SUCCESS,
    GET_POST_DETAIL,
    FETCHING_NEW_CATEGORY,
    AFTER_ADDED_COMMENT,
    GET_MORE_POSTS_SUCCESS,
    GET_MORE_POSTS_BY_CATEGORY_SUCCESS,
    GET_COMMENTS_FOR_POST_SUCCESS,
    GET_COMMENTS_FOR_POST_FETCHING,
    MUTE_OR_UNMUTE,
    ADD_POST_FAIL} from '../constants/index'

import { produce, enableES5 } from 'immer'

const initialState = {
    posts: {},
    postsByCategory: {},
    addingPost: false,
    page: 2,
    next: '',
    count: 0,
    fetching: false,
    addedComment: false,
    muted: false,
    postUploadError: false
}

const compareKeys = (objA, objB) => {
    var keysA = Object.keys(objA)
    var keysB = Object.keys(objB.results)

    if (keysA.length !== keysB.length) {
        return false
    }

    for (var i = 0; i < keysA.length; i++) {
        if (!(objB.results.hasOwnProperty(keysA[i])) || objA[keysA[i]] !== objB.results[keysA[i]]) {
            return false
        }
    }
    return true
}

export function posts(state = initialState, action){
    enableES5()
    return (        
        produce(state, draft => {
            const postId = action.postId
            const commentId = action.commentId
            const parentId = action.parentId
            const rate = action.Rate
            const userId = action.userId
            switch (action.type) {
                case LOGOUT_SUCCESS:
                    draft.posts = {}
                    draft.postsByCategory = {}
                    break
                case GETTING_POSTS:
                    draft.fetching = true
                    break
                case INCREMENT_PAGE:
                    draft.page = draft.page + 1
                    break
                case GET_POSTS:
                    /* if (compareKeys(draft.posts, action.payload)){
                        draft.fetching = false
                        return draft
                    } */
                    if (action.payload){
                        draft.posts = {}
                        let counter = 1
                        let addObj = { 'isAdd': true, 'id': Math.floor(100000 + Math.random() * 900000)}
                        Object.values(action.payload.results).map(post => {       
                            counter++                     
                            if (counter % 5 === 0) {
                                draft.posts[`ad-${addObj.id}`] = addObj
                                addObj = { 'isAdd': true, 'id': Math.floor(100000 + Math.random() * 900000)}
                            }
                            draft.posts[`p-${post.id}`] = post
                            //draft.posts = {...draft.posts, [`p-${post.id}`]: post}
                        })
                        draft.next = action.payload.next
                        draft.count = action.payload.count
                        draft.fetching = false
                    }
                    break
                case GET_MORE_POSTS_SUCCESS:
                    if (action.payload){
                        Object.values(action.payload.results).map(post => {
                            draft.posts[`p-${post.id}`] = post
                        })
                        draft.next = action.payload.next
                        draft.count = action.payload.count
                        draft.fetching = false
                    }
                    break
                case FETCHING_NEW_CATEGORY:
                    if (draft.postsByCategory){
                        /* Object.keys(draft.postsByCategory).map(key => {
                            delete draft.postsByCategory[key]
                        }) */
                        draft.postsByCategory = {}
                    }
                    draft.page = 1
                    break
                case GET_POSTS_BY_CATEGORY:
                    if (action.payload){
                        draft.postsByCategory = {}
                        let counter = 1
                        let addObj = { 'isAdd': true, 'id': Math.floor(100000 + Math.random() * 900000)}
                        Object.values(action.payload.results).map(post => {
                            counter++                     
                            if (counter % 5 === 0) {
                                draft.postsByCategory[`ad-${addObj.id}`] = addObj
                                addObj = { 'isAdd': true, 'id': Math.floor(100000 + Math.random() * 900000)}
                            }
                            draft.postsByCategory[`p-${post.id}`] = post
                            /* if (!draft.posts[`p-${post.id}`])
                                draft.posts[`p-${post.id}`] = post */
                        })
                        draft.fetching = false
                        draft.next = action.payload.next
                        draft.count = action.payload.count
                    }
                    break
                case GET_MORE_POSTS_BY_CATEGORY_SUCCESS:
                    if (action.payload){
                        Object.values(action.payload.results).map(post => {
                            draft.postsByCategory[`p-${post.id}`] = post
                        })
                        draft.fetching = false
                        draft.next = action.payload.next
                        draft.count = action.payload.count
                    }
                    break
                case DELETE_POST:
                    if (draft.posts[`p-${postId}`]){
                        delete draft.posts[`p-${postId}`]
                    }
                    break
                case ADDING_POST:
                    draft.addingPost = true
                    draft.postUploadError = false
                    break
                case ADD_POST:
                    var newPost = {[`p-${action.payload.id}`]: action.payload}
                    draft.posts = {...newPost, ...draft.posts}
                    draft.addingPost = false
                    break
                case ADD_POST_FAIL:
                    draft.postUploadError = true
                    draft.addingPost = false
                    break
                case ADD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[action.payload.id] = action.payload
                        draft.addedComment = true
                    }
                    break
                case AFTER_ADDED_COMMENT:
                    draft.addedComment = false
                    break
                case DELETE_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        delete draft.posts[`p-${postId}`].comments[commentId]
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        delete draft.postsByCategory[`p-${postId}`].comments[commentId]
                    }
                    break
                case REPLY_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[action.payload.id] = action.payload
                        draft.posts[`p-${postId}`].comments[parentId].reply_count = draft.posts[`p-${postId}`].comments[parentId].reply_count + 1
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[action.payload.id] = action.payload
                        draft.postsByCategory[`p-${postId}`].comments[parentId].reply_count = draft.postsByCategory[`p-${postId}`].comments[parentId].reply_count + 1
                    }
                    break
                case RATE_POST:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].rated_by[action.payload.user_id] = action.payload
                        draft.posts[`p-${postId}`].avg_rate = ((draft.posts[`p-${postId}`].avg_rate * draft.posts[`p-${postId}`].rate_count + rate) / (draft.posts[`p-${postId}`].rate_count + 1))
                        draft.posts[`p-${postId}`].rate_count = draft.posts[`p-${postId}`].rate_count + 1
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].rated_by[action.payload.user_id] = action.payload
                        draft.postsByCategory[`p-${postId}`].avg_rate = ((draft.postsByCategory[`p-${postId}`].avg_rate * draft.postsByCategory[`p-${postId}`].rate_count + rate) / (draft.postsByCategory[`p-${postId}`].rate_count + 1))
                        draft.postsByCategory[`p-${postId}`].rate_count = draft.postsByCategory[`p-${postId}`].rate_count + 1
                    }
                    break
                case RATE_POST_UPDATE:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].avg_rate = ((draft.posts[`p-${postId}`].avg_rate * draft.posts[`p-${postId}`].rate_count) + rate - draft.posts[`p-${postId}`].rated_by[userId].rate) / (draft.posts[`p-${postId}`].rate_count)
                        draft.posts[`p-${postId}`].rated_by[userId].rate = rate
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].avg_rate = ((draft.postsByCategory[`p-${postId}`].avg_rate * draft.postsByCategory[`p-${postId}`].rate_count) + rate - draft.postsByCategory[`p-${postId}`].rated_by[userId].rate) / (draft.postsByCategory[`p-${postId}`].rate_count)
                        draft.postsByCategory[`p-${postId}`].rated_by[userId].rate = rate
                    }
                    break
                case RATE_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[commentId].rated_by[action.payload.user_id] = action.payload
                        draft.posts[`p-${postId}`].comments[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[commentId].avg_rate * draft.posts[`p-${postId}`].comments[commentId].rate_count + rate) / (draft.posts[`p-${postId}`].comments[commentId].rate_count + 1)
                        draft.posts[`p-${postId}`].comments[commentId].rate_count = draft.posts[`p-${postId}`].comments[commentId].rate_count + 1
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].comments[commentId].rated_by[action.payload.user_id] = action.payload
                        draft.postsByCategory[`p-${postId}`].comments[commentId].avg_rate = (draft.postsByCategory[`p-${postId}`].comments[commentId].avg_rate * draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count + rate) / (draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count + 1)
                        draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count = draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count + 1
                    }
                    break
                case RATE_COMMENT_UPDATE_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[commentId].avg_rate * draft.posts[`p-${postId}`].comments[commentId].rate_count - draft.posts[`p-${postId}`].comments[commentId].rated_by[userId].rate + rate) / (draft.posts[`p-${postId}`].comments[commentId].rate_count)
                        draft.posts[`p-${postId}`].comments[commentId].rated_by[userId].rate = rate
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].comments[commentId].avg_rate = (draft.postsByCategory[`p-${postId}`].comments[commentId].avg_rate * draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count - draft.postsByCategory[`p-${postId}`].comments[commentId].rated_by[userId].rate + rate) / (draft.postsByCategory[`p-${postId}`].comments[commentId].rate_count)
                        draft.postsByCategory[`p-${postId}`].comments[commentId].rated_by[userId].rate = rate
                    }
                    break
                case RATE_CHILD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[action.payload.user_id] = action.payload
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + rate) / (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1)
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count  = draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rated_by[action.payload.user_id] = action.payload
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count + rate) / (draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1)
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count  = draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count + 1
                    }
                    break
                case RATE_UPDATE_CHILD_COMMENT_SUCCESS:
                    if (draft.posts[`p-${postId}`]){
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count - draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate + rate) / (draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rate_count)
                        draft.posts[`p-${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate = rate
                    }
                    if (draft.postsByCategory[`p-${postId}`]){
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].avg_rate = (draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].avg_rate * draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count - draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate + rate) / (draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rate_count)
                        draft.postsByCategory[`p-${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate = rate
                    }
                    break
                case MUTE_OR_UNMUTE:
                    draft.muted = !draft.muted
                    break
                case ADD_COMMENT_FAIL:
                case DELETE_COMMENT_FAIL:
                case RATE_POST_FAIL:
                case RATE_POST_UPDATE_FAIL:
                case REPLY_COMMENT_FAIL:
                case RATE_COMMENT_FAIL:
                case RATE_UPDATE_CHILD_COMMENT_FAIL:
                    return draft
                default:
                    return draft
            }
        }))
    }


export function postDetail(state = {}, action){
    enableES5()
    return (
        produce(state, draft => {
            const postId = action.postId
            const commentId = action.commentId
            const parentId = action.parentId
            const rate = action.Rate
            const userId = action.userId
            switch (action.type){
                case GET_POST_DETAIL:
                    if (draft) Object.keys(draft).map(key => {
                        delete draft[key]
                    })
                    draft[action.payload.id] = action.payload
                    break
                case GET_COMMENTS_FOR_POST_FETCHING:
                    draft.fetching = true
                    break
                case GET_COMMENTS_FOR_POST_SUCCESS: //make this compare keys and only add new comments!
                    if (draft[postId]){
                        draft.fetching = false
                        Object.values(action.payload).map(comment => {
                            if (!draft[postId].comments[comment.id]) draft[postId].comments[comment.id] = comment
                        })
                    }
                    break
                case ADD_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        draft[postId].comments[action.payload.id] = action.payload
                    }
                    break
                case DELETE_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        delete draft[`${postId}`].comments[commentId]
                    }
                    break
                case REPLY_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        draft[`${postId}`].comments[parentId].replies[action.payload.id] = action.payload
                        draft[`${postId}`].comments[parentId].reply_count = draft[`${postId}`].comments[parentId].reply_count + 1
                    }
                    break
                case RATE_POST:
                    if (draft[postId]){   
                        draft[`${postId}`].rated_by[action.payload.user_id] = action.payload
                        draft[`${postId}`].avg_rate = ((draft[`${postId}`].avg_rate * draft[`${postId}`].rate_count + rate) / (draft[`${postId}`].rate_count + 1))
                        draft[`${postId}`].rate_count = draft[`${postId}`].rate_count + 1
                    }
                    break
                case RATE_POST_UPDATE:
                    if (draft[postId]){   
                        draft[`${postId}`].avg_rate = ((draft[`${postId}`].avg_rate * draft[`${postId}`].rate_count) + rate - draft[`${postId}`].rated_by[userId].rate) / (draft[`${postId}`].rate_count)
                        draft[`${postId}`].rated_by[userId].rate = rate
                    }
                    break
                case RATE_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        draft[`${postId}`].comments[commentId].rated_by[action.payload.user_id] = action.payload   
                        draft[`${postId}`].comments[commentId].avg_rate = (draft[`${postId}`].comments[commentId].avg_rate * draft[`${postId}`].comments[commentId].rate_count + rate) / (draft[`${postId}`].comments[commentId].rate_count + 1)
                        draft[`${postId}`].comments[commentId].rate_count = draft[`${postId}`].comments[commentId].rate_count + 1
                    }
                    break
                case RATE_COMMENT_UPDATE_SUCCESS:
                    if (draft[postId]){   
                        draft[`${postId}`].comments[commentId].avg_rate = (draft[`${postId}`].comments[commentId].avg_rate * draft[`${postId}`].comments[commentId].rate_count - draft[`${postId}`].comments[commentId].rated_by[userId].rate + rate) / (draft[`${postId}`].comments[commentId].rate_count)
                        draft[`${postId}`].comments[commentId].rated_by[userId].rate = rate
                    }
                    break
                case RATE_CHILD_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        draft[`${postId}`].comments[parentId].replies[commentId].rated_by[action.payload.user_id] = action.payload
                        draft[`${postId}`].comments[parentId].replies[commentId].avg_rate = (draft[`${postId}`].comments[parentId].replies[commentId].avg_rate * draft[`${postId}`].comments[parentId].replies[commentId].rate_count + rate) / (draft[`${postId}`].comments[parentId].replies[commentId].rate_count + 1)
                        draft[`${postId}`].comments[parentId].replies[commentId].rate_count  = draft[`${postId}`].comments[parentId].replies[commentId].rate_count + 1
                    }
                    break
                case RATE_UPDATE_CHILD_COMMENT_SUCCESS:
                    if (draft[postId]){   
                        draft[`${postId}`].comments[parentId].replies[commentId].avg_rate = (draft[`${postId}`].comments[parentId].replies[commentId].avg_rate * draft[`${postId}`].comments[parentId].replies[commentId].rate_count - draft[`${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate + rate) / (draft[`${postId}`].comments[parentId].replies[commentId].rate_count)
                        draft[`${postId}`].comments[parentId].replies[commentId].rated_by[userId].rate = rate
                    }
                    break
                default:
                    return draft
            }
        })
    )
}

