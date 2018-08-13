import * as types from '../constants/actionTypes';
import postsService from '../services/PostsService';

/*-------- FETCH POSTS - START---------*/
export function getPosts() {
    return (dispatch, getState ) => {
        dispatch(getPostsRequest());

        postsService.getPosts().then(data => {
            dispatch(getPostsSuccess(data));
        }).catch( error => {
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
export function submitPost(req) {
    return (dispatch, getState, service ) => {
        service.submitPost(req).then(data => {
            dispatch(submitPostSuccess(data));
        }).catch( error => {
            dispatch(submitPostFailure(error));
        })
    };
}
export function submitPostSuccess(data){
    return { type: types.SUBMIT_POST_SUCCESS, data};
}
export function submitPostFailure(error){
    return { type: types.SUBMIT_POST_FAILURE, error };
}
/*-------- SUBMIT POST - END ---------*/

