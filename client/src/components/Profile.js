import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.profile
        };

        this.resetForm = this.resetForm.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
        
        this.handleCurrentCityChange = this.handleCurrentCityChange.bind(this);
        this.handleHomeTownChange = this.handleHomeTownChange.bind(this);
        this.handleCurrentCitySelect = this.handleCurrentCitySelect.bind(this);
        this.handleHomeTownSelect = this.handleHomeTownSelect.bind(this);
        this.handleProfileChange = this.handleProfileChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({...nextProps.profile});
    }

    handleCurrentCityChange(currentCity) {
        this.setState({currentCity});
    }

    handleCurrentCitySelect(currentCity){
        this.setState({currentCity});
    }

    handleHomeTownChange(homeTown) {
        this.setState({homeTown});
    }

    handleHomeTownSelect(homeTown){
        this.setState({homeTown});
    }

    handleProfileChange(event){
        this.setState({
            [event.target.dataset.name]: event.target.value
            }
        );
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
                        <div className="field-label">What is your age?</div>
                        <div className="field-value">
                            <input type="text" data-name="age" value={this.state.age} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is your gender?</div>
                        <div className="field-value">
                            <select data-name="gender" value={this.state.gender} onChange={this.handleProfileChange}>
                                <option>-Select-</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">In which city do you live currently?</div>
                        <div className="field-value">
                            <PlacesAutocomplete
                                value={this.state.currentCity}
                                date-name="currentCity"
                                onChange={this.handleCurrentCityChange}
                                onSelect={this.handleCurrentCitySelect}
                                searchOptions={{ types: ['(cities)'] }}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter city',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
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
                        <div className="field-label">What is your hometown?</div>
                        <div className="field-value">
                            <PlacesAutocomplete
                                value={this.state.homeTown}
                                date-name="homeTown"
                                onChange={this.handleHomeTownChange}
                                onSelect={this.handleHomeTownSelect}
                                searchOptions={{ types: ['(cities)'] }}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter Hometown',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
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
                        <div className="field-label">What is your mother tongue?</div>
                        <div className="field-value">
                            <input type="text" data-name="motherTongue" value={this.state.motherTongue} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">If you wish, enter your caste details</div>
                        <div className="field-value">
                            <input type="text" data-name="caste"  value={this.state.caste} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">If you wish, enter your sub caste details</div>
                        <div className="field-value">
                            <input type="text" data-name="subCaste" value={this.state.subCaste} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">Where do you work?</div>
                        <div className="field-value">
                            <input type="text" data-name="organization" value={this.state.organization} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What is the nature of your job?</div>
                        <div className="field-value">
                            <input type="text" data-name="job" value={this.state.job} onChange={this.handleProfileChange}/>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-label">What are your interests?</div>
                        <div className="field-value">
                            <textarea data-name="interests" value={this.state.interests} disabled></textarea>
                        </div>
                    </div>
                    <div className="em-form-control">
                        <div className="field-value">
                            <input type="reset" onClick={this.resetForm} value="Reset" />
                            <input type="submit" onClick={this.handleSave} value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;