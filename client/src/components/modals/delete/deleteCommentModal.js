import React from 'react';
import EmModal from '../modal';
import {deleteComment} from '../../../actions/commentsActions';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';

class DeleteCommentModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.delete = this.delete.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    header() {
        return <div>Delete Comment</div>;
    }

    content() {
        return <div>Are you sure you want to delete this comment?</div>;
    }

    delete() {
        this.props.onClose();
        this.props.deleteComment(this.props.commentId, this.props.postId, this.props.parentCommentId);
    }

    onClose() {
        this.props.onClose(constants.DELETE_COMMENT);
    }

    render() {

        return (
            <EmModal isOpen={this.props.isOpen}
                     onClose={this.onClose}
                     className="deleteComment"
                     backdrop={true}
                     header={this.header()}
                     content={this.content()}
                     submit={this.delete}
                     submitButton='Delete'/>
        );
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {deleteComment})(DeleteCommentModal);