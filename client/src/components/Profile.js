import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.resetForm = this.resetForm.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }


    resetForm(e) {
        e.preventDefault();
        alert('reset');
    }

    handleSave(e) {
        e.preventDefault();
        let formData = new FormData(document.querySelector('form')[0]);

        this.validateForm().then(() => {
            this.props.actions.updateProfile(formData);
        }).catch((e) => {
            console.log(e);
        });
    }

    validateForm() {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
    }

    render() {
        return (
            <div id="profile">
                <form>
                    <div className="em-form-control">
                        <div className="field-label">What is your age?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.age}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is your gender?</div>
                        <div className="field-value">
                            <select defaultValue={this.props.profile.gender}>
                                <option>-Select-</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">In which city do you live currently?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.currentCity}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is your hometown?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.homeTown}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is your mother tongue?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.motherTongue}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Do you want to enter caste details?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.caste}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Do you want to enter sub caste details?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.subCaste}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Where do you work?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.organization}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is the nature of your job?</div>
                        <div className="field-value">
                            <input type="text" defaultValue={this.props.profile.job}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What are your interests?</div>
                        <div className="field-value">
                            <textarea defaultValue={this.props.profile.interests}></textarea>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-value">
                            <button onClick={this.resetForm}>Reset</button>
                            <button onClick={this.handleSave}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;