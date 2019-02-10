import { combineReducers } from 'redux';
import user from './userReducer';
import posts from './postsReducer';
import comments from './commentsReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
    user,
    posts,
    comments,
    profile
});

export default rootReducer;
