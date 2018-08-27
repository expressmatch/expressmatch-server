import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/profileActions';
import Profile from '../components/Profile';

class ProfileContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.getProfile();
    }
    componentWillMount(){

    }
    componentWillReceiveProps(){

    }

    render() {
        return (
            <Profile profile={this.props.profile} actions={this.props.actions} />
        );
    }
}


ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile
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
