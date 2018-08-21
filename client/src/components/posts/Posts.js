import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

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
                    <div className="post-date">
                        19 hours ago
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
                </div>
                <div className="right-content">
                    <div className="panel calendar">
                        <Calendar maxDate={new Date()} onChange={function (value) {
                            alert(value);
                        }}/>
                    </div>
                    <div className="panel filter">
                        <div className="filter-item">My city</div>
                        <div className="filter-item">My caste</div>
                        <div className="filter-item">My mother tongue</div>
                        <div className="filter-item">My company</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;