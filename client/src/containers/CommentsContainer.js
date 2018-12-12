import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import Comments from '../components/posts/Comments';
import {makeGetComments} from '../selector/GetCommentsSelector';

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showPostComment !== this.props.showPostComment) {
            this.props.actions.getComments(nextProps.post._id);
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <Comments
                post={this.props.post}
                showPostComment={this.props.showPostComment}
                comments={this.props.comments}
                loading={this.props.loading}
                actions={this.props.actions}
            />
        );
    }
}


CommentsContainer.propTypes = {
    post: PropTypes.object.isRequired,
    showPostComment: PropTypes.bool.isRequired,
    comments: PropTypes.array,
    loading: PropTypes.bool,
    actions: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const getComments = makeGetComments(state);
    const mapStateToProps = (state, ownProps) => {
        return {
            comments: getComments(state, ownProps),
            loading: state.comments.loading
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
)(CommentsContainer);
