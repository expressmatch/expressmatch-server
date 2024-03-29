import React from 'react';
import {withRouter} from 'react-router-dom';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CommentsContainer from "../../containers/CommentsContainer";
import DeletePostModal from '../modals/delete/deletePostModal';
import ReportSpamModal from '../modals/reportSpam/reportSpamModal';
import PostLikesModal from '../modals/likes/postLikesModal';
import PostInterestsModal from '../modals/interests/postInterestsModal';
import * as constants from '../../constants/constants';
import LazyLoad from 'react-lazyload';

const Posts = (props) => {

    return(
        <React.Fragment>
            {props.posts && props.posts.map(post => {
                return (
                    <LazyLoad height={100} offset={2000} key={post._id}>
                        <Post post={post} key={post._id} {...props}/>
                    </LazyLoad>
                );
            })}
        </React.Fragment>
    );
}

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {},
            modal: {
                [constants.DELETE_POST]: false,
                [constants.REPORT_SPAM]: false,
                [constants.POST_LIKES]: false,
                [constants.POST_INTERESTS]: false
            }
        };

        this.likePost = this.likePost.bind(this);
        this.sendInterest = this.sendInterest.bind(this);
        this.copyLink = this.copyLink.bind(this);

        this.comment = this.comment.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.showPostLikes = this.showPostLikes.bind(this);
        this.showPostInterests = this.showPostInterests.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillReceiveProps(newProps) {

    }

    likePost(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.props.actions.likePost(postId);
    }

    sendInterest(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.props.actions.sendInterest(postId);
    }

    copyLink(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        const el = document.createElement('textarea');
        el.value = window.location.origin + '/post/' + postId;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        try {
            let successful = document.execCommand('copy');
            if( successful){
                console.log('Link copied to clipboard');
            }
        } catch (err) {
            alert('Error during copying link');
        }
        document.body.removeChild(el);
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

    handleMenuClick(e) {
        let target = e.currentTarget,
            type = target.dataset['type'];

        this.toggleModal(type);
    }

    showPostLikes(e){
        let target = e.currentTarget,
            type = target.dataset['type'];

        this.toggleModal(type);
    }

    showPostInterests(e){
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

    render(){
        let className = 'post';
        if (this.props.post.isCreatedByUser) {
            className += ' author-post';
        }
        return (
            <article className={className} key={this.props.post._id} data-id={this.props.post._id}>
                <div className="post-body">
                    {this.props.post.isCreatedByUser && <div className="author">AUTHOR</div>}
                    <div className="post-header">
                        <div className="post-details">
                            <div className="post-date detail">
                                {this.props.post.displayDate} at {this.props.post.displayTime}
                            </div>
                            <div className="post-place detail">
                                {this.props.post.postedBy.city}
                            </div>
                            <div className="post-caste detail">
                                {this.props.post.postedBy.caste}
                            </div>
                            <div className="post-sub-caste detail">
                                {this.props.post.postedBy.subCaste}
                            </div>
                        </div>
                        <div className="post-action">
                            <UncontrolledDropdown className="menu-toggle">
                                <DropdownToggle tag="div" className="post-action-menu"></DropdownToggle>
                                <DropdownMenu right>
                                    {/*<DropdownItem className="menu-item">Add to favourites</DropdownItem>*/}
                                    <DropdownItem className="menu-item" onClick={this.copyLink}>
                                        <i className="far fa-copy"></i>
                                        <div className="item-text">
                                            <div className="main-text">Copy link</div>
                                            <div className="sub-text">Share with friends</div>
                                        </div>

                                    </DropdownItem>
                                    {this.props.post.isCreatedByUser &&
                                    <DropdownItem className="menu-item" onClick={this.handleMenuClick} data-type={constants.DELETE_POST}>
                                        <i className="far fa-trash-alt"></i>
                                        <span className="item-text">
                                            <div className="main-text">Delete Post</div>
                                            <div className="sub-text">Remove permanently</div>
                                        </span>
                                    </DropdownItem>}
                                    <DropdownItem className="menu-item" onClick={this.handleMenuClick} data-type={constants.REPORT_SPAM}>
                                        <i className="far fa-flag"></i>
                                        <span className="item-text">
                                            <div className="main-text">Report Spam</div>
                                            <div className="sub-text">Don't want to see again</div>
                                        </span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="content">
                        <pre>{this.props.post.content}</pre>
                    </div>
                    <div className="post-meta">
                        <div className="likes" data-type={constants.POST_LIKES}>
                            <span className="logo">
                                {this.props.post.isLikedByUser && <i className="fas fa-thumbs-up"></i>}
                                {!this.props.post.isLikedByUser && <i className="far fa-thumbs-up"></i>}
                            </span>
                            <span className="count">
                                {this.props.post.likes.length}
                            </span>
                        </div>.
                        <div className="comments">
                            <span className="logo">
                                {!!this.props.post.comments.length && <i className="fas fa-comment"></i>}
                                {!this.props.post.comments.length && <i className="far fa-comment"></i>}
                            </span>
                            <a href="javascript:void(0);" onClick={this.comment}>
                                <span className="count">
                                    {this.props.post.comments.length}&nbsp;
                                    {this.props.post.comments.length === 1 && 'Comment'}
                                    {this.props.post.comments.length !== 1 && 'Comments'}
                                </span>
                            </a>
                        </div>
                        <div className="interests" data-type={constants.POST_INTERESTS} onClick={this.props.post.isCreatedByUser ? this.showPostInterests : undefined}>
                            {this.props.post.isCreatedByUser &&
                            <React.Fragment>
                            <span className="logo">
                                {!!this.props.post.interests.length && <i className="fas fa-heart"></i>}
                                {!this.props.post.interests.length && <i className="far fa-heart"></i>}
                            </span>
                            <span className="count">
                                {this.props.post.interests.length || 'No'} {this.props.post.interests.length === 1 && ' Interest received'}{this.props.post.interests.length !== 1 && ' Interests received'}
                            </span>
                            </React.Fragment>}
                            {(!this.props.post.isCreatedByUser && this.props.post.isInterestedByUser) &&
                            <span className=" activity highlight">
                                You have shown interest
                            </span>}
                        </div>
                        {/*<div className="liked">*/}
                            {/*{this.props.post.likes.length === 0 && 'Be the first one to like this proposal'}*/}
                            {/*{this.props.post.likes.length === 1 && `Express To Match likes this`}*/}
                            {/*{this.props.post.likes.length > 1 && `Express To Match and ${this.props.post.likes.length - 1} others likes this`}*/}
                        {/*</div>*/}
                    </div>
                    <div className="post-controls">
                        <div className="post-control like">
                            <button className="btn btn-control" onClick={this.likePost}>
                                {!this.props.post.isLikedByUser && 'Like'}
                                {this.props.post.isLikedByUser && 'Liked'}
                            </button>
                        </div>
                        {!this.props.post.isCreatedByUser &&
                        <div className="post-control interest">
                            <button className="btn btn-control" onClick={this.sendInterest}>
                                {!this.props.post.isInterestedByUser && 'Interest'}
                                {this.props.post.isInterestedByUser && 'Withdraw'}
                            </button>
                        </div>}
                        <div className="post-control comment">
                            <button className="btn btn-control" onClick={this.comment}>
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
                <CommentsContainer
                    post={this.props.post}
                    showPostComment={!!this.state.showNewComment[this.props.post._id] || !!this.props.post.showComments}/>
                <DeletePostModal
                    isOpen={this.state.modal[constants.DELETE_POST]}
                    postId={this.props.post._id}
                    onClose={this.toggleModal}/>
                <ReportSpamModal
                    isOpen={this.state.modal[constants.REPORT_SPAM]}
                    postId={this.props.post._id}
                    onClose={this.toggleModal}/>
                <PostLikesModal
                    isOpen={this.state.modal[constants.POST_LIKES]}
                    postId={this.props.post._id}
                    onClose={this.toggleModal}
                    loading={this.props.loading}/>
                <PostInterestsModal
                    isOpen={this.state.modal[constants.POST_INTERESTS]}
                    postId={this.props.post._id}
                    onClose={this.toggleModal}
                    loading={this.props.loading}/>
            </article>
        );
    }
}

export default withRouter(Posts);