import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import CreatePost from '../components/posts/CreatePost';

class CreatePostContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <CreatePost actions={this.props.actions}/>
        );
    }
}

CreatePostContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePostContainer);
