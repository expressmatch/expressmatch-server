import {createSelector} from 'reselect';

const getComments = (state, props) => {
    let comments = [];

    props.post.comments.map(id => {
        if (state.comments.byId[id]) {
            comments.push(state.comments.byId[id]);
        }
    });
    return comments;
};

export const makeGetComments = () => createSelector(
    [getComments],
    (comments) => {
        return comments.map(comment => {
            return {
                ...comment
            }
        }).sort();
    }
);