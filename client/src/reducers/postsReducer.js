import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {hashAndOrderItems} from "./reducerUtil";

const postsReducer = (state = initialState.posts, action) => {
    if( action.type === types.GET_POSTS_SUCCESS) {

        let posts = hashAndOrderItems(action.posts, '_id');

        return {
            ...state,
            entities: {
                ...state.entities,
                posts: {
                    byId: posts.byId,
                    allIds: posts.allIds
                }
            }
        };
    } else if ( action.type === types.LIKE_POST_SUCCESS) {
        return {
            ...state,
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
    } else if( action.type === types.UI_DATE_FILTER) {

        return {
            ...state,
            filters: {
                ...state.filters,
                date: action.date.toString()
            }
        };
    }else if( action.type === types.UI_QUICK_FILTER) {

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
    }else{
        return state;
    }
};

export default postsReducer;