import React from 'react';

class CreatePost extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        console.log('Form Submitted');
        //e.preventDefault();

    }
    render() {
        return (
            <div className="create-post">
                <div id="profile">
                    <form method="POST" onSubmit={this.onSubmit} className="create-post-form" action="/post/create">
                        <div className="form-control">
                            <div className="field-label">What is your Proposal?</div>
                            <div className="field-value">
                                <textarea name="content"></textarea>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-value">
                                <button>Reset</button>
                                <button onClick={this.handleSave}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreatePost;