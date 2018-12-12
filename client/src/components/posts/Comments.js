import React from 'react';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {}
        };

        this.comment = this.comment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.likeComment = this.likeComment.bind(this);

        this.reply = this.reply.bind(this);
        this.postReply = this.postReply.bind(this);
        this.likeReply = this.likeReply.bind(this);
    }

    componentWillReceiveProps(newProps) {

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

            // this.setState({
            //     showNewComment: {
            //         ...this.state.showNewComment,
            //         [postId]: false
            //     }
            // });
            //e.currentTarget.value = "";
            this.props.actions.postComment(postId, null, commentStr).then(() => {

            });
        }
    }

    likeComment(e) {
        let target = e.currentTarget.closest('.comment-item'),
            commentId = target.dataset['id'];

        this.props.actions.likeComment(commentId);
    }

    reply(e) {
        let target = e.currentTarget.closest('.comment-item'),
            commentId = target.dataset['id'];

        this.setState({
            showNewComment: {
                [commentId]: true
            }
        });
    }

    postReply(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();

            let target = e.currentTarget,
                post = target.closest('.post'),
                comment = target.closest('.comment-item'),
                postId = post && post.dataset['id'],
                commentId = comment && comment.dataset['id'],
                commentStr = target.value;

            this.setState({
                showNewComment: {
                    ...this.state.showNewComment,
                    [commentId]: false
                }
            });
            this.props.actions.postComment(postId, commentId, commentStr).then(() => {

            });
        }
    }

    likeReply(e) {
        let target = e.currentTarget.closest('.reply-item'),
            commentId = target.dataset['id'];

        this.props.actions.likeComment(commentId);
    }

    render() {
        if(!!this.props.showPostComment) {
            return (
                <div className="comments-control">
                    <div className="header">View comments:</div>
                    <div className="new-comment-container">

                        <textarea
                            autoFocus
                            className="new-comment"
                            placeholder="Write a comment..."
                            onKeyDown={this.postComment}/>
                    </div>
                    {this.props.loading && <div>Loading...</div>}
                    <div className="comments-list">
                        {this.props.comments.map(comment => {
                            return (
                                <div className="comment-item" key={comment._id} data-id={comment._id}>
                                    <div className="comment-bubble">
                                        <div className="comment-content">
                                            <span className="postedBy">ExpressMatch</span>:&nbsp;
                                            <span className="content">{comment.content}</span>
                                        </div>
                                        <div className="comment-actions">
                                            <div className="action" onClick={this.likeComment}>
                                                Like {!!comment.likes.length && ( '(' + comment.likes.length + ')' )}
                                            </div>
                                            <div className="action" onClick={this.reply}>
                                                Reply
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        <div className="reply-list">
                                        {comment.comments.length ? <div className="header">View replies:</div> : null}
                                            <div className="new-reply-container">
                                                {!!this.state.showNewComment[comment._id] &&
                                                <textarea
                                                    autoFocus
                                                    className="new-reply"
                                                    placeholder="Write a comment..."
                                                    onKeyDown={this.postReply}/>}
                                            </div>
                                            {comment.comments.map(reply => {
                                                return (
                                                    <div className="reply-item" key={reply._id} data-id={reply._id}>
                                                        <div className="reply-content">
                                                            <span className="postedBy">ExpressMatch</span>:&nbsp;
                                                            <span className="content">{reply.content}</span>
                                                        </div>
                                                        <div className="reply-actions">
                                                            <div className="action" onClick={this.likeReply}>
                                                                Like {!!reply.likes.length && ( '(' + reply.likes.length + ')' )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }else {
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