import React from 'react';
import QuickFilter from '../components/posts/filters/QuickFilter';
import {withRouter} from 'react-router-dom';

class Preference extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props.preference,
            modified: false
        };
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.handleCurrentCityChange = this.handleCurrentCityChange.bind(this);
        this.handleCasteChange = this.handleCasteChange.bind(this);
        this.handleMotherTongueChange = this.handleMotherTongueChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({...nextProps.preference});
    }

    onReset(e) {
        e.preventDefault();
        this.setState({
            ...this.props.preference,
            modified: false
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.validateForm().then(() => {
            this.props.actions.savePreference(this.state).then(() => {
                this.setState({
                    modified: false
                });
                this.props.history.push('/posts');
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    onCancel(e){
        this.props.history.push('/posts');
    }

    validateForm() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    handleCurrentCityChange(e) {
        const { checked } = e.target;
        this.setState({currentCity: checked, modified: true});
    }

    handleCasteChange(e) {
        const { checked } = e.target;
        this.setState({caste: checked, modified: true});
    }

    handleMotherTongueChange(e) {
        const { checked } = e.target;
        this.setState({motherTongue: checked, modified: true});
    }


    componentWillUnmount() {
        //Reset state
    }

    render() {
        return (
            <div id="preference">
                <div className="page-header">Preferences</div>
                <div className="page-content">
                    <form onReset={this.onReset} onSubmit={this.onSubmit} className="create-post-form">
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>Same City Search</div>
                                <div className="sub-text">
                                    See posts from users who live in your city
                                </div>
                            </div>
                            <div className="field-value center">
                                <input type="checkbox"
                                       checked={this.state.currentCity}
                                       onChange={this.handleCurrentCityChange}/>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>Same Caste Search</div>
                                <div className="sub-text">
                                    See posts from users who are from the same caste as you
                                </div>
                            </div>
                            <div className="field-value  center">
                                <input type="checkbox"
                                       checked={this.state.caste}
                                       onChange={this.handleCasteChange}/>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-label">
                                <div>Same Mother Tongue Search</div>
                                <div className="sub-text">
                                    See posts from users who speak the same language as you
                                </div>
                            </div>
                            <div className="field-value center">
                                <input type="checkbox"
                                       checked={this.state.motherTongue}
                                       onChange={this.handleMotherTongueChange}/>
                            </div>
                        </div>
                        <div className="em-form-control">
                            <div className="field-value">
                                <input type="reset" disabled={!this.state.modified} value="Reset"/>
                                <input type="submit" disabled={!this.state.modified}
                                       value="Submit"/>
                                <input type="button" className="cancel" value="Cancel" onClick={this.onCancel}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Preference);