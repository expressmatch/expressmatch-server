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

        this.state = {
            dataRequested: false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isOpen === true
            && nextProps.postId === this.props.postId
            && !this.state.dataRequested){

            this.props.getPostLikes(this.props.postId);
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
                {this.props.posts.byId[this.props.postId].likedBy && this.props.posts.byId[this.props.postId].likedBy.length ?
                    (
                        this.props.posts.byId[this.props.postId].likedBy.map((value) => {
                            return (
                                <div className="profile" key={value._id}>
                                    <div className="display-pic">
                                        <img src={value.profile.photo}/>
                                    </div>
                                    <div className="display-name">
                                        <a target="_blank" href={`/profile/` + value._id}>{value.profile.name}</a>
                                    </div>
                                </div>
                            );
                        })
                    ): null
                }
            </div>
        )
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

const mapStateToProps = (state) => ({
    posts: state.posts.entities.posts || []
});
export default connect(mapStateToProps, {getPostLikes})(PostLikesModal);