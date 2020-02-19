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

let getPostById = (() => {

    const processResponse = (response) => {

        return response;
    };

    return (postId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/post/' + postId,
                headers: {'Content-type': 'application/json'}
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
                url: '/api/post/create',
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

let deletePost = (() => {

    return (postId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/api/post/${postId}/delete`,
                headers: {'Content-type': 'application/json'}
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let getPostLikes = (() => {

    return (postId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/post/${postId}/likes`,
                headers: {'Content-type': 'application/json'}
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
                url: `/api/post/${postId}/like`,
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

let reportSpam = (() => {

    return (postId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/api/post/${postId}/spam`,
                headers: {'Content-type': 'application/json'}
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
    getPostById,
    createPost,
    deletePost,
    getPostLikes,
    likePost,
    reportSpam
};

export default PostsService;