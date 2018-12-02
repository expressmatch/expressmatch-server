import React from 'react';
import { withRouter } from 'react-router-dom';

class CreatePost extends React.Component {

    constructor(props){
        super(props);

        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onReset(e){
        e.target.reset();
    }

    onSubmit(e){
        e.preventDefault();

        //FIXME
        let data = {
            content: e.target.querySelector('textarea[name=\'content\']').value
        };
        this.props.actions.createPost(data).then(()=>{
            this.props.history.push('/posts');
        });
    }
    onChange(e){

    }
    // componentWillUnmount(){
    //     this.setState({
    //         remainingCharCount: this.state.maxLimit
    //     });
    // }
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
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-value">
                            <input type="reset" value="Reset" />
                            <input type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(CreatePost);