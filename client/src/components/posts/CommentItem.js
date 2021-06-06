import React from 'react';
import * as constants from '../../constants/constants';
import CommentLikesModal from '../modals/likes/commentLikesModal';
import DeleteCommentModal from '../modals/delete/deleteCommentModal';
import ReplyItem from './ReplyItem';
import noReplyImage from '../../images/no_image_available.svg';
import {userContext} from '../../context/userContext';

class CommentItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showNewComment: {},
            comment: "",
            modal: {
                [constants.COMMENT_LIKES]: false,
                [constants.REPLY_LIKES]: false,
                [constants.DELETE_COMMENT]: false
            }
        };
        this.showCommentLikes = this.showCommentLikes.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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

    deleteComment(e){
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
                commentStr = target.value.trim();

            if (commentStr.length > 0) {
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
    }

    render() {
        return (
            <div className="comment-item" data-id={this.props.comment._id}
                 ref={this.newCommentRef}>
                <div className="comment-bubble">
                    <div className="comment-content">
                        <span className="comment-photo">
                            <picture>
                                <source srcSet={this.props.comment.postedBy.profile.photo}/>
                                <img srcSet={noReplyImage}/>
                            </picture>
                        </span>
                        <span className="comment-details">
                            <div className="name">
                                <a target="_blank" href={`/profile/` + this.props.comment.postedBy._id}>{this.props.comment.displayName}</a>
                            </div>
                            <div className="comment-date detail">
                                {this.props.comment.displayDate} at {this.props.comment.displayTime}
                            </div>
                            <div className="content">{this.props.comment.content}</div>
                            <div className="comment-actions">
                                <div className="action">
                                    <span className="logo">
                                        {this.props.comment.isLikedByUser && <i className="fas fa-thumbs-up"></i>}
                                        {!this.props.comment.isLikedByUser && <i className="far fa-thumbs-up"></i>}
                                    </span>
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
                                {!!this.props.comment.isCreatedByUser &&
                                <React.Fragment>|&nbsp;
                                    <div className="action">
                                        <div className="primary" data-type={constants.DELETE_COMMENT} onClick={this.deleteComment}>
                                            <i className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                </React.Fragment>
                                }
                            </div>
                        </span>
                    </div>
                </div>
                <CommentLikesModal
                    isOpen={this.state.modal[constants.COMMENT_LIKES]}
                    commentId={this.props.comment._id}
                    onClose={this.toggleModal}
                    loading={this.props.loading}/>
                <DeleteCommentModal
                    isOpen={this.state.modal[constants.DELETE_COMMENT]}
                    postId={this.props.post._id}
                    commentId={this.props.comment._id}
                    onClose={this.toggleModal}/>
                {
                    <div className="reply-list">
                        {this.props.comment.comments.length ?
                            <div className="header">View replies:</div> : null}
                        <div className="new-reply-container">
                            {!!this.state.showNewComment[this.props.comment._id] &&
                            <React.Fragment>
                                <userContext.Consumer>
                                    {user => (
                                        <span className="reply-photo">
                                        <picture>
                                            <source srcSet={user.photo}/>
                                            <img srcSet={noReplyImage}/>
                                        </picture>
                                    </span>
                                    )}
                                </userContext.Consumer>
                                <textarea
                                    autoFocus
                                    className="new-reply"
                                    placeholder="Write a reply..."
                                    onKeyDown={this.postReply}/>
                            </React.Fragment>}
                        </div>
                        {this.props.comment.comments.map(reply => {
                            return (
                                <ReplyItem key={reply._id}
                                    comment={this.props.comment}
                                    reply={reply}
                                    actions={this.props.actions}
                                    loading={this.props.loading}/>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default CommentItem;