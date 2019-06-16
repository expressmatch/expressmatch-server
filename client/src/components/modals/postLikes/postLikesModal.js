import React from 'react';
import EmModal from '../modal';
import {getPostLikes} from '../../../actions/postsActions';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';

class PostLikesModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.props.getPostLikes(this.props.postId);
        //if(nextProps.isOpen === true && nextProps.postId === this.props.postId){
            //this.props.getPostLikes(this.props.postId);
        //}
    }

    header() {
        return <div>Liked By</div>;
    }

    content() {
        return <div>List of users who likes this post</div>;
    }

    onClose() {
        this.props.onClose(constants.POST_LIKES);
    }

    render() {

        return (
            <EmModal
                 isOpen={this.props.isOpen}
                 onClose={this.onClose}
                 className="postLikes"
                 backdrop={true}
                 header={this.header()}
                 content={this.content()}
                 hideButtons={true}/>
        );
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {getPostLikes})(PostLikesModal);