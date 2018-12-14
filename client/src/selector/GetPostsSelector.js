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
            return {
                ...post,
                createdAt: new Date(post.createdAt).toUTCString(),
                //dateSelected: filters.date
            }
        }).sort();

    }
);