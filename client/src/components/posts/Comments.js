import React from 'react';
import Spinner from '../common/Spinner';
import * as constants from '../../constants/constants';
import CommentLikesModal from '../modals/commentLikes/commentLikesModal';
import ReplyLikesModal from '../modals/commentLikes/replyLikesModal';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {},
            comment: "",
            modal: {
                [constants.COMMENT_LIKES]: false,
                [constants.REPLY_LIKES]: false
            }
        };

        this.comment = this.comment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.likeComment = this.likeComment.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);

        this.reply = this.reply.bind(this);
        this.postReply = this.postReply.bind(this);
        this.likeReply = this.likeReply.bind(this);

        this.showCommentLikes = this.showCommentLikes.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.newCommentRef = React.createRef();
        this.newReplyRef - React.createRef();
    }

    componentWillReceiveProps(newProps) {

    }

    componentDidUpdate(prevProps) {
        // if (this.props.comments.length !== prevProps.comments.length) {
        //     this.newCommentRef.current.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'end'
        //     });
        // }
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

    likeComment(e) {
        let target = e.currentTarget.closest('.comment-item'),
            commentId = target.dataset['id'];

        this.props.actions.likeComment(commentId);
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

    showCommentLikes(e){
        let target = e.currentTarget,
            type = target.dataset['type'];

        this.toggleModal(type);
    }

    toggleModal(type) {

        this.setState({
            modal: {
                [type]: !this.state.modal[type]
            }
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
                                            <div className="comment-item" key={comment._id} data-id={comment._id}
                                                 ref={this.newCommentRef}>
                                                <div className="comment-bubble">
                                                    <div className="comment-content">
                                                    <span className="comment-photo">
                                                        <img src={comment.postedBy.profile.photo}/>
                                                    </span>
                                                        <span className="comment-details">
                                                            <div className="name">
                                                                <a target="_blank" href={`/profile/` + comment.postedBy._id}>{comment.displayName}</a>
                                                            </div>
                                                        <div className="content">{comment.content}</div>
                                                        <div className="comment-actions">
                                                            <div className="action">
                                                                <span className="primary" onClick={this.likeComment}>Like</span>
                                                                <span className ="label" data-type={constants.COMMENT_LIKES} onClick={this.showCommentLikes}>
                                                                    {!!comment.likes.length &&
                                                                    (
                                                                        <React.Fragment>
                                                                            &nbsp;
                                                                            {'(' + comment.likes.length + ')'}
                                                                        </React.Fragment>
                                                                    )
                                                                    }
                                                                </span>
                                                            </div>
                                                            |&nbsp;
                                                            <div className="action">
                                                                <span className="primary"
                                                                      onClick={this.reply}>Reply</span>
                                                                <span className="label info">
                                                                    {!!comment.comments.length &&
                                                                    (
                                                                        <React.Fragment>
                                                                            &nbsp;|&nbsp;
                                                                            {comment.comments.length}
                                                                            {comment.comments.length === 1 && ' Reply'}
                                                                            {comment.comments.length !== 1 && ' Replies'}
                                                                        </React.Fragment>
                                                                    )
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    </div>
                                                </div>
                                                <CommentLikesModal
                                                    isOpen={this.state.modal[constants.COMMENT_LIKES]}
                                                    commentId={comment._id}
                                                    onClose={this.toggleModal}/>
                                                {
                                                    <div className="reply-list">
                                                        {comment.comments.length ?
                                                            <div className="header">View replies:</div> : null}
                                                        <div className="new-reply-container">
                                                            {!!this.state.showNewComment[comment._id] &&
                                                            <textarea
                                                                autoFocus
                                                                className="new-reply"
                                                                placeholder="Write a reply..."
                                                                onKeyDown={this.postReply}/>}
                                                        </div>
                                                        {comment.comments.map(reply => {
                                                            return (
                                                                <div className="reply-item" key={reply._id}
                                                                     data-id={reply._id}>
                                                                    <div className="reply-content">
                                                                    <span className="reply-photo">
                                                                        <img src={reply.postedBy.profile.photo}/>
                                                                    </span>
                                                                        <span className="reply-details">
                                                                        <div className="name">
                                                                            <a target="_blank" href={`/profile/` + reply.postedBy._id}>{reply.displayName}</a>
                                                                        </div>
                                                                        <div className="content">{reply.content}</div>
                                                                        <div className="reply-actions">
                                                                            <div className="action">
                                                                                <span className="primary"
                                                                                      onClick={this.likeReply}>Like</span>&nbsp;
                                                                                <span className="label" data-type={constants.REPLY_LIKES} onClick={this.showCommentLikes}>
                                                                                    {!!reply.likes.length && ( '(' + reply.likes.length + ')' )}</span>
                                                                            </div>
                                                                        </div>
                                                                    </span>
                                                                    </div>
                                                                    <ReplyLikesModal
                                                                        isOpen={this.state.modal[constants.REPLY_LIKES]}
                                                                        commentId={reply._id}
                                                                        onClose={this.toggleModal}/>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                }
                                            </div>
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