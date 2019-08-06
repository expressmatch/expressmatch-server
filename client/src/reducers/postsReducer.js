import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {hashAndOrderItems} from "./reducerUtil";

const postsReducer = (state = initialState.posts, action) => {
    if (action.type === types.GET_POSTS_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }
    else if (action.type === types.GET_POSTS_FAILURE) {
        return {
            ...state,
            loading: false
        };
    }
    if (action.type === types.GET_POSTS_SUCCESS) {

        let posts = hashAndOrderItems(action.posts, '_id');

        return {
            ...state,
            loading: false,
            entities: {
                ...state.entities,
                posts: {
                    byId: posts.byId,
                    allIds: posts.allIds
                }
            }
        };
    } else if (action.type === types.GET_POST_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }
    else if (action.type === types.GET_POST_FAILURE) {
        return {
            ...state,
            loading: false
        };
    }else if (action.type === types.GET_POST_SUCCESS) {
        return {
            ...state,
            loading: false,
            entities: {
                ...state.entities,
                posts: {
                    byId: {
                        [action.post._id]: action.post
                    },
                    allIds: [action.post._id]
                }
            }
        }
    } else if (action.type === types.LIKE_POST_REQUEST) {
        return {
            ...state,
            loading: true
        };
    } else if (action.type === types.LIKE_POST_FAILURE) {
        return {
            ...state,
            loading: false
        };
    } else if (action.type === types.LIKE_POST_SUCCESS) {
        return {
            ...state,
            loading: false,
            entities: {
                ...state.entities,
                posts: {
                    ...state.entities.posts,
                    byId: {
                        ...state.entities.posts.byId,
                        [action.post._id]: action.post
                    }
                }
            }
        }
    } else if (action.type === types.DELETE_POST_SUCCESS) {

        //FIXME: Deep Clone, use lodash
        let byId = {
            ...state.entities.posts.byId,
            [action.postId]: {
                ...state.entities.posts.byId[action.postId]
            }
        };
        delete byId[action.postId];

        let allIds = state.entities.posts.allIds.filter(id => {
            return id !== action.postId;
        });

        return {
            ...state,
            entities: {
                ...state.entities,
                posts: {
                    ...state.entities.posts,
                    byId: byId,
                    allIds: allIds
                }
            }
        }
    } else if (action.type === types.REPORT_SPAM_SUCCESS) {

        //FIXME: Deep Clone, use lodash
        let byId = {
            ...state.entities.posts.byId,
            [action.postId]: {
                ...state.entities.posts.byId[action.postId]
            }
        };
        delete byId[action.postId];

        let allIds = state.entities.posts.allIds.filter(id => {
            return id !== action.postId;
        });

        return {
            ...state,
            entities: {
                ...state.entities,
                posts: {
                    ...state.entities.posts,
                    byId: byId,
                    allIds: allIds
                }
            }
        }
    } else if (action.type === types.POST_COMMENT_SUCCESS) {

        if(!!action.commentId){
            return state;
        }else{
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: {
                        ...state.entities.posts,
                        byId: {
                            ...state.entities.posts.byId,
                            [action.postId]: {
                                ...state.entities.posts.byId[action.postId],
                                comments: [ ...state.entities.posts.byId[action.postId].comments, action.comment._id ]
                            }
                        }
                    }
                }
            }
        }
    } else if (action.type === types.GET_POST_LIKES_REQUEST) {
        return {
            ...state,
            //loading: true
        };
    } else if (action.type === types.GET_POST_LIKES_FAILURE) {
        return {
            ...state,
            //loading: false
        };
    } else if (action.type === types.GET_POST_LIKES_SUCCESS) {
        return {
            ...state,
            //loading: false,
            entities: {
                ...state.entities,
                posts: {
                    ...state.entities.posts,
                    byId: {
                        ...state.entities.posts.byId,
                        [action.postId]: {
                            ...state.entities.posts.byId[action.postId],
                            likedBy: action.likes
                        }
                    }
                }
            }
        }
    } else if (action.type === types.UI_DATE_FILTER) {

        return {
            ...state,
            filters: {
                ...state.filters,
                date: action.date.toString()
            }
        };
    } else if (action.type === types.UI_QUICK_FILTER) {

        return {
            ...state,
            filters: {
                ...state.filters,
                quick: {
                    ...state.filters.quick,
                    [action.filter]: !state.filters.quick[action.filter]
                }
            }
        };
    } else {
        return state;
    }
};

export default postsReducer;