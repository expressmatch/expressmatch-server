import { createSelector } from 'reselect';

const getPosts = (state, props) => {
    return state.posts.entities.posts.allIds.map(id => state.posts.entities.posts.byId[id])
};

const getFilters = (state, props) => {
    return state.posts.filters;
};

export const makeGetPosts = () => createSelector(
    [ getPosts, getFilters ],
    (posts, filters) => {
        return posts.map(post => {
            let today = new Date();
            today.setHours(0,0,0,0);

            return {
                ...post,
                displayDate: new Date(post.createdAt) >= today ? 'Today' : new Date(post.createdAt).toDateString(),
                displayTime: new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                //dateSelected: filters.date
            }
        }).sort();

    }
);