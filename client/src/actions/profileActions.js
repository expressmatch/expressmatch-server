import * as types from '../constants/actionTypes';
import profileService from '../services/ProfileService';
import delay from '../services/delay';

/*-------- FETCH POSTS - START---------*/
export function getProfile(userId) {
    return (dispatch, getState ) => {
        dispatch(getProfileRequest());

        let getProfile = userId ? profileService.getOtherProfile(userId) : profileService.getCurrentProfile();

        getProfile.then(data => {
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

/*-------- UPLOAD PHOTO - START ---------*/
export function uploadPhoto(profile) {
    return (dispatch, getState ) => {
        dispatch(getUploadPhotoRequest());

        return profileService.uploadphoto(profile).then((data) => {
            setTimeout(() => {
                return dispatch(getUploadPhotoSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getUploadPhotoFailure(error));
        })
    };
}
export function getUploadPhotoRequest(){
    return { type: types.UPLOAD_PHOTO_REQUEST };
}
export function getUploadPhotoSuccess(user){
    return { type: types.UPLOAD_PHOTO_SUCCESS, user };
}
export function getUploadPhotoFailure(error){
    return { type: types.UPLOAD_PHOTO_FAILURE, error };
}
/*-------- UPLOAD PHOTO - END ---------*/