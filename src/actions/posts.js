import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN' 

import { 
        GET_POSTS,
        GET_POSTS_BY_CATEGORY,
        DELETE_POST, 
        ADD_POST,
        ADD_POST_FAIL,
        ADDING_POST,
        CHANGE_CATEGORY, 
        GET_POST_DETAIL, 
        RATE_POST, 
        RATE_POST_FAIL,
        RATE_POST_UPDATE,
        RATE_POST_UPDATE_FAIL,
        GET_COMMENTS_SUCCESS,
        GET_COMMENTS_FAIL, 
        GET_MORE_POSTS_BY_CATEGORY_SUCCESS,
        GET_MORE_POSTS_BY_CATEGORY_FAIL,
        ADD_COMMENT_SUCCESS,
        AFTER_ADDED_COMMENT, 
        ADD_COMMENT_FAIL, 
        DELETE_COMMENT_SUCCESS, 
        DELETE_COMMENT_FAIL,
        REPLY_COMMENT_SUCCESS,
        REPLY_COMMENT_FAIL,
        RATE_COMMENT_SUCCESS,
        RATE_COMMENT_FAIL,
        RATE_COMMENT_UPDATE_SUCCESS,
        RATE_COMMENT_UPDATE_FAIL,
        RATE_CHILD_COMMENT_SUCCESS, 
        RATE_CHILD_COMMENT_FAIL,
        RATE_UPDATE_CHILD_COMMENT_SUCCESS,
        RATE_UPDATE_CHILD_COMMENT_FAIL,
        GETTING_POSTS,
        FETCH_URL,
        FETCHING_POST,
        INCREMENT_PAGE,
        FETCHING_NEW_CATEGORY,
        UPLOADING_COMMENT,
        REPLY_TO_REPLY_SUCCESS,
        REPLY_TO_REPLY_FAIL,
        GET_MORE_POSTS_SUCCESS,
        GET_MORE_POSTS_FAIL,
        GET_COMMENTS_FOR_POST_FETCHING,
        GET_COMMENTS_FOR_POST_SUCCESS,
        GET_COMMENTS_FOR_POST_FAIL,
        REPORT_POST_SUCCESS,
        REPORT_POST_FAIL,
        MUTE_OR_UNMUTE} from '../constants/index'

        
//GET POSTS
export const getPosts = (page, pageSize) => (dispatch) => {

    dispatch({type: GETTING_POSTS})
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/?page=${page}&page_size=${pageSize}`, config)
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

//GET MORE POSTS WHEN END REACHED HOME SCREEN
export const getMorePosts = (page, pageSize) => (dispatch) => {

    dispatch({type: GETTING_POSTS})
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/?page=${page}&page_size=${pageSize}`, config)
        .then(res => {
            dispatch({
                type: GET_MORE_POSTS_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: GET_MORE_POSTS_FAIL
            })    
        })
}

//GET POST DETAIL
export const getPostDetail = (postId) => dispatch => {
    dispatch({ type: FETCHING_POST })
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/p/detail/${postId}`, config)
        .then(res => {
            dispatch({
                type: GET_POST_DETAIL,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

//GET POSTS BY CATEGORY 
export const getPostsByCategory = (category, page, pageSize) => (dispatch) => {

    dispatch({type: GETTING_POSTS})
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/?category=${category}&page=${page}&page_size=${pageSize}`, config)
        .then(res => {
            dispatch({
                type: GET_POSTS_BY_CATEGORY,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const changeCategory = (category) => (dispatch) => {
    
    dispatch({
        type:CHANGE_CATEGORY,
        payload: category
    })
    
}

//GET MORE POSTS WHEN END REACHED CATEGORY SCREEN
export const getMorePostsCategory = (category, page, pageSize) => (dispatch) => {

    dispatch({type: GETTING_POSTS})
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/?category=${category}&page=${page}&page_size=${pageSize}`, config)
        .then(res => {
            dispatch({
                type: GET_MORE_POSTS_BY_CATEGORY_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: GET_MORE_POSTS_BY_CATEGORY_FAIL
            })
        })
}

//DELETE POSTS
export const deletePosts = (postSlug, postId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
    
        axios.delete(`${FETCH_URL}/api/v1/p/delete/${postSlug}`, config)
            .then(res => {
                dispatch({
                    type: DELETE_POST,
                    payload: res.data,
                    postId
                })
            }).catch(err => console.log(err))

}

//ADD POST
export const addPost = (formData, userId) => (dispatch) => {

    dispatch({ type: ADDING_POST })

        
        const config = {
            headers: 
            {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
            },
            withCredentials: true
        }
    
        axios.post(`${FETCH_URL}/api/v1/p/create/`, formData, config)
            .then(res => {
                dispatch({
                    type: ADD_POST,
                    userId,
                    payload: res.data
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: ADD_POST_FAIL
                })
            })
    
}

//RATE POST
export const ratePost = (rate, postId, userId) => dispatch => {

        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
    
        const Rate = parseFloat(rate, 10)
        
        const body = JSON.stringify({ rate:Rate, post:postId })
    
        axios.post(`${FETCH_URL}/api/v1/p/rate/${postId}`, body, config)
            .then(res => {
                dispatch({
                    type: RATE_POST,
                    Rate,
                    postId,
                    userId,
                    payload: res.data
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_POST_FAIL
                })
            })
}

//UPDATE THE RATE
export const rateUpdate = (rate, postId, userId) => dispatch => {
        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
    
        const Rate = parseFloat(rate, 10)
        
        const body = JSON.stringify({ rate:Rate, post:postId })
    
        axios.put(`${FETCH_URL}/api/v1/p/rate/update/${postId}`, body, config)
            .then(() => {
                dispatch({
                    type: RATE_POST_UPDATE,
                    Rate,
                    postId,
                    userId,
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_POST_UPDATE_FAIL
                })
            })
}

//GET COMMENTS
export const getComments = () => dispatch => {
    const config = {
        withCredentials: true
    }

    axios.get(`${FETCH_URL}/api/v1/comments`, config)
        .then(res => {
            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
                console.log(err)
                dispatch({
                    type: GET_COMMENTS_FAIL
                })
        })
}

//REPORT POST
export const reportPost = (postId, reportText) => dispatch => {
    const config = {
        withCredentials: true
    }

    const body = JSON.stringify({ report: reportText })

    axios.post(`${FETCH_URL}/api/v1/p/report/${postId}`, body, config)
    .then(() => {
        dispatch({
            type: REPORT_POST_SUCCESS
        })
    }).catch(err => {
        console.log(err)
        dispatch({
            type: REPORT_POST_FAIL
        })
    })
}


//GET COMMENTS FOR SPECIFIC POST
export const getCommentsForPost = (postId) => dispatch => {
    const config = {
        withCredentials: true
    }

    dispatch({ type: GET_COMMENTS_FOR_POST_FETCHING })

    axios.get(`${FETCH_URL}/api/v1/comments/p/${postId}`, config)
        .then(res => {
            dispatch({
                type: GET_COMMENTS_FOR_POST_SUCCESS,
                payload: res.data,
                postId
            })
        }).catch(err => {
                console.log(err)
                dispatch({
                    type: GET_COMMENTS_FOR_POST_FAIL
                })
        })
}


//ADD COMMENT
export const addComment = (text, postId) => dispatch => {

    console.log("typeof post id: ", typeof postId)

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }

        const body = JSON.stringify({ content:text })

        dispatch({ type: UPLOADING_COMMENT })
    
        axios.post(`${FETCH_URL}/api/v1/comments/create/${postId}`, body, config)
            .then(res => {
                dispatch({
                    type: ADD_COMMENT_SUCCESS,
                    payload: res.data,
                    postId
                })
                dispatch({ type: AFTER_ADDED_COMMENT })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: ADD_COMMENT_FAIL,
                })
            })

}

//REPLY TO A COMMENT
export const replyComment = (text, parentId, postId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const body = JSON.stringify({ content:text })
    
        axios.post(`${FETCH_URL}/api/v1/comments/${parentId}/reply`, body, config)
            .then(res => {
                dispatch({
                    type: REPLY_COMMENT_SUCCESS,
                    payload: res.data,
                    postId,
                    parentId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: REPLY_COMMENT_FAIL,
                })
            })
}

//REPLY TO REPLY
export const replyToReply = (text, parentId, postId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const body = JSON.stringify({ content:text })
    
        axios.post(`${FETCH_URL}/api/v1/comments/${parentId}/reply`, body, config)
            .then(res => {
                dispatch({
                    type: REPLY_TO_REPLY_SUCCESS,
                    payload: res.data,
                    postId,
                    parentId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: REPLY_TO_REPLY_FAIL,
                })
            })
}

//DELETE COMMENT
export const deleteComment = (commentId) => dispatch => {
        
        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        axios.delete(`${FETCH_URL}/api/v1/comments/delete/${commentId}`, config)
            .then(res => {
                dispatch({
                    type: DELETE_COMMENT_SUCCESS,
                    payload: res.data,
                    commentId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: DELETE_COMMENT_FAIL,
                })
            })
}

//RATE COMMENT
export const rateComment = (rate, commentId, postId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const Rate = parseFloat(rate, 10)
    
        const body = JSON.stringify({ comment: commentId, rate: Rate })
    
        axios.post(`${FETCH_URL}/api/v1/comments/${commentId}/rate`, body, config)
            .then(res => {
                dispatch({
                    type: RATE_COMMENT_SUCCESS,
                    payload: res.data,
                    Rate,
                    commentId,
                    postId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_COMMENT_FAIL,
                })
            })
}

//RATE COMMENT UPDATE
export const rateCommentUpdate = (rate, commentId, postId, userId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const Rate = parseFloat(rate, 10)
    
        const body = JSON.stringify({ comment: commentId, rate: Rate })
    
        axios.put(`${FETCH_URL}/api/v1/comments/${commentId}/rate/update`, body, config)
            .then(res => {
                dispatch({
                    type: RATE_COMMENT_UPDATE_SUCCESS,
                    payload: res.data,
                    Rate,
                    commentId,
                    postId,
                    userId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_COMMENT_UPDATE_FAIL,
                })
            })
}

//RATE CHILD COMMENT
export const rateChildComment = (rate, parentId, commentId, postId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const Rate = parseFloat(rate, 10)
    
        const body = JSON.stringify({ comment: commentId, rate: Rate })
    
        axios.post(`${FETCH_URL}/api/v1/comments/${commentId}/rate`, body, config)
            .then(res => {
                dispatch({
                    type: RATE_CHILD_COMMENT_SUCCESS,
                    payload: res.data,
                    Rate,
                    parentId,
                    commentId,
                    postId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_CHILD_COMMENT_FAIL,
                })
            })
}

//UPDATE RATE CHILD COMMENT
export const rateUpdateChildComment = (rate, parentId, commentId, postId, userId) => dispatch => {

        const config = {
            headers: 
            {
                'Content-type': 'application/json',
            },
            withCredentials: true
        }
        
        const Rate = parseFloat(rate, 10)
    
        const body = JSON.stringify({ comment: commentId, rate: Rate })
    
        axios.post(`${FETCH_URL}/api/v1/comments/${commentId}/rate/update`, body, config)
            .then(res => {
                dispatch({
                    type: RATE_UPDATE_CHILD_COMMENT_SUCCESS,
                    payload: res.data,
                    Rate,
                    parentId,
                    commentId,
                    postId,
                    userId
                })
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: RATE_UPDATE_CHILD_COMMENT_FAIL,
                })
            })
}

export const incrementPage = () => dispatch => {
    dispatch({ type: INCREMENT_PAGE })
}

export const fetchingNewCategory = () => dispatch => {
    dispatch({ type: FETCHING_NEW_CATEGORY })
}

export const muteVideos = () => dispatch => {
    dispatch({ type: MUTE_OR_UNMUTE })
}