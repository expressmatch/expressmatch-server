import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Typeahead} from 'react-bootstrap-typeahead';
import Languages from '../api/languageApi';
import DatePicker from "react-datepicker";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.profile,
        };

        this.resetForm = this.resetForm.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.handleCurrentCityChange = this.handleCurrentCityChange.bind(this);
        this.handleHomeTownChange = this.handleHomeTownChange.bind(this);
        this.handleCurrentCitySelect = this.handleCurrentCitySelect.bind(this);
        this.handleHomeTownSelect = this.handleHomeTownSelect.bind(this);
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.handleDOBSelect = this.handleDOBSelect.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps.profile});
    }

    handleCurrentCityChange(currentCity) {
        this.setState({currentCity});
    }

    handleCurrentCitySelect(currentCity) {
        this.setState({currentCity});
    }

    handleHomeTownChange(homeTown) {
        this.setState({homeTown});
    }

    handleHomeTownSelect(homeTown) {
        this.setState({homeTown});
    }

    handleProfileChange(event) {
        this.setState({
                [event.target.dataset.name]: event.target.value
            }
        );
    }

    handleDOBChange(date) {
        this.setState({
            dob: date
        });
    }

    handleDOBSelect() {

    }

    handleLanguageChange(e) {
        if (e.length) {
            this.setState({
                motherTongue: e[0]
            });
        }
    }

    resetForm(e) {
        e.preventDefault();
        alert('reset');

    }

    handleSave(e) {
        e.preventDefault();

        this.validateForm().then(() => {
            this.props.actions.updateProfile(this.state);
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
                        <div className="field-label">
                            <div>About me</div>
                            <div className="sub-text">
                                introduce yourself, for your friends, in 200 words
                            </div>
                        </div>
                        <div className="field-value">
                            <textarea
                                maxLength="200"
                                data-name="about"
                                value={this.state.about}
                                onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Birthday</div>
                        <div className="field-value">
                            <DatePicker
                                data-name="age"
                                selected={this.state.dob}
                                onSelect={this.handleDOBSelect}
                                onChange={this.handleDOBChange}
                            />
                            {/*<input type="text" data-name="age" value={this.state.age} onChange={this.handleProfileChange}/>*/}
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Gender</div>
                        <div className="field-value">
                            <select data-name="gender" value={this.state.gender} onChange={this.handleProfileChange}>
                                <option>-Select-</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Current City</div>
                        <div className="field-value">
                            <PlacesAutocomplete
                                value={this.state.currentCity}
                                date-name="currentCity"
                                onChange={this.handleCurrentCityChange}
                                onSelect={this.handleCurrentCitySelect}
                                searchOptions={{types: ['(cities)']}}>
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter city',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div className="suggestion-item">Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = 'suggestion-item '.concat(suggestion.active ? 'active' : '');
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Hometown</div>
                        <div className="field-value">
                            <PlacesAutocomplete
                                value={this.state.homeTown}
                                date-name="homeTown"
                                onChange={this.handleHomeTownChange}
                                onSelect={this.handleHomeTownSelect}
                                searchOptions={{types: ['(cities)']}}>
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter Hometown',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div className="suggestion-item">Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = 'suggestion-item '.concat(suggestion.active ? 'active' : '');
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Mother tongue</div>
                        <div className="field-value">
                            {/*<input type="text" data-name="motherTongue" value={this.state.motherTongue}*/}
                            {/*onChange={this.handleProfileChange}/>*/}
                            <Typeahead
                                data-name="motherTongue"
                                options={Languages}
                                selected={[this.state.motherTongue]}
                                onChange={this.handleLanguageChange}
                                placeholder="Enter your native spoken language"
                            />
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Caste details</div>
                            <div className="sub-text">
                                for caste matches, enter this value
                            </div>
                        </div>
                        <div className="field-value">
                            <input type="text" data-name="caste" value={this.state.caste}
                                   onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Sub-caste details</div>
                            <div className="sub-text">
                                for sub-caste matches, enter this value
                            </div>
                        </div>
                        <div className="field-value">
                            <input type="text" data-name="subCaste" value={this.state.subCaste}
                                   onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Where do you work?</div>
                        <div className="field-value">
                            <input type="text" data-name="organization" value={this.state.organization}
                                   onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Nature of your job</div>
                        <div className="field-value">
                            <input type="text" data-name="job" value={this.state.job}
                                   onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">
                            <div>Interests</div>
                            <div className="sub-text">
                                (choose up to 10 interests)
                            </div>
                        </div>
                        <div className="field-value">
                            <textarea data-name="interests" value={this.state.interests} disabled></textarea>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-value">
                            <input type="reset" onClick={this.resetForm} value="Reset"/>
                            <input type="submit" onClick={this.handleSave} value="Submit"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;