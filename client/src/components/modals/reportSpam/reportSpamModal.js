import React from 'react';
import EmModal from '../modal';
import {reportSpam} from '../../../actions/postsActions';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';

class ReportSpamModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.reportSpam = this.reportSpam.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    header() {
        return <div>Report Spam</div>;
    }

    content() {
        return <div>Are you sure you want to report post spam and not view it anymore?</div>;
    }

    reportSpam() {
        this.props.onClose();
        this.props.reportSpam(this.props.postId);
    }

    onClose() {
        this.props.onClose(constants.REPORT_SPAM);
    }

    render() {

        return (
            <EmModal isOpen={this.props.isOpen}
                     onClose={this.onClose}
                     className="reportSpam"
                     backdrop={true}
                     header={this.header()}
                     content={this.content()}
                     submit={this.reportSpam}
                     submitButton='Proceed'/>
        );
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {reportSpam})(ReportSpamModal);