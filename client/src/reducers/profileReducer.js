import initialState from './initialState';
import * as types from '../constants/actionTypes';

const profileReducer = (state = initialState.profile, action) => {
    if( action.type === types.GET_PROFILE_REQUEST) {
        return {
            loading: true
        }
    } else if( action.type === types.UPDATE_PROFILE_REQUEST) {
        return {
            loading: true
        }
    } else if( action.type === types.GET_PROFILE_SUCCESS) {
        return {
            ...action.profile,
            loading: false
        };
    } else if( action.type === types.UPDATE_PROFILE_SUCCESS) {
        return {
            ...action.profile,
            loading: false
        }
    } else if( action.type === types.GET_PROFILE_FAILURE) {
        return {
            ...state,
            loading: false
        }
    } else if( action.type === types.UPDATE_PROFILE_FAILURE) {
        return {
            ...state,
            loading: false
        }
    } else if (action.type === types.UPLOAD_PHOTO_REQUEST) {
        return {
            ...state,
            loading: true
        };
    } else if (action.type === types.UPLOAD_PHOTO_SUCCESS) {
        return {
            ...state,
            photo: action.user.profile.url + '?' + + new Date().getTime(),
            loading: false
        };
    } else if (action.type === types.UPLOAD_PHOTO_FAILURE) {
        return {
            ...state,
            loading: false
        };
    } else{
        return state;
    }
};

export default profileReducer;