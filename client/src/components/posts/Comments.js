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

class CommentItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showNewComment: {},
            comment: "",
            modal: {
                [constants.COMMENT_LIKES]: false,
                [constants.REPLY_LIKES]: false
            }
        };
        this.showCommentLikes = this.showCommentLikes.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.likeComment = this.likeComment.bind(this);

        this.reply = this.reply.bind(this);
        this.postReply = this.postReply.bind(this);

        this.newCommentRef = React.createRef();
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

    render() {
        return (
            <div className="comment-item" data-id={this.props.comment._id}
                 ref={this.newCommentRef}>
                <div className="comment-bubble">
                    <div className="comment-content">
                        <span className="comment-photo">
                            <img src={this.props.comment.postedBy.profile.photo}/>
                        </span>
                        <span className="comment-details">
                            <div className="name">
                                <a target="_blank" href={`/profile/` + this.props.comment.postedBy._id}>{this.props.comment.displayName}</a>
                            </div>
                            <div className="content">{this.props.comment.content}</div>
                            <div className="comment-actions">
                                <div className="action">
                                    <span className="primary" onClick={this.likeComment}>
                                        {!this.props.comment.isLikedByUser && 'Like'}
                                        {this.props.comment.isLikedByUser && 'Liked'}
                                    </span>
                                    <span className ="label" data-type={constants.COMMENT_LIKES} onClick={this.showCommentLikes}>
                                        {!!this.props.comment.likes.length &&
                                        (
                                            <React.Fragment>
                                                &nbsp;
                                                {'(' + this.props.comment.likes.length + ')'}
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
                                        {!!this.props.comment.comments.length &&
                                        (
                                            <React.Fragment>
                                                &nbsp;|&nbsp;
                                                {this.props.comment.comments.length}
                                                {this.props.comment.comments.length === 1 && ' Reply'}
                                                {this.props.comment.comments.length !== 1 && ' Replies'}
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
                    commentId={this.props.comment._id}
                    onClose={this.toggleModal}/>
                {
                    <div className="reply-list">
                        {this.props.comment.comments.length ?
                            <div className="header">View replies:</div> : null}
                        <div className="new-reply-container">
                            {!!this.state.showNewComment[this.props.comment._id] &&
                            <textarea
                                autoFocus
                                className="new-reply"
                                placeholder="Write a reply..."
                                onKeyDown={this.postReply}/>}
                        </div>
                        {this.props.comment.comments.map(reply => {
                            return (
                                <ReplyItem key={reply._id}
                                    reply={reply}
                                    actions={this.props.actions}/>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

class ReplyItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modal: {
                [constants.REPLY_LIKES]: false
            }
        };
        this.showCommentLikes = this.showCommentLikes.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.likeReply = this.likeReply.bind(this);
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

    likeReply(e) {
        let target = e.currentTarget.closest('.reply-item'),
            commentId = target.dataset['id'];

        this.props.actions.likeComment(commentId);
    }

    render() {
        return (
            <div className="reply-item" data-id={this.props.reply._id}>
                <div className="reply-content">
                    <span className="reply-photo">
                        <img src={this.props.reply.postedBy.profile.photo}/>
                    </span>
                    <span className="reply-details">
                        <div className="name">
                            <a target="_blank" href={`/profile/` + this.props.reply.postedBy._id}>{this.props.reply.displayName}</a>
                        </div>
                        <div className="content">{this.props.reply.content}</div>
                        <div className="reply-actions">
                            <div className="action">
                                <span className="primary" onClick={this.likeReply}>
                                    {!this.props.reply.isLikedByUser && 'Like'}
                                    {this.props.reply.isLikedByUser && 'Liked'}
                                </span>&nbsp;
                                <span className="label" data-type={constants.REPLY_LIKES} onClick={this.showCommentLikes}>
                                    {!!this.props.reply.likes.length && ( '(' + this.props.reply.likes.length + ')' )}</span>
                            </div>
                        </div>
                    </span>
                </div>
                <ReplyLikesModal
                    isOpen={this.state.modal[constants.REPLY_LIKES]}
                    commentId={this.props.reply._id}
                    onClose={this.toggleModal}/>
            </div>
        );
    }
}

export default Comments;