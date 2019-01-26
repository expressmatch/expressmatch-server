import React from 'react';
import QuickFilter from './filters/QuickFilter';
import DateFilter from './filters/DateFilter';
import Filters from './filters/Filters';
import {withRouter} from 'react-router-dom';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Spinner from '../common/Spinner';
import CommentsContainer from "../../containers/CommentsContainer";
import DeletePostModal from '../modals/deletePost/deletePostModal';
import ReportSpamModal from '../modals/reportSpam/reportSpamModal';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {},
            // deleteModal: [],
            // reportSpamModal: [],
            modal: {
                delete: false,
                spam: false
            }
        };

        this.renderPost = this.renderPost.bind(this);
        this.likePost = this.likePost.bind(this);
        this.copyLink = this.copyLink.bind(this);

        this.comment = this.comment.bind(this);
        // this.delete = this.delete.bind(this);
        // this.reportSpam = this.reportSpam.bind(this);
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

        this.props.history.push('/posts/' + postId);
        //TODO: Implement Deep Links
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

    // delete(e) {
    //     let target = e.currentTarget.closest('.post'),
    //         postId = target.dataset['id'];
    //
    //     console.log({postId});
    //
    //     this.setState({
    //         deleteModal: {
    //             ...this.state.deleteModal,
    //             [postId]: true
    //         }
    //     });
    // }
    //
    // reportSpam(e) {
    //     let target = e.currentTarget.closest('.post'),
    //         postId = target.dataset['id'];
    //
    //     this.setState({
    //         reportSpamModal: {
    //             ...this.state.reportSpamModal,
    //             [postId]: true
    //         }
    //     });
    // }

    toggleModal(type) {
        this.setState({
           modal: {
               [type]: !this.state.modal[type]
           }
        });
    }

    renderPost(post) {
        return (
            <article className="post" key={post._id} data-id={post._id}>
                <div className="post-body">
                    <div className="post-header">
                        <div className="post-details">
                            <div className="post-date detail">
                                {post.displayDate} at {post.displayTime}
                            </div>
                            <div className="post-place detail">
                                {post.postedBy.city}
                            </div>
                            <div className="post-caste detail">
                                {post.postedBy.caste}
                            </div>
                            <div className="post-sub-caste detail">
                                {post.postedBy.subCaste}
                            </div>
                        </div>
                        <div className="post-action">
                            <UncontrolledDropdown className="menu-toggle">
                                <DropdownToggle tag="div" className="post-action-menu">...</DropdownToggle>
                                <DropdownMenu right>
                                    {/*<DropdownItem className="menu-item">Add to favourites</DropdownItem>*/}
                                    {post.isCreatedByUser &&
                                    <DropdownItem className="menu-item" onClick={this.toggleModal}>Delete post</DropdownItem>}
                                    <DropdownItem className="menu-item" onClick={this.toggleModal}>Report spam</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="content">
                        <pre>{post.content}</pre>
                    </div>
                    <div className="post-meta">
                        <div className="likes">
                            <span className="logo">
                                {post.isLikedByUser && <i className="fas fa-heart"></i>}
                                {!post.isLikedByUser && <i className="far fa-heart"></i>}
                            </span>
                            <span className="count">
                                {post.likes.length} {post.likes.length === 1 && ' Like'}{post.likes.length !== 1 && ' Likes'}
                            </span>
                        </div>
                        <div className="liked">
                            {/*{post.likes.length === 0 && 'Be the first one to like this proposal'}*/}
                            {/*{post.likes.length === 1 && `Express Match likes this`}*/}
                            {/*{post.likes.length > 1 && `Express Match and ${post.likes.length - 1} others likes this`}*/}
                        </div>
                        <div className="comments">
                            <span className="logo">
                                <i className="fas fa-comments"></i>
                            </span>
                            <span className="count">
                                {post.comments.length}{post.comments.length === 1 && ' Comment'}{post.comments.length !== 1 && ' Comments'}
                            </span>
                        </div>
                    </div>
                    <div className="post-controls">
                        <div className="post-control like">
                            <button className="btn btn-control" onClick={this.likePost}>
                                {!post.isLikedByUser && 'Like'}
                                {post.isLikedByUser && 'Liked'}
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
                    post={post}
                    showPostComment={!!this.state.showNewComment[post._id]}/>
                <DeletePostModal
                    isOpen={this.state.modal['delete']}
                    postId={post._id}
                    onClose={this.toggleModal}/>
                <ReportSpamModal
                    isOpen={this.state.modal['spam']}
                    postId={post._id}
                    onClose={this.toggleModal}/>
            </article>
        );
    }

    render() {
        return (
            <div className="posts">
                <div className="left-content">
                    <Spinner loading={this.props.loading}/>
                    {this.props.posts && this.props.posts.map(post => {
                        return this.renderPost(post);
                    })}
                    {!this.props.loading && this.props.posts.length === 0 &&
                    <div className="empty-message">No Posts To Display</div>}
                </div>
                <div className="right-content">
                    <DateFilter actions={this.props.actions} selected={this.props.filters.date}/>
                    <QuickFilter
                        actions={this.props.actions}
                        filters={this.props.filters.quick}/>
                    {/*<div className="panel">*/}
                    {/*<Filters />*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        // this.state = {
        //     showNewComment: {},
        //     deleteModal: []
        // };
    }
}

export default withRouter(Posts);