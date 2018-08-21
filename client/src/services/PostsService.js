import postApi from '../api/postsApi';
import axios from 'axios';

let getPosts = (() => {
    // return () => {
    //     return new Promise((resolve, reject) => {
    //         resolve(postApi.getPosts());
    //     }, err => {
    //         reject(err);
    //     });
    // };

    return () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/posts',
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

let likePost = (() => {

    return (postId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/post/${postId}/like`,
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

const PostsService = {
    getPosts,
    likePost
};

export default PostsService;