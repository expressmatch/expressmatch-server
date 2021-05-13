import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/preferenceActions';
import Preference from '../components/Preference';

class PreferenceContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.getPreference();
    }

    render() {
        return (
            <Preference
                preference={this.props.preference}
                actions={this.props.actions}/>
        );
    }
}

PreferenceContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    preference: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        filters: state.posts.filters,
        preference: state.preference
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
)(PreferenceContainer);
