import axios from 'axios';

let getComments = (() => {

    const processResponse = (response) => {

        return response;
    };

    return (postId, commentId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/comments',
                headers: {'Content-type': 'application/json'},
                data: {
                    postId,
                    commentId
                }
            }).then(response => {
                resolve(processResponse(response.data));
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let postComment = (() => {
    return (postId, commentId, comment) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/comment',
                headers: {'Content-type': 'application/json'},
                data: {
                    postId,
                    commentId,
                    comment
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let deleteComment = (() => {

    return (commentId, postId, parentCommentId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/api/comment/${commentId}/delete`,
                headers: {'Content-type': 'application/json'},
                data:{
                    postId,
                    parentCommentId
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

let likeComment = (() => {

    return (commentId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/api/comment/${commentId}/like`,
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
let getCommentLikes = (() => {

    return (commentId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/comment/${commentId}/likes`,
                headers: {'Content-type': 'application/json'}
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    };
})();

const CommentsService = {
    getComments,
    postComment,
    deleteComment,
    likeComment,
    getCommentLikes
};

export default CommentsService;