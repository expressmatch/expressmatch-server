import postApi from '../api/postsApi';

const getPosts = () => {
    return new Promise((resolve, reject) => {
        resolve(postApi.getPosts());
    }, err => {
        reject(err);
    });
};

const PostsService = {
    getPosts
};

export default PostsService;