import * as types from '../constants/actionTypes';
import postsService from '../services/PostsService';

/*-------- FETCH POSTS - START---------*/
export function getPosts() {
    return (dispatch, getState ) => {
        dispatch(getPostsRequest());

        postsService.getPosts().then(data => {
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
/*-------- SUBMIT POST - END ---------*/


/*-------- LIKE POST - START ---------*/
export function likePost(postId) {
    return (dispatch, getState ) => {
        dispatch(likePostRequest());

        postsService.likePost(postId).then(data => {
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
