import React from 'react';
import QuickFilter from './filters/QuickFilter';
import DateFilter from './filters/DateFilter';
import Filters from './filters/Filters';
import { withRouter } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Spinner from '../common/Spinner';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewComment: {}
        };

        this.renderPost = this.renderPost.bind(this);
        this.likePost = this.likePost.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.comment = this.comment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
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
    comment(e){
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.setState({
            showNewComment: {
                ...this.state.showNewComment,
                [postId]: true
            }
        });
    }

    postComment(e){
        if(e.keyCode == 13 && e.shiftKey == false) {
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
                    [postId]: false
                }
            });
            this.props.actions.postComment(postId, commentId, commentStr).then(() => {

            });
        }
    }

    toggleComment(e){
        let target = e.currentTarget,
            post = target.closest('.post'),
            comment = target.closest('.comment-item'),
            postId = post && post.dataset['id'],
            commentId = comment && comment.dataset['id'],
            commentStr = target.value;

        if(commentStr.trim() === ''){
            this.setState({
                showNewComment: {
                    ...this.state.showNewComment,
                    [postId]: false
                }
            })
        }
    }

    renderPost(post) {
        return (
            <article className="post" key={post._id} data-id={post._id}>
                <div className="post-header">
                    <div className="post-details">
                        <div className="post-date detail">
                            {post.createdAt}
                        </div>
                        <div className="post-place detail">
                            {post.postedBy.city}
                        </div>
                        <div className="post-caste detail">
                            {post.postedBy.caste}{post.postedBy.caste && post.postedBy.subCaste && ', '}{post.postedBy.subCaste}
                        </div>
                    </div>
                    <div className="post-action">
                        <UncontrolledDropdown className="menu-toggle">
                            <DropdownToggle tag="div" className="post-action-menu">...</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className="menu-item">Copy link to post</DropdownItem>
                                <DropdownItem className="menu-item">Delete post</DropdownItem>
                                <DropdownItem className="menu-item">Report spam</DropdownItem>
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
                        <span className="count">{post.likes.length}</span>
                    </div>
                    <div className="liked">
                        {post.likes.length === 0 && 'Be the first one to like this proposal'}
                        {post.likes.length === 1 && `Express Match likes this`}
                        {post.likes.length > 1 && `Express Match and ${post.likes.length - 1} others likes this`}
                    </div>
                    <div className="comments">
                        <span className="logo">
                            <i className="fas fa-comments"></i>
                        </span>
                        <span className="count">{post.comments.length}</span>
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
                <div className="comments-control">
                    {post.comments.length ? <div className="header">View comments:</div> : null}
                    <div className="comments-list">
                        {post.comments.map(comment => {
                            return (
                                <div className="comment-item" key={comment._id} data-id={comment._id}>
                                    <div className="comment-bubble">
                                        <div className="comment-content">
                                            <div className="postedBy">ExpressMatch:</div>
                                            <div className="content">{comment.content}</div>
                                        </div>
                                        <div className="comment-actions">
                                            <div className="action">Like</div>
                                            <div className="action">Reply</div>
                                        </div>
                                    </div>
                                    <div className="reply-list">
                                        {comment.comments.length ? <div className="header">View replies:</div> : null}
                                        {comment.comments.map(reply => {
                                            return (
                                                <div className="reply-item" key={reply._id} data-id={reply._id}>
                                                    <div className="reply-content">
                                                        <div className="postedBy">ExpressMatch:</div>
                                                        <div className="content">{reply.content}</div>
                                                    </div>
                                                    <div className="reply-actions">
                                                        <div className="action">Like</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="comment-reply">
                                        {/*<textarea*/}
                                            {/*className="new-comment"*/}
                                            {/*placeholder="Reply to comment"*/}
                                            {/*onKeyDown={this.postComment}/>*/}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                    <div>
                        {!!this.state.showNewComment[post._id] &&
                            <textarea
                                className="new-comment"
                                placeholder="Hit enter to post your reply"
                                onKeyDown={this.postComment}
                                onBlur={this.toggleComment}/>}
                    </div>
                </div>
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
                    {!this.props.loading && this.props.posts.length === 0 && <div className="empty-message">No Posts To Display</div>}
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
}

export default withRouter(Posts);