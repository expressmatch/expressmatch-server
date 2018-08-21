import React from 'react';

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(e){
        e.preventDefault();

    }
    render() {
        return (
            <div id="profile">
                <form>
                    <div className="form-control">
                        <div className="field-label">What is your age?</div>
                        <div className="field-value">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="field-label">What is your gender?</div>
                        <div className="field-value">
                            <select>
                                <option>-Select-</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="field-label">In which city do you live currently?</div>
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
                            <input type="text" disabled value="Hello" />
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
                            <button>Reset</button>
                            <button onClick={this.handleSave}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;