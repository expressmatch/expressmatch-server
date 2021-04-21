import * as types from '../constants/actionTypes';
import postsService from '../services/PostsService';
import delay from '../services/delay';

/*-------- FETCH POSTS - START---------*/
export function getPosts(filters, pageNumber) {
    return (dispatch, getState ) => {
        dispatch(getPostsRequest());

        return postsService.getPosts(filters, pageNumber).then(data => {
            setTimeout(() => {
                return dispatch(getPostsSuccess(data.hasNext, data.posts));
            }, delay);
        }).catch(error => {
            dispatch(getPostsFailure(error));
        })
    };
}
export function getPostsRequest(){
    return { type: types.GET_POSTS_REQUEST };
}
export function getPostsSuccess(hasNext, posts){
    return { type: types.GET_POSTS_SUCCESS, hasNext, posts };
}
export function getPostsFailure(error){
    return { type: types.GET_POSTS_FAILURE, error };
}
/*-------- FETCH POSTS - END ---------*/


/*-------- FETCH SINGLE POST - START---------*/
export function getPost(postId) {
    return (dispatch, getState ) => {
        dispatch(getPostRequest());

        return postsService.getPostById(postId).then(data => {
            setTimeout(() => {
                return dispatch(getPostSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getPostFailure(error));
        })
    };
}
export function getPostRequest(){
    return { type: types.GET_POST_REQUEST };
}
export function getPostSuccess(post){
    return { type: types.GET_POST_SUCCESS, post };
}
export function getPostFailure(error){
    return { type: types.GET_POST_FAILURE, error };
}
/*-------- FETCH SINGLE POST - END ---------*/

/*-------- SUBMIT POST - START ---------*/
export function createPost(post) {
    return (dispatch, getState ) => {
        dispatch(createPostRequest());

        return postsService.createPost(post).then(data => {
            setTimeout(() => {
                return dispatch(createPostSuccess(data));;
            }, delay);
        }).catch(error => {
            dispatch(createPostFailure(error));
        })
    };
}
export function createPostRequest(){
    return { type: types.CREATE_POST_REQUEST };
}
export function createPostSuccess(post){
    return { type: types.CREATE_POST_SUCCESS, post };
}
export function createPostFailure(error){
    return { type: types.CREATE_POST_FAILURE, error };
}
/*-------- SUBMIT POST - END ---------*/

/*-------- DELETE POST - START ---------*/
export function deletePost(postId) {
    return (dispatch, getState ) => {
        dispatch(deletePostRequest());

        return postsService.deletePost(postId).then(data => {
            setTimeout(() => {
                return dispatch(deletePostSuccess(postId));
            }, delay);
        }).catch(error => {
            dispatch(deletePostFailure(error));
        })
    };
}
export function deletePostRequest(){
    return { type: types.DELETE_POST_REQUEST };
}
export function deletePostSuccess(postId){
    return { type: types.DELETE_POST_SUCCESS, postId };
}
export function deletePostFailure(error){
    return { type: types.DELETE_POST_FAILURE, error };
}
/*-------- DELETE POST - END ---------*/

/*-------- LIKE POST - START ---------*/
export function likePost(postId) {
    return (dispatch, getState ) => {
        dispatch(likePostRequest());

        return postsService.likePost(postId).then(data => {
            setTimeout(() => {
                return dispatch(likePostSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(likePostFailure(error));
        })
    };
}
export function likePostRequest(){
    return { type: types.LIKE_POST_REQUEST };
}
export function likePostSuccess(post){
    return { type: types.LIKE_POST_SUCCESS, post };
}
export function likePostFailure(error){
    return { type: types.LIKE_POST_FAILURE, error };
}
/*-------- LIKE POST - END ---------*/

/*-------- SEND INTEREST - START ---------*/
export function sendInterest(postId) {
    return (dispatch, getState ) => {
        dispatch(sendInterestRequest());

        return postsService.sendInterest(postId).then(data => {
            setTimeout(() => {
                return dispatch(sendInterestSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(sendInterestFailure(error));
        })
    };
}
export function sendInterestRequest(){
    return { type: types.SEND_INTEREST_REQUEST };
}
export function sendInterestSuccess(post){
    return { type: types.SEND_INTEREST_SUCCESS, post };
}
export function sendInterestFailure(error){
    return { type: types.SEND_INTEREST_FAILURE, error };
}
/*-------- SEND INTEREST - END ---------*/

/*-------- GET POST LIKES - START ---------*/
export function getPostLikes(postId) {
    return (dispatch, getState ) => {
        dispatch(getPostLikesRequest());

        return postsService.getPostLikes(postId).then(data => {
            setTimeout(() => {
                return dispatch(getPostLikesSuccess(postId, data));
            }, delay);
        }).catch(error => {
            dispatch(getPostLikesFailure(error));
        })
    };
}
export function getPostLikesRequest(){
    return { type: types.GET_POST_LIKES_REQUEST };
}
export function getPostLikesSuccess(postId, likes){
    return { type: types.GET_POST_LIKES_SUCCESS, postId, likes };
}
export function getPostLikesFailure(error){
    return { type: types.GET_POST_LIKES_FAILURE, error };
}
/*-------- GET POST LIKES - END ---------*/

/*-------- GET POST INTERESTS - START ---------*/
export function getPostInterests(postId) {
    return (dispatch, getState ) => {
        dispatch(getPostInterestsRequest());

        return postsService.getPostInterests(postId).then(data => {
            setTimeout(() => {
                return dispatch(getPostInterestsSuccess(postId, data));
            }, delay);
        }).catch(error => {
            dispatch(getPostInterestsFailure(error));
        })
    };
}
export function getPostInterestsRequest(){
    return { type: types.GET_POST_INTERESTS_REQUEST };
}
export function getPostInterestsSuccess(postId, interests){
    return { type: types.GET_POST_INTERESTS_SUCCESS, postId, interests };
}
export function getPostInterestsFailure(error){
    return { type: types.GET_POST_INTERESTS_FAILURE, error };
}
/*-------- GET POST INTERESTS - END ---------*/

/*-------- REPORT SPAM - START ---------*/
export function reportSpam(postId) {
    return (dispatch, getState ) => {
        dispatch(reportSpamRequest());

        return postsService.reportSpam(postId).then(data => {
            setTimeout(() => {
                return dispatch(reportSpamSuccess(postId));
            }, delay);
        }).catch(error => {
            dispatch(reportSpamFailure(error));
        })
    };
}
export function reportSpamRequest(){
    return { type: types.REPORT_SPAM_REQUEST };
}
export function reportSpamSuccess(postId){
    return { type: types.REPORT_SPAM_SUCCESS, postId };
}
export function reportSpamFailure(error){
    return { type: types.REPORT_SPAM_FAILURE, error };
}
/*-------- REPORT SPAM - END ---------*/

export function uiDateFilter(date){
    return { type: types.UI_DATE_FILTER, date };
}
export function uiQuickFilter(filter){
    return { type: types.UI_QUICK_FILTER, filter };
}
export function clearQuickFilter(){
    return { type: types.CLEAR_QUICK_FILTER }
}
export function updatePageNumber(pageNumber){
    return { type: types.UI_PAGE_NUMBER, pageNumber }
}