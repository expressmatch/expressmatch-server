import React from 'react';
import EmModal from '../modal';
import {reportSpam} from '../../../actions/postsActions';
import {connect} from 'react-redux';

class ReportSpamModal extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     isOpen: false
        // };
        // this.toggle = this.toggle.bind(this);
        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.reportSpam = this.reportSpam.bind(this);
    }

    // componentWillReceiveProps(nextProps){
    //     if (nextProps.isOpen !== this.props.isOpen) {
    //         this.setState({
    //             isOpen: nextProps.isOpen
    //         });
    //     }
    // }
    //
    // toggle(){
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    header(){
        return <div>Report Spam</div>;
    }

    content(){
        return <div>Are  you sure you want to report post spam and not view it anymore?</div>;
    }

    reportSpam(){
        this.props.onClose();
        this.props.reportSpam(this.props.postId);
    }

    render() {

        return (
            <EmModal isOpen={this.props.isOpen}
                     toggle={this.props.onClose}
                     className="reportSpam"
                     backdrop={true}
                     header={this.header()}
                     content={this.content()}
                     submit={this.reportSpam}
                     submitButton='Proceed'/>
        );
    }

    componentWillUnmount(){

    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {reportSpam})(ReportSpamModal);