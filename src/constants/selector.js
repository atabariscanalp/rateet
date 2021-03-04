import { createSelector } from 'reselect'


const getAuthenticationSelector = state => state.auth

const getUsersInfoSelector = state => state.users

const getUserByIdSelector = (state, userId) => {
    if (state.users.usersLoaded)
        return state.users.usersById[userId]
    else
        return null
}

const getPostsSelector = state => state.posts

const getPostDetailSelector = (state, postId) => state.postDetail[postId]

const getPostDetailStateSelector = (state) => state.postDetail

const getPostByIdSelector = (state, postId) => {
    if (state.postDetail[postId]) return state.postDetail[postId]
    else if (state.posts.posts[`p-${postId}`]) return state.posts.posts[`p-${postId}`]
    else if (state.posts.postsByCategory[`p-${postId}`]) return state.posts.postsByCategory[`p-${postId}`]
    else return null
}

const getProfileSelector = state => state.profile

const getUISelector = state => state.ui

const getBlockedUsersSelector = state => state.blockedUsers


export const getAuthenticatedUser = createSelector(
    [getAuthenticationSelector],
    auth => auth.user
)

export const getAuthenticatedUserId = createSelector(
    [getAuthenticationSelector],
    auth => auth.user.pk
)

export const getLoginErrorInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.loginErrors
)

export const getRegisterErrorInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.registerErrors
)

export const getFetchingRegisterErrorInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.fetchingRegisterErrors
)

export const getRegisterSuccessInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.registerSuccess
)

export const getRegisterFailInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.registerFail
)


export const getIsAuthenticatedInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.isAuthenticated
)

export const getIsLoadingInfo = createSelector(
    [getAuthenticationSelector],
    auth => auth.isLoading
)

export const getUsersLoaded = createSelector(
    [getUsersInfoSelector],
    users => users.usersLoaded
)

export const getUsersByIdInfo = createSelector(
    [getUsersInfoSelector],
    users => users.usersById
)

export const getProfilePhoto = createSelector(
    [getUserByIdSelector],
    user => {
        if (user)
            return user.profile_photo
    }
)

export const getUserByIdInfo = createSelector(
    [getUserByIdSelector],
    user => {
        if (user)
            return user
    }
)

export const getPageInfo = createSelector(
    [getPostsSelector],
    posts => posts.page
)

export const getFetchingInfo = createSelector(
    [getPostsSelector],
    posts => posts.fetching
)

export const getNextPageUrlInfo = createSelector(
    [getPostsSelector],
    posts => posts.next
)

export const getPostsByCategoryInfo = createSelector(
    [getPostsSelector],
    posts => posts.postsByCategory
)

export const getPostsInfo = createSelector(
    [getPostsSelector],
    posts => Object.values(posts.posts)
)

export const getCommentUploadInfo = createSelector(
    [getPostsSelector],
    posts => posts.addedComment
)

export const getMutedInfo = createSelector(
    [getPostsSelector],
    posts => posts.muted
)

export const getPostDetailInfo = createSelector(
    [getPostDetailSelector],
    post => post
)

export const getPostImageInfo = createSelector(
    [getPostByIdSelector],
    post => {
        if (post !== null || post !== undefined) {
            console.log("POST: ", post)
            if (post.image) return { imageUri: post.image }
            else return { videoUri: post.video }
        }
        return null
    }
)

export const getCommentsFetchingInfo = createSelector(
    [getPostDetailStateSelector],
    state => {
        if (state.fetching !== null)
            return state.fetching
        return false
    }
)

export const getPostTitleInfo = createSelector(
    [getPostByIdSelector],
    post => {
        if (post)
            return post.title
        else return ""
    }
)

export const getPostCommentsByIdInfo = createSelector(
    [getPostByIdSelector],
    post => post.comments
)

export const getProfilePostCountInfo = createSelector(
    [getProfileSelector],
    profile => profile.postCount
)

export const getProfileAvgRateInfo = createSelector(
    [getProfileSelector],
    profile => profile.avgRate
)

export const getProfileUserInfo = createSelector(
    [getProfileSelector],
    profile => profile.user
)

export const getProfilePostsInfo = createSelector(
    [getProfileSelector],
    profile => profile.posts
)

export const getUserBlockedInfo = createSelector(
    [getProfileSelector],
    profile => profile.isBlocked
)

export const getPreferredLanguageInfo = createSelector(
    [getAuthenticationSelector],
    auth => {
        if (auth.user === null)
            return 'en'
        else
            return auth.user.language
    }
)

export const getIsDarkThemeInfo = createSelector(
    [getUISelector],
    ui => ui.isDark
)

export const getBlockedUsersInfo = createSelector(
    [getBlockedUsersSelector],
    blockedUsers => blockedUsers
)