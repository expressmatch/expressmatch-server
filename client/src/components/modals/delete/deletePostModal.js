import React from 'react';
import EmModal from '../modal';
import {deletePost} from '../../../actions/postsActions';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';

class DeletePostModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.delete = this.delete.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    header() {
        return <div>Delete Post</div>;
    }

    content() {
        return <div>Are you sure you want to delete this post and all of its comments?</div>;
    }

    delete() {
        this.props.onClose();
        this.props.deletePost(this.props.postId);
    }

    onClose() {
        this.props.onClose(constants.DELETE_POST);
    }

    render() {

        return (
            <EmModal isOpen={this.props.isOpen}
                     onClose={this.onClose}
                     className="deletePost"
                     backdrop={true}
                     header={this.header()}
                     content={this.content()}
                     submit={this.delete}
                     submitButton='Delete'/>
        );
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {deletePost})(DeletePostModal);