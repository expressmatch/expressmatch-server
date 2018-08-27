import { combineReducers } from 'redux';
import posts from './postsReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
    posts,
    profile
});

export default rootReducer;
