import axios from 'axios';

let getPosts = (() => {

    const processResponse = (response) => {

        return response;
    };

    return (filters) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/posts',
                headers: {'Content-type': 'application/json'},
                data: {
                    filters
                }
            }).then(response => {
                resolve(processResponse(response.data));
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let createPost = (() => {

    return (post) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/post/create',
                headers: {'Content-type': 'application/json'},
                data: post
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
                headers: {'Content-type': 'application/json'},
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
    createPost,
    likePost
};

export default PostsService;