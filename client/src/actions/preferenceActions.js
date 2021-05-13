import * as types from '../constants/actionTypes';
import preferenceService from '../services/PreferenceService';
import delay from '../services/delay';

/*-------- GET PREFERENCE - START ---------*/
export function getPreference() {
    return (dispatch, getState ) => {
        dispatch(getPreferenceRequest());

        return preferenceService.getPreference().then((data) => {
            setTimeout(() => {
                return dispatch(getPreferenceSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getPreferenceFailure(error));
        })
    };
}
export function getPreferenceRequest(){
    return { type: types.GET_PREFERENCE_REQUEST };
}
export function getPreferenceSuccess(preference){
    return { type: types.GET_PREFERENCE_SUCCESS, preference };
}
export function getPreferenceFailure(error){
    return { type: types.GET_PREFERENCE_FAILURE, error };
}
/*-------- GET PREFERENCE - END ---------*/

/*-------- SAVE PREFERENCE - START ---------*/
export function savePreference(preference) {
    return (dispatch, getState ) => {
        dispatch(savePreferenceRequest());

        return preferenceService.savePreference(preference).then((data) => {
            setTimeout(() => {
                return dispatch(savePreferenceSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(savePreferenceFailure(error));
        })
    };
}
export function savePreferenceRequest(){
    return { type: types.SAVE_PREFERENCE_REQUEST };
}
export function savePreferenceSuccess(preference){
    return { type: types.SAVE_PREFERENCE_SUCCESS, preference };
}
export function savePreferenceFailure(error){
    return { type: types.SAVE_PREFERENCE_FAILURE, error };
}
/*-------- SAVE PREFERENCE - END ---------*/