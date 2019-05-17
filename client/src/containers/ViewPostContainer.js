import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/posts/Posts';
import Spinner from '../components/common/Spinner';
import {makeGetPosts} from '../selector/GetPostsSelector';

class ViewPostContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.actions.getPost(this.props.match.params.postId);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="posts">
                <div className="left-content">
                    {this.props.loading && <div>Loading...</div>}
                    <Spinner loading={this.props.loading}/>
                    <Posts
                        posts={this.props.posts}
                        filters={this.props.filters}
                        actions={this.props.actions}
                        loading={this.props.loading}/>
                </div>
                <div className="right-content" />
            </div>
        );
    }
}


ViewPostContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const getPosts = makeGetPosts(state);
    const mapStateToProps = (state, ownProps) => {
        return {
            posts: getPosts(state, ownProps),
            filters: state.posts.filters
        };
    }
    return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostContainer);
