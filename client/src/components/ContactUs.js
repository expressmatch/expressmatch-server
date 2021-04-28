import React from 'react';
import EmModal from '../components/modals/modal';
import * as constants from '../constants/constants';
import ContactService from '../services/ContactService';

class ContactUs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            charCount: 0,
            wordCount: 0,
            minCharCount: 50,
            modal: {
                [constants.SUGGESTION_RECEIVED]: false
            }
        };
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.messageHeader = this.messageHeader.bind(this);
        this.messageContent = this.messageContent.bind(this);
        this.onMessageClose = this.onMessageClose.bind(this);
    }

    onReset(e) {
        e.target.reset();

        this.setState({
            content: '',
            charCount: 0,
            wordCount: 0
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.charCount >= this.state.minCharCount) {

            const data = new FormData(e.target);

            ContactService.contactUs(data).then(() => {
                this.setState({
                    modal: {
                        [constants.SUGGESTION_RECEIVED]: true
                    }
                });
            });
        }
    }

    onCancel(e) {
        this.props.history.push('/posts');
    }

    onChange(e) {
        this.setState({
            content: e.currentTarget.value,
            charCount: e.currentTarget.value.trim().length,
            wordCount: e.currentTarget.value.trim().replace(/\s\s+/g, ' ').split(' ').length
        })
    };

    componentWillUnmount() {
        this.setState({
            content: '',
            charCount: 0,
            wordCount: 0
        });
    }

    messageHeader() {
        return <div>Thank You!</div>
    }
    messageContent() {
        return <div>Your suggestion has been received.</div>
    }
    onMessageClose() {
        this.setState({
            modal: {
                [constants.SUGGESTION_RECEIVED]: false
            }
        });
        this.props.history.push('/posts');
    }

    render() {
        return (
            <div id="contact-us">
                <div className="page-header">Contact Us</div>
                <div className="page-content">
                    <form onReset={this.onReset} onSubmit={this.onSubmit}
                          className="contact-us-form">
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>Name</div>
                            </div>
                            <div className="field-value">
                                <input type="text" name="name" placeholder={'Enter your name'} required/>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>E-mail</div>
                            </div>
                            <div className="field-value">
                                <input type="email" name="email" placeholder={'Enter your e-mail id'} required/>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>Feedback</div>
                                <div className="sub-text">Got any suggestions for us?</div>
                            </div>
                            <div className="field-value">
                                <textarea name="content" placeholder={"Enter your valuable feedback or concern to improve this app"}
                                          onChange={this.onChange}></textarea>
                                {this.state.charCount < this.state.minCharCount &&
                                <div className="sub-text">
                                    Enter at least {this.state.minCharCount - this.state.charCount} more characters
                                </div>}
                                {this.state.charCount >= this.state.minCharCount &&
                                <div className="sub-text">
                                    &nbsp;
                                </div>}
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-value">
                                <input type="reset" disabled={!this.state.content.length} value="Reset"/>
                                <input type="submit" disabled={this.state.charCount < this.state.minCharCount}
                                       value="Submit"/>
                                <input type="button" className="cancel" value="Cancel" onClick={this.onCancel}/>
                            </div>
                        </div>
                    </form>
                    <EmModal isOpen={this.state.modal[constants.SUGGESTION_RECEIVED]}
                         onClose={this.onMessageClose}
                         className="suggestion-received"
                         backdrop={true}
                         header={this.messageHeader()}
                         content={this.messageContent()}
                         submit={this.onMessageClose}
                         hideCancelButton={true}
                         submitButton='OK'/>
                </div>
            </div>
        );
    }
}

export default ContactUs;