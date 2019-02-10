import axios from 'axios';

let getUser = (() => {

    return () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/user',
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

const UserService = {
    getUser
};

export default UserService;