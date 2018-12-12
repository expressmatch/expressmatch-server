import { combineReducers } from 'redux';
import posts from './postsReducer';
import comments from './commentsReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
    posts,
    comments,
    profile
});

export default rootReducer;
