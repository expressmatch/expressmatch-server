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
import DefaultPost from '../components/posts/DefaultPost';
import {makeGetPosts} from '../selector/GetPostsSelector';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.pageNumber = 0;
        this.state = {
            lazyLoadEnabled: true
        };

        this.scrollListener = this.scrollListener.bind(this);
    }

    componentDidMount(){
        this.props.actions.getPosts(this.props.filters, 0);

        if( this.state.lazyLoadEnabled ) {
            document.addEventListener('scroll', this.scrollListener);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters !== nextProps.filters) {
            this.props.actions.getPosts(nextProps.filters);
        }

    }

    componentWillMount() {

    }

    scrollToTop(e) {
        e.preventDefault();

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
    }

    scrollListener(e) {
        // debugger;

        let target = e.target.body,
            scrollBuffer = (target.scrollHeight - target.clientHeight) - target.scrollTop;

        // if (this.props.hasNext && scrollBuffer < 55){ hasNext shuold come from service

        if (scrollBuffer < 200) {
            this.props.actions.getPosts(this.props.filters, this.pageNumber = this.pageNumber + 1);
        }
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
                    {!this.props.loading && this.props.posts.length === 0 &&
                    <div className="empty-message">
                        <DefaultPost/>
                    </div>}
                </div>
                <div className="right-content">
                    {/*<DateFilter actions={this.props.actions} selected={this.props.filters.date}/>*/}
                    <QuickFilter
                        actions={this.props.actions}
                        filters={this.props.filters.quick}/>
                    {/*<Filters />*/}
                    <a className="back-to-top" onClick={this.scrollToTop}>
                        <i className="fas fa-arrow-up"></i>
                    </a>
                </div>
            </div>
        );
    }

    componentWillUnmount(e){
        if( this.state.lazyLoadEnabled ) {
            document.removeEventListener('scroll', this.scrollListener);
        }
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
