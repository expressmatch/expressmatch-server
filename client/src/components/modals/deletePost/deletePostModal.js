import React from 'react';
import EmModal from '../modal';
import {deletePost} from '../../../actions/postsActions';
import {connect} from 'react-redux';

class DeletePostModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isOpen !== this.props.isOpen) {
            this.setState({
                isOpen: nextProps.isOpen
            });
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    header(){
        return <div>Delete Post</div>;
    }

    content(){
        return <div>Are  you sure you want to delete this post and all of its comments?</div>;
    }

    delete(){
        this.toggle();
        this.props.deletePost(this.props.postId);
    }

    render() {

        return (
            <EmModal isOpen={this.state.isOpen}
                     toggle={this.toggle}
                     className="deletePost"
                     backdrop={true}
                     header={this.header()}
                     content={this.content()}
                     submit={this.delete}/>
        );
    }

    componentWillUnmount(){
        this.setState({
            isOpen: false
        });
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {deletePost})(DeletePostModal);