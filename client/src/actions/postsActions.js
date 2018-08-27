import * as types from '../constants/actionTypes';
import postsService from '../services/PostsService';

/*-------- FETCH POSTS - START---------*/
export function getPosts() {
    return (dispatch, getState ) => {
        dispatch(getPostsRequest());

        return postsService.getPosts().then(data => {
            dispatch(getPostsSuccess(data));
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
            dispatch(createPostSuccess(data));
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


/*-------- LIKE POST - START ---------*/
export function likePost(postId) {
    return (dispatch, getState ) => {
        dispatch(likePostRequest());

        return postsService.likePost(postId).then(data => {
            dispatch(likePostSuccess(data));
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
