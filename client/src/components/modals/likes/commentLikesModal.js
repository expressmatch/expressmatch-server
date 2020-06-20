import React from 'react';
import EmModal from '../modal';
import {getCommentLikes} from '../../../actions/commentsActions';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';
import noReplyImage from '../../../images/no_image_available.svg';

class CommentLikesModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            dataRequested: false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isOpen === true
            && nextProps.commentId === this.props.commentId
            && !this.state.dataRequested){

            this.props.getCommentLikes(this.props.commentId);
            this.setState({
                dataRequested: true
            })
        }
        if(nextProps.isOpen === false){
            this.setState({
                dataRequested: false
            })
        }
    }

    header() {
        return <div>Likes</div>;
    }

    content() {
        return (
            <div className="likes-container">
                {this.props.loading && <div>Loading...</div>}
                {!this.props.loading && this.props.comments.byId[this.props.commentId] &&
                    this.props.comments.byId[this.props.commentId].likedBy &&
                    this.props.comments.byId[this.props.commentId].likedBy.length ?
                    (
                        this.props.comments.byId[this.props.commentId].likedBy.map((value) => {
                            return (
                                <div className="profile" key={value._id}>
                                    <div className="display-pic">
                                        <picture>
                                            <source srcSet={value.profile.photo}/>
                                            <img srcSet={noReplyImage}/>
                                        </picture>
                                    </div>
                                    <div className="display-name">
                                        <a target="_blank" href={`/profile/` + value._id}>{value.profile.name}</a>
                                    </div>
                                </div>
                            );
                        })
                    ): !this.props.loading && <div>No Likes yet. Be the first one to like it.</div>
                }
            </div>
        )
    }

    onClose() {
        this.props.onClose(constants.COMMENT_LIKES);
    }

    render() {
        return (
            <EmModal
                isOpen={this.props.isOpen}
                onClose={this.onClose}
                className="commentLikes"
                backdrop={true}
                header={this.header()}
                content={this.content()}
                hideButtons={true}/>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments || []
});
export default connect(mapStateToProps, {getCommentLikes})(CommentLikesModal);