import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class App extends React.Component {

    componentDidMount(){
        this.props.actions.getUser();
    }
    render() {
        return (
            <div className="main-container">
                <Header {...this.props}/>
                <Content/>
                {/*<Footer/>*/}
            </div>
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