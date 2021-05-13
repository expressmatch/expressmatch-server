import { combineReducers } from 'redux';
import user from './userReducer';
import posts from './postsReducer';
import comments from './commentsReducer';
import profile from './profileReducer';
import preference from './preferenceReducer';

const rootReducer = combineReducers({
    user,
    posts,
    comments,
    profile,
    preference
});

export default rootReducer;
