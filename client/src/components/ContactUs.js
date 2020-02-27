import React from 'react';

class ContactUs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            charCount: 0,
            wordCount: 0,
            minCharCount: 50
        };
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
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
            e.target.submit();
        }
    }

    onCancel(e){
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

    render() {
        return (
            <div id="contact-us">
                <form action="/api/contactus" method="POST" onReset={this.onReset} onSubmit={this.onSubmit} className="contact-us-form">
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Name</div>
                        </div>
                        <div className="field-value">
                            <input type="text" placeholder={'Enter your name'} required/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>E-mail</div>
                        </div>
                        <div className="field-value">
                            <input type="email" placeholder={'Enter your e-mail id'} required/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Feedback/Comments</div>
                            <div className="sub-text">(Got any suggestions - Tell us)</div>
                        </div>
                        <div className="field-value">
                            <textarea name="content" placeholder={"Enter your valuable feedback to improve this app"} onChange={this.onChange}></textarea>
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
            </div>
        );
    }
}

export default ContactUs;