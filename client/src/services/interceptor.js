import axios from 'axios';

const axiosInterceptor = axios.interceptors.response.use((response) => {
    if(response.status === 200) {
        if (typeof response.data === "string"){
            alert("You will be re-directed to the index page");
            window.location.href = "/";
            //return Promise.reject(error.response.data.message);
        }
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        alert(error.response.data.message);
        return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error.response.data.message);
});

export default axiosInterceptor;