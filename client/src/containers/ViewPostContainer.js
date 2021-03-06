import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/posts/Posts';
import Spinner from '../components/common/Spinner';
import {makeGetPosts} from '../selector/GetPostsSelector';
import NavBar from '../components/posts/NavBar';
import SideBar from '../components/posts/SideBar';

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
            <div className="posts-container">
                <Spinner loading={this.props.loading}/>
                <NavBar/>
                <div className="posts">
                    <Posts
                        posts={this.props.posts}
                        filters={this.props.filters}
                        actions={this.props.actions}
                        loading={this.props.loading}/>
                </div>
                <SideBar {...this.props}/>
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
            filters: state.posts.filters,
            loading: state.posts.loading
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
