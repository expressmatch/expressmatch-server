import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/posts/Posts';

class PostsContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
       this.props.actions.getPosts();
    }
    componentWillMount(){

    }
    componentWillReceiveProps(){
    }

    render() {
        return (
            <Posts posts={this.props.posts}/>
        );
    }
}


PostsContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts.entities.posts.allIds.map(id => state.posts.entities.posts.byId[id])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsContainer);
