import axios from 'axios';

let getPreference = (() => {

    return () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/preference',
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

let savePreference = (() => {

    return (preference) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/preference',
                headers: {'Content-type': ' application/json'},
                data: {
                    currentCity: preference.currentCity,
                    caste: preference.caste,
                    motherTongue: preference.motherTongue
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

const PreferenceService = {
    getPreference,
    savePreference
};

export default PreferenceService;