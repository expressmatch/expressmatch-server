import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/posts/Posts';
import {makeGetPosts} from '../selector/GetPostsSelector';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.actions.getPosts(this.props.filters);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters !== nextProps.filters) {
            this.props.actions.getPosts(nextProps.filters);
        }

    }

    componentWillMount() {

    }

    render() {
        return (
            <Posts
                posts={this.props.posts}
                filters={this.props.filters}
                actions={this.props.actions}
                loading={this.props.loading}/>
        );
    }
}


PostsContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const getPosts = makeGetPosts(state);
    const mapStateToProps = (state, ownProps) => {
        return {
            posts: getPosts(state, ownProps),
            loading: state.posts.loading,
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
)(PostsContainer);
