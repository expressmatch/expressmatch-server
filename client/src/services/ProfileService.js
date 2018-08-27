import axios from 'axios';

let getProfile = (() => {

    return () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/profile',
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

let updateProfile = (() => {

    return (profile) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/profile/${profile._id}`,
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
    getProfile,
    updateProfile
};

export default ProfileService;