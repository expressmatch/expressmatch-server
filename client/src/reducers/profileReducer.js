import initialState from './initialState';
import * as types from '../constants/actionTypes';

const profileReducer = (state = initialState.profile, action) => {
    if( action.type === types.GET_PROFILE_SUCCESS) {
        return {
            ...action.profile
        };
    }else{
        return state;
    }
};

export default profileReducer;