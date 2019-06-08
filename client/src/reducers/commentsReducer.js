import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {hashAndOrderItems} from "./reducerUtil";

const commentsReducer = (state = initialState.posts.entities.comments, action) => {
    if (action.type === types.GET_COMMENTS_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }
    else if (action.type === types.GET_COMMENTS_FAILURE) {
        return {
            ...state,
            loading: false
        };
    } else if (action.type === types.GET_COMMENTS_SUCCESS) {

        let comments = hashAndOrderItems(action.comments, '_id');


        Object.keys(comments.byId).forEach(commentId => {
            comments.byId[commentId].comments = comments.byId[commentId].comments.map(reply => {
                comments.byId[reply._id] = reply;
                comments.allIds.push(reply._id);

                return reply._id;
            });
        });

        return {
            byId: {
                ...state.byId,
                ...comments.byId
            },
            allIds: [...state.allIds, ...comments.allIds]
        };
    } else if (action.type === types.POST_COMMENT_REQUEST) {
        return {
            ...state,
            loading: true
        };
    } else if (action.type === types.POST_COMMENT_FAILURE) {
        return {
            ...state,
            loading: false
        };
    } else if (action.type === types.POST_COMMENT_SUCCESS) {
        // if (!!action.commentId) {
        //     return {
        //         byId: {
        //             ...state.byId,
        //             [action.commentId]: {
        //                 ...state.byId[action.commentId],
        //                 comments: [ ...state.byId[action.commentId].comments, action.comment ]
        //             }
        //         },
        //         allIds: [...state.allIds, action.comment._id]
        //     }
        // } else {
        if (!!action.commentId) {
            return {
                byId: {
                    ...state.byId,
                    [action.commentId]: {
                        ...state.byId[action.commentId],
                        comments: [ ...state.byId[action.commentId].comments, action.comment._id ]
                    },
                    [action.comment._id]: action.comment
                },
                allIds: [...state.allIds, action.comment._id],
                loading: false
            }
        } else {
            return {
                byId: {
                    ...state.byId,
                    [action.comment._id]: action.comment
                },
                allIds: [...state.allIds, action.comment._id],
                loading: false
            };
        }
        // }

    } else if (action.type === types.LIKE_COMMENT_REQUEST) {
        return {
            ...state,
            loading: true
        };
    } else if (action.type === types.LIKE_COMMENT_FAILURE) {
        return {
            ...state,
            loading: false
        };
    } else if (action.type === types.LIKE_COMMENT_SUCCESS) {
        return {
            ...state,
            byId: {
                ...state.byId,
                [action.commentId]: {
                    ...state.byId[action.commentId],
                    likes: action.comment.likes
                }
            },
            loading: false
        };
    } else {
        return state;
    }
};

export default commentsReducer;