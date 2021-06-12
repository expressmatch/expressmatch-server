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
import NavBar from '../components/posts/NavBar';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lazyLoadEnabled: true
        };

        this.throttle = this.throttle.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onThrottledScroll = this.throttle(this.onScroll, 300);
    }

    componentDidMount(){
        this.props.actions.getPosts(this.props.filters, 0);

        if( this.state.lazyLoadEnabled ) {
            document.addEventListener('scroll', this.onThrottledScroll);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters !== nextProps.filters ||
            this.props.pageNumber !== nextProps.pageNumber) {
            this.props.actions.getPosts(nextProps.filters, nextProps.pageNumber);
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

    throttle(func, wait) {
        let timeout;
        return function () {
            let later = () => {
                timeout = null;
                func.apply(this, arguments);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }
    };

    onScroll(e) {

        let target = e.target.body,
            scrollBuffer = (target.scrollHeight - target.clientHeight) - target.scrollTop;

        if (this.props.hasNext && scrollBuffer < 300){

            this.props.actions.updatePageNumber(this.props.pageNumber + 1);
        }
    }

    render() {
        return (
            <div className="posts-container">
                <NavBar/>
                <div className="posts">
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
                <div className="sidebar">
                    <div className="sidebar-content">
                        {/*<DateFilter actions={this.props.actions} selected={this.props.filters.date}/>*/}
                        {/*<QuickFilter*/}
                            {/*actions={this.props.actions}*/}
                            {/*filters={this.props.filters.quick}/>*/}
                        {/*<Filters />*/}
                    </div>
                </div>
                <div className="back-to-top">
                    <a onClick={this.scrollToTop}>
                        <i className="fas fa-arrow-up"></i>
                    </a>
                </div>
            </div>
        );
    }

    componentWillUnmount(e){
        if( this.state.lazyLoadEnabled ) {
            document.removeEventListener('scroll', this.onThrottledScroll);
        }
        this.props.actions.updatePageNumber(0);
        this.props.actions.clearQuickFilter();
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
            filters: state.posts.filters,
            pageNumber: state.posts.pageNumber,
            hasNext: state.posts.hasNext
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
