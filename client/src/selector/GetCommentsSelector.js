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
            let today = new Date();
            today.setHours(0,0,0,0);

            return {
                ...comment,
                displayName: comment.postedBy.profile.name || comment.postedBy.profile.email,
                displayDate: new Date(comment.createdAt) >= today ? 'Today' : new Date(comment.createdAt).toDateString(),
                //displayDate: new Date(comment.createdAt) >= today ? Math.abs(Math.round(((new Date().getTime() - new Date(comment.createdAt).getTime()) / (1000*60*60)))) : new Date(comment.createdAt).toDateString(),
                displayTime: new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
        }).sort();
    }
);