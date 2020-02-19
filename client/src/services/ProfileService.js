import axios from 'axios';

let getCurrentProfile = (() => {

    return () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/userprofile',
                headers: {'Content-type': ' application/json'},
                data: {}
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let getOtherProfile = (() => {

    return (userId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/userprofile',
                headers: {'Content-type': ' application/json'},
                params: {
                    userId
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();


let updateProfile = (() => {

    return (profile) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/updateProfile',
                headers: {'Content-type': ' application/json'},
                data: {
                    profile
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

const ProfileService = {
    getCurrentProfile,
    getOtherProfile,
    updateProfile
};

export default ProfileService;