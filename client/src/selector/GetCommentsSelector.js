import {createSelector} from 'reselect';

const getComments = (state, props) => {
    let comment = null,
        comments = [];

    props.post.comments.map(commentId => {
        comment = {...state.comments.byId[commentId]};

        if (state.comments.byId[commentId]) {
            comment.comments = comment.comments.map(replyId => {
                return {
                    ...state.comments.byId[replyId],
                    displayName: state.comments.byId[replyId].postedBy.profile.name || state.comments.byId[replyId].postedBy.profile.email
                }
            });
            comments.push(comment);
        }
    });
    return comments;
};

export const makeGetComments = () => createSelector(
    [getComments],
    (comments) => {
        return comments.map(comment => {
            return {
                ...comment,
                displayName: comment.postedBy.profile.name || comment.postedBy.profile.email
            }
        }).sort();
    }
);