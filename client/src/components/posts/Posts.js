import React from 'react';
import QuickFilter from './filters/QuickFilter';
import DateFilter from './filters/DateFilter';
import Filters from './filters/Filters';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.renderPost = this.renderPost.bind(this);
        this.likePost = this.likePost.bind(this);
    }

    componentWillReceiveProps(newProps) {

    }

    likePost(e) {
        let target = e.currentTarget.closest('.post'),
            postId = target.dataset['id'];

        this.props.actions.likePost(postId);
    }

    renderPost(post) {
        return (
            <article className="post" key={post._id} data-id={post._id}>
                <div className="post-header">
                    <div className="post-details">
                        <div className="post-date detail">
                            {post.dateCreated}
                        </div>
                        <div className="post-place detail">
                            San Francisco, California
                        </div>
                        <div className="post-caste detail">
                            caste, sub-caste
                        </div>
                    </div>
                    <div className="post-action">
                        ...
                    </div>
                </div>
                <div className="content">
                    {post.content}
                </div>
                <div className="post-meta">
                    <div className="likes-count">
                        &#9829; {post.totalLikes}
                    </div>
                    <div className="liked">
                        Express Match and {post.totalLikes - 1} others likes this
                    </div>
                    <div className="comments-count">
                        {post.totalComments}
                    </div>
                    <div className="shares-count">
                        {post.totalShares}
                    </div>
                </div>
                <div className="post-controls">
                    <div className="post-control like">
                        <button className="btn btn-control" onClick={this.likePost}>
                            Like
                        </button>
                    </div>
                    <div className="post-control copy">
                        <button className="btn btn-control">
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
                    <div className="panel">
                        <DateFilter actions={this.props.actions}/>
                    </div>
                    <div className="panel">
                        <QuickFilter
                            actions={this.props.actions}
                            filters={this.props.filters.quick}/>
                    </div>
                    {/*<div className="panel">*/}
                        {/*<Filters />*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Posts;