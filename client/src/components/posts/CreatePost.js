import React from 'react';
import {withRouter} from 'react-router-dom';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: '',
            charCount: 0,
            wordCount: 0,
            minCharCount: 300
        };
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onReset(e) {
        e.target.reset();

        this.setState({
            post: '',
            charCount: 0,
            wordCount: 0
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.charCount >= this.state.minCharCount) {

            let data = {
                content: this.state.post.trim()
            };
            this.props.actions.createPost(data).then(() => {
                this.props.actions.uiDateFilter(new Date());
                this.props.history.push('/posts');
            });
        }

    }

    onCancel(e){
        this.props.history.push('/posts');
    }

    onChange(e) {
        this.setState({
            post: e.currentTarget.value,
            charCount: e.currentTarget.value.trim().length,
            wordCount: e.currentTarget.value.trim().replace(/\s\s+/g, ' ').split(' ').length
        })
    };

    componentWillUnmount() {
        this.setState({
            post: '',
            charCount: 0,
            wordCount: 0
        });
    }

    render() {
        return (
            <div id="create-post">
                <form onReset={this.onReset} onSubmit={this.onSubmit} className="create-post-form">
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Express yourself</div>
                            <div className="sub-text">(be creative to find your match)</div>
                        </div>
                        <div className="field-value">
                            <textarea name="content" onChange={this.onChange}></textarea>
                            {this.state.charCount < this.state.minCharCount &&
                            <div className="sub-text">
                                Enter at least {this.state.minCharCount - this.state.charCount} more characters
                            </div>}
                            {this.state.charCount >= this.state.minCharCount &&
                            <div className="sub-text">
                                {this.state.wordCount} {this.state.wordCount > 1 ? ' words' : ' word'} used
                            </div>}
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-value">
                            <input type="reset" disabled={!this.state.post.length} value="Reset"/>
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

export default withRouter(CreatePost);