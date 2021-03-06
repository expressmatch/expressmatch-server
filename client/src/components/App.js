import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/userActions';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import {userContext} from '../context/userContext';

class App extends React.Component {

    componentDidMount(){
        this.props.actions.getUser();
    }
    render() {
        return (
            <userContext.Provider value={this.props.user}>
                <div className="main-container">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </userContext.Provider>
        );
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);