import initialState from './initialState';
import * as types from '../constants/actionTypes';

const userReducer = (state = initialState.user, action) => {
    if (action.type === types.GET_USER_SUCCESS) {
        return {
            ...action.user
        };
    } else if (action.type === types.UPLOAD_PHOTO_SUCCESS) {
        return {
            ...state,
            photo: action.user.profile.url + '?' + + new Date().getTime()
        };
    }else {
        return state;
    }
};

export default userReducer;