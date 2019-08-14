import React from 'react';
import {withRouter} from 'react-router-dom';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CommentsContainer from "../../containers/CommentsContainer";
import DeletePostModal from '../modals/delete/deletePostModal';
import ReportSpamModal from '../modals/reportSpam/reportSpamModal';
import PostLikesModal from '../modals/likes/postLikesModal';
import * as constants from '../../constants/constants';

const Posts = (props) => {

    return(
        <React.Fragment>
            {props.posts && props.posts.map(post => {
                return <Post post={post} key={post._id} {...props}/>
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
                [constants.POST_LIKES]: false
            }
        };

        this.likePost = this.likePost.bind(this);
        this.copyLink = this.copyLink.bind(this);

        this.comment = this.comment.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.showPostLikes = this.showPostLikes.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillReceiveProps(newProps) {

    }

    likePost(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.props.actions.likePost(postId);
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
        let target = e.target,
            type = target.dataset['type'];

        this.toggleModal(type);
    }

    showPostLikes(e){
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
        return (
            <article className="post" key={this.props.post._id} data-id={this.props.post._id}>
                <div className="post-body">
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
                                <DropdownToggle tag="div" className="post-action-menu">...</DropdownToggle>
                                <DropdownMenu right>
                                    {/*<DropdownItem className="menu-item">Add to favourites</DropdownItem>*/}
                                    {this.props.post.isCreatedByUser &&
                                    <DropdownItem className="menu-item" onClick={this.handleMenuClick} data-type={constants.DELETE_POST}>Delete post</DropdownItem>}
                                    <DropdownItem className="menu-item" onClick={this.handleMenuClick} data-type={constants.REPORT_SPAM}>Report spam</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="content">
                        <pre>{this.props.post.content}</pre>
                    </div>
                    <div className="post-meta">
                        <div className="likes" data-type={constants.POST_LIKES} onClick={this.showPostLikes}>
                            <span className="logo">
                                {this.props.post.isLikedByUser && <i className="fas fa-heart"></i>}
                                {!this.props.post.isLikedByUser && <i className="far fa-heart"></i>}
                            </span>
                            <span className="count">
                                {this.props.post.likes.length} {this.props.post.likes.length === 1 && ' Like'}{this.props.post.likes.length !== 1 && ' Likes'}
                            </span>
                        </div>
                        <div className="liked">
                            {/*{this.props.post.likes.length === 0 && 'Be the first one to like this proposal'}*/}
                            {/*{this.props.post.likes.length === 1 && `Express Match likes this`}*/}
                            {/*{this.props.post.likes.length > 1 && `Express Match and ${this.props.post.likes.length - 1} others likes this`}*/}
                        </div>
                        <div className="comments">
                            <span className="logo">
                                {!!this.props.post.comments.length && <i className="fas fa-comments"></i>}
                                {!this.props.post.comments.length && <i className="far fa-comments"></i>}
                            </span>
                            <span className="count">
                                {this.props.post.comments.length}{this.props.post.comments.length === 1 && ' Comment'}{this.props.post.comments.length !== 1 && ' Comments'}
                            </span>
                        </div>
                    </div>
                    <div className="post-controls">
                        <div className="post-control like">
                            <button className="btn btn-control" onClick={this.likePost}>
                                {!this.props.post.isLikedByUser && 'Like'}
                                {this.props.post.isLikedByUser && 'Liked'}
                            </button>
                        </div>
                        <div className="post-control copy">
                            <button className="btn btn-control" onClick={this.copyLink}>
                                Copy Link
                            </button>
                        </div>
                        <div className="post-control comment">
                            <button className="btn btn-control" onClick={this.comment}>
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
                <CommentsContainer
                    post={this.props.post}
                    showPostComment={!!this.state.showNewComment[this.props.post._id]}/>
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
                    onClose={this.toggleModal}/>
            </article>
        );
    }
}

export default withRouter(Posts);