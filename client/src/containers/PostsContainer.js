import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/postsActions';
import Posts from '../components/posts/Posts';
import QuickFilter from '../components/posts/filters/QuickFilter';
import DateFilter from '../components/posts/filters//DateFilter';
import Filters from '../components/posts/filters/Filters';
import Spinner from '../components/common/Spinner';
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
            <div className="posts">
                <div className="left-content">
                    <Spinner loading={this.props.loading}/>
                    <Posts
                        posts={this.props.posts}
                        filters={this.props.filters}
                        actions={this.props.actions}
                        loading={this.props.loading}/>
                </div>
                <div className="right-content">
                    <DateFilter actions={this.props.actions} selected={this.props.filters.date}/>
                    <QuickFilter
                        actions={this.props.actions}
                        filters={this.props.filters.quick}/>
                    {/*<div className="panel">*/}
                    {/*<Filters />*/}
                    {/*</div>*/}
                </div>
            </div>
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
