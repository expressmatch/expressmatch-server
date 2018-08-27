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
    }else{
        return state;
    }
};

export default postsReducer;