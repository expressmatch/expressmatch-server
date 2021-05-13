import initialState from './initialState';
import * as types from '../constants/actionTypes';

const preferenceReducer = (state = initialState.preference, action) => {
    if (action.type === types.GET_PREFERENCE_SUCCESS) {
        return {
            ...action.preference
        };
    } else if (action.type === types.SAVE_PREFERENCE_SUCCESS) {
        return {
            ...action.preference
        };
    }else {
        return state;
    }
};

export default preferenceReducer;