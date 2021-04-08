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
        this.props.actions.getProfile(this.props.userId);
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                actions={this.props.actions}
                readonly={this.props.readonly}
                otherProfile={
                    this.props.otherProfile
                    ? this.props.user.id !== this.props.userId
                    : false}
            />
        );
    }
}


ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,
        user: state.user
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
