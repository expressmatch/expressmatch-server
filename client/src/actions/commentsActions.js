import * as types from '../constants/actionTypes';
import commentsService from '../services/CommentsService';
import delay from '../services/delay';

/*-------- GET COMMENTS - START ---------*/
export function getComments(postId, commentId) {
    return (dispatch, getState ) => {
        dispatch(getCommentsRequest());

        return commentsService.getComments(postId, commentId).then((data) => {
            setTimeout(() => {
                return dispatch(getCommentsSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getCommentsFailure(error));
        })
    };
}
export function getCommentsRequest(){
    return { type: types.GET_COMMENTS_REQUEST };
}
export function getCommentsSuccess(comments){
    return { type: types.GET_COMMENTS_SUCCESS, comments };
}
export function getCommentsFailure(error){
    return { type: types.GET_COMMENTS_FAILURE, error };
}
/*-------- GET COMMENTS - END ---------*/

/*-------- POST COMMENT - START ---------*/
export function postComment(postId, commentId, comment) {
    return (dispatch, getState ) => {
        dispatch(postCommentRequest());

        return commentsService.postComment(postId, commentId, comment).then(data => {
            setTimeout(() => {
                return dispatch(postCommentSuccess(postId, commentId, data));
            }, delay);
        }).catch(error => {
            dispatch(postCommentFailure(error));
        })
    };
}
export function postCommentRequest(){
    return { type: types.POST_COMMENT_REQUEST };
}
export function postCommentSuccess(postId, commentId, comment){
    return { type: types.POST_COMMENT_SUCCESS, postId, commentId, comment };
}
export function postCommentFailure(error){
    return { type: types.POST_COMMENT_FAILURE, error };
}
/*-------- POST COMMENT - END ---------*/

/*-------- LIKE COMMENT - START ---------*/
export function likeComment(commentId) {
    return (dispatch, getState ) => {
        dispatch(likeCommentRequest());

        return commentsService.likeComment(commentId).then(data => {
            setTimeout(() => {
                return dispatch(likeCommentSuccess(commentId, data));
            }, delay);
        }).catch(error => {
            dispatch(likeCommentFailure(error));
        })
    };
}
export function likeCommentRequest(){
    return { type: types.LIKE_COMMENT_REQUEST };
}
export function likeCommentSuccess(commentId, comment){
    return { type: types.LIKE_COMMENT_SUCCESS, commentId, comment };
}
export function likeCommentFailure(error){
    return { type: types.LIKE_COMMENT_FAILURE, error };
}
/*-------- LIKE COMMENT - END ---------*/
/*-------- GET POST LIKES - START ---------*/
export function getCommentLikes(commentId) {
    return (dispatch, getState ) => {
        dispatch(getCommentLikesRequest());

        return commentsService.getCommentLikes(commentId).then(data => {
            setTimeout(() => {
                return dispatch(getCommentLikesSuccess(commentId, data));
            }, delay);
        }).catch(error => {
            dispatch(getCommentLikesFailure(error));
        })
    };
}
export function getCommentLikesRequest(){
    return { type: types.GET_COMMENT_LIKES_REQUEST };
}
export function getCommentLikesSuccess(commentId, likes){
    return { type: types.GET_COMMENT_LIKES_SUCCESS, commentId, likes };
}
export function getCommentLikesFailure(error){
    return { type: types.GET_COMMENT_LIKES_FAILURE, error };
}
/*-------- GET POST LIKES - END ---------*/