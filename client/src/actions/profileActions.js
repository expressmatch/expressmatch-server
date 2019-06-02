import * as types from '../constants/actionTypes';
import profileService from '../services/ProfileService';
import delay from '../services/delay';

/*-------- FETCH POSTS - START---------*/
export function getProfile() {
    return (dispatch, getState ) => {
        dispatch(getProfileRequest());

        profileService.getProfile().then(data => {
            setTimeout(() => {
                return dispatch(getProfileSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getProfileFailure(error));
        })
    };
}
export function getProfileRequest(){
    return { type: types.GET_PROFILE_REQUEST };
}
export function getProfileSuccess(profile){
    return { type: types.GET_PROFILE_SUCCESS, profile };
}
export function getProfileFailure(error){
    return { type: types.GET_PROFILE_FAILURE, error };
}
/*-------- FETCH POSTS - END ---------*/

/*-------- LIKE POST - START ---------*/
export function updateProfile(profile) {
    return (dispatch, getState ) => {
        dispatch(updateProfileRequest());

        return profileService.updateProfile(profile).then(data => {
            setTimeout(() => {
                dispatch(updateProfileSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(updateProfileFailure(error));
        })
    };
}
export function updateProfileRequest(){
    return { type: types.UPDATE_PROFILE_REQUEST };
}
export function updateProfileSuccess(profile){
    return { type: types.UPDATE_PROFILE_SUCCESS, profile };
}
export function updateProfileFailure(error){
    return { type: types.UPDATE_PROFILE_FAILURE, error };
}
/*-------- LIKE POST - END ---------*/
