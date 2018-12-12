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

let likeComment = (() => {

    return (commentId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `/comment/${commentId}/like`,
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

const CommentsService = {
    getComments,
    postComment,
    likeComment
};

export default CommentsService;