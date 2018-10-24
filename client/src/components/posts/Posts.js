import React from 'react';
import QuickFilter from './filters/QuickFilter';
import DateFilter from './filters/DateFilter';
import Filters from './filters/Filters';
import { withRouter } from 'react-router-dom';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.renderPost = this.renderPost.bind(this);
        this.likePost = this.likePost.bind(this);
        this.copyLink = this.copyLink.bind(this);
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
                        ...
                    </div>
                </div>
                <div className="content">
                    <pre>{post.content}</pre>
                </div>
                <div className="post-meta">
                    <div className="likes-count">
                        {post.isLikedByUser && <i className="fas fa-heart"></i>}
                        {!post.isLikedByUser && <i className="far fa-heart"></i>}
                        &nbsp;{post.likes.length}
                    </div>
                    <div className="liked">
                        {post.likes.length === 0 && 'Be the first one to like this proposal'}
                        {post.likes.length === 1 && `Express Match likes this`}
                        {post.likes.length > 1 && `Express Match and ${post.likes.length - 1} others likes this`}
                    </div>
                    <div className="comments-count">
                        <i className="fas fa-comments"></i> {post.comments.length}
                    </div>
                    <div className="shares-count">
                        <i className="fas fa-share-square"></i> {post.shares.length}
                    </div>
                </div>
                <div className="post-controls">
                    <div className="post-control like">
                        <button className="btn btn-control" onClick={this.likePost}>
                            {!post.isLikedByUser && 'Like'}
                            {post.isLikedByUser && 'Unlike'}
                        </button>
                    </div>
                    <div className="post-control copy">
                        <button className="btn btn-control" onClick={this.copyLink}>
                            Copy Link
                        </button>
                    </div>
                    <div className="post-control comment">
                        <button className="btn btn-control">
                            Comment
                        </button>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        return (
            <div className="posts">
                <div className="left-content">
                    {this.props.posts && this.props.posts.map(post => {
                        return this.renderPost(post);
                    })}
                    {this.props.posts.length === 0 && <div className="empty-message">No Posts To Display</div>}
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