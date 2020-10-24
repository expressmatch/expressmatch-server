import React from 'react';
import {withRouter} from 'react-router-dom';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: '',
            charCount: 0,
            minCharCount: 300,
            bestCharCount: 500
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
            charCount: 0
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
            charCount: e.currentTarget.value.trim().length
        })
    };

    componentWillUnmount() {
        this.setState({
            post: '',
            charCount: 0
        });
    }

    render() {
        return (
            <div id="create-post">
                <form onReset={this.onReset} onSubmit={this.onSubmit} className="create-post-form">
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Express yourself. <br/>Be creative with <span className="ellipsis">Words</span></div>
                            <div>&nbsp;</div>
                            <div className="sub-text">
                                You can include details like:
                                <ul>
                                    <li>- General bio</li>
                                    <li>- Interests and Hobbies</li>
                                    <li>- Career area</li>
                                    <li>- What are you looking for?</li>
                                    <li>- Expectations from partner, etc.</li>
                                </ul>
                                <br/>
                                <div>Caution: <br/>Do not share contact information.</div>
                            </div>
                        </div>
                        <div className="field-value">
                            <textarea name="content" onChange={this.onChange}></textarea>
                            {this.state.charCount < this.state.minCharCount &&
                            <div className="sub-text">
                                <span style={{color: '#ff5e3a', fontWeight: 'bold'}}>POOR</span> - Write to impress.
                            </div>}
                            {this.state.charCount >= this.state.minCharCount &&
                             this.state.charCount < this.state.bestCharCount &&
                            <div className="sub-text">
                                <span style={{color: '#ffff00', fontWeight: 'bold'}}>AVERAGE</span> - Sufficient, but you can do add more information.
                            </div>}
                            {this.state.charCount >= this.state.bestCharCount &&
                            <div className="sub-text">
                                <span style={{color: '#50c878', fontWeight: 'bold'}}>GOOD</span> - Good work.
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