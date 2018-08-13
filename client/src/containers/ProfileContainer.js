import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Profile from '../components/Profile';

class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this.props.actions.getPosts();
    }
    componentWillMount(){

    }
    componentWillReceiveProps(){

    }

    render() {
        return (
            <Profile/>
        );
    }
}


ProfileContainer.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
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
)(ProfileContainer);
