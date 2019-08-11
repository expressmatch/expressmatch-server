import React from 'react';
import * as constants from '../../constants/constants';
import ReplyLikesModal from '../modals/commentLikes/replyLikesModal';
import noReplyImage from '../../images/no_image_available.svg';

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
                        <picture>
                            <source srcSet={this.props.reply.postedBy.profile.photo}/>
                            <img srcSet={noReplyImage}/>
                        </picture>
                    </span>
                    <span className="reply-details">
                        <div className="name">
                            <a target="_blank" href={`/profile/` + this.props.reply.postedBy._id}>{this.props.reply.displayName}</a>
                        </div>
                        <div className="content">{this.props.reply.content}</div>
                        <div className="reply-actions">
                            <div className="action">
                                <span className="logo">
                                    {this.props.reply.isLikedByUser && <i className="fas fa-heart"></i>}
                                    {!this.props.reply.isLikedByUser && <i className="far fa-heart"></i>}
                                </span>
                                <span className="primary" onClick={this.likeReply}>
                                    {!this.props.reply.isLikedByUser && 'Like'}
                                    {this.props.reply.isLikedByUser && 'Liked'}
                                </span>&nbsp;
                                <span className="label" data-type={constants.REPLY_LIKES} onClick={this.showCommentLikes}>
                                    {!!this.props.reply.likes.length && ( '(' + this.props.reply.likes.length + ')' )}</span>
                            </div>
                            {!!this.props.reply.isCreatedByUser &&
                            <React.Fragment>|&nbsp;
                                <div className="action">
                                    <div className="primary">
                                        <i className="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                            </React.Fragment>
                            }
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

export default ReplyItem;