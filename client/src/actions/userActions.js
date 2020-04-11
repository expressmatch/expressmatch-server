import * as types from '../constants/actionTypes';
import userService from '../services/UserService';
import delay from '../services/delay';

/*-------- GET USER - START ---------*/
export function getUser() {
    return (dispatch, getState ) => {
        dispatch(getUserRequest());

        return userService.getUser().then((data) => {
            setTimeout(() => {
                return dispatch(getUserSuccess(data));
            }, delay);
        }).catch(error => {
            dispatch(getUserFailure(error));
        })
    };
}
export function getUserRequest(){
    return { type: types.GET_USER_REQUEST };
}
export function getUserSuccess(user){
    return { type: types.GET_USER_SUCCESS, user };
}
export function getUserFailure(error){
    return { type: types.GET_USER_FAILURE, error };
}
/*-------- GET USER - START ---------*/