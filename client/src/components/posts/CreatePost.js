import React from 'react';
import { withRouter } from 'react-router-dom';

class CreatePost extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
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
    render() {
        return (
            <div className="create-post">
                <div id="profile">
                    <form onSubmit={this.onSubmit} className="create-post-form">
                        <div className="em-form-control">
                            <div className="field-label">What is your Proposal?</div>
                            <div className="field-value">
                                <textarea name="content"></textarea>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-value">
                                <button>Reset</button>
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(CreatePost);