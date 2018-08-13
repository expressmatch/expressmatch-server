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
                <div id="profile">
                    <form>
                        <div className="form-control">
                            <div className="field-label">What is your age?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">In which city do you live?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">What is your hometown?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">What is your mother tongue?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">Do you want to enter caste details?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">Do you want to enter sub caste details?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">Where do you work?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">What is the nature of your job?</div>
                            <div className="field-value">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-label">What are your interests?</div>
                            <div className="field-value">
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="field-value">
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