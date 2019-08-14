import React from 'react';
import Spinner from '../common/Spinner';
import CommentItem from './CommentItem';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {},
            comment: ""
        };

        this.comment = this.comment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
    }

   componentDidUpdate(prevProps) {
        if (this.props.comments.length !== prevProps.comments.length) {
            this.resetNewComment();
            // this.setState({
            //     comment: ""
            // });
        }
    }

    comment(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.setState({
            showNewComment: {
                ...this.state.showNewComment,
                [postId]: true
            }
        });
    }

    postComment(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();

            let target = e.currentTarget,
                post = target.closest('.post'),
                postId = post && post.dataset['id'],
                commentStr = target.value;

            this.props.actions.postComment(postId, null, commentStr).then(() => {
                // this.setState({
                //     comment: ""
                // });
            });
        }
    }

    onCommentChange(e) {
        let target = e.currentTarget,
            value = target.value;

        this.setState({
            comment: value
        });
    }

    resetNewComment(e){
        this.setState({
            comment: ""
        });
    }

    render() {
        if (!!this.props.showPostComment) {
            return (
                <div className="comments-control">
                    <Spinner loading={this.props.loading}/>
                    <div className="new-comment-container">

                        <textarea
                            autoFocus
                            className="new-comment"
                            placeholder="Write a comment..."
                            onKeyDown={this.postComment}
                            onChange={this.onCommentChange}
                            value={this.state.comment}
                        />
                    </div>
                    {this.props.comments.length ?
                        (
                            <React.Fragment>
                                <div className="header">View comments:</div>
                                <div className="comments-list">
                                    {this.props.comments.map(comment => {
                                        return (
                                            <CommentItem key={comment._id}
                                                post={this.props.post}
                                                comment={comment}
                                                actions={this.props.actions}/>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                        ) : null}
                </div>
            );
        } else {
            return null;
        }
    }

    componentWillUnmount() {
        this.state = {
            showNewComment: {}
        };
    }
}

export default Comments;