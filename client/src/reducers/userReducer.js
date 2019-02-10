import initialState from './initialState';
import * as types from '../constants/actionTypes';

const userReducer = (state = initialState.user, action) => {
    if( action.type === types.GET_USER_SUCCESS) {
        return {
            ...action.user
        };
    }else{
        return state;
    }
};

export default userReducer;