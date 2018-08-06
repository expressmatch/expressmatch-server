import React from 'react';

class CreatePost extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        console.log('Form Submitted');
        e.preventDefault();

    }
    render() {
        return (
            <div className="create-post">
                <form onSubmit={this.onSubmit}>
                    Create Post
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CreatePost;