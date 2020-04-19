import axios from 'axios';

let contactUs = (() => {

    return (data) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/contactus',
                headers: {'Content-type': 'multipart/form-data'},
                data: data
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

const ContactService = {
    contactUs
};

export default ContactService;