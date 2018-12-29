import * as types from '../constants/actionTypes';
import postsService from '../services/PostsService';
import delay from '../services/delay';

/*-------- FETCH POSTS - START---------*/
export function getPosts(filters) {
    return (dispatch, getState ) => {
        dispatch(getPostsRequest());

        return postsService.getPosts(filters).then(data => {
            setTimeout(() => {
                return dispatch(getPostsSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getPostsFailure(error));
        })
    };
}
export function getPostsRequest(){
    return { type: types.GET_POSTS_REQUEST };
}
export function getPostsSuccess(posts){
    return { type: types.GET_POSTS_SUCCESS, posts };
}
export function getPostsFailure(error){
    return { type: types.GET_POSTS_FAILURE, error };
}
/*-------- FETCH POSTS - END ---------*/

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
/*-------- LIKE POST - END ---------*/

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

export function uiDateFilter(date){
    return { type: types.UI_DATE_FILTER, date };
}
export function uiQuickFilter(filter){
    return { type: types.UI_QUICK_FILTER, filter };
}