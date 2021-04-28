import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Typeahead} from 'react-bootstrap-typeahead';
import Languages from '../api/languageApi';
import DatePicker from "react-datepicker";
import Spinner from './common/Spinner';
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import noImageAvailable from '../images/no_image_available.svg';
import * as constants from '../constants/constants';
import UploadPhotoModal from '../components/modals/profile/uploadPhotoModal';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.profile,
            modal: {
                [constants.UPLOAD_PHOTO]: false
            }
        };

        this.resetForm = this.resetForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

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
        this.setState({
            ...this.props.profile
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.validateForm().then(() => {
            this.props.actions.updateProfile(this.state).then(() => {
                this.props.history.push('/profile');
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    onCancel(e){
        this.props.history.push('/profile');
    }

    validateForm() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    changeDisplay(e){
        let target = e.currentTarget,
            type = target.dataset['type'];

        this.toggleModal(type);
    }

    toggleModal(type) {

        this.setState({
            modal: {
                [type]: !this.state.modal[type]
            }
        });
    }

    render() {
        return (
            <div id="profile" className={this.props.readonly ? "readonly" : ""} >
                <div className="page-header">{this.props.readonly ? "Profile" : "Edit Profile"}</div>
                <div className="page-content">
                    <Spinner loading={this.state.loading}/>
                    <div className="left-content">
                        <div className="display-pic">
                            <picture>
                                <source srcSet={this.state.photo}/>
                                <img srcSet={noImageAvailable}/>
                            </picture>
                            {!this.props.otherProfile && <div className="change-pic">
                                <span className="action-item" data-type={constants.UPLOAD_PHOTO} onClick={this.changeDisplay}>
                                    Change Display Image
                                </span>
                            </div>}
                        </div>
                        {/*{this.props.otherProfile &&*/}
                        {/*<button className="send-interest">Send Interest</button>}*/}
                    </div>
                    <div className="right-content">
                        <form spellCheck="false">
                            <div className="em-form-control">
                                <div className="field-label">
                                    <div>About me</div>
                                    <div className="sub-text">
                                        introduce yourself, in 200 words or less
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
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
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
                                                                key={suggestion.placeId}>
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
                                                                key={suggestion.placeId}>
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
                                        id="motherToungue"
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
                                <div className="field-label">Organization</div>
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
                            {/*<div className="em-form-control">*/}
                            {/*<div className="field-label">*/}
                            {/*<div>Interests</div>*/}
                            {/*<div className="sub-text">*/}
                            {/*(choose up to 10 interests)*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="field-value">*/}
                            {/*<textarea data-name="interests" value={this.state.interests} disabled></textarea>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {!this.props.otherProfile && this.props.readonly && <div className="em-form-control">
                                <div className="field-value">
                                    <NavLink to="/editprofile" className="edit-profile">
                                        <button>Edit Profile</button>
                                    </NavLink>
                                </div>
                            </div>}
                            {!this.props.otherProfile && !this.props.readonly && <div className="em-form-control">
                                <div className="field-value">
                                    <input type="reset" onClick={this.resetForm} value="Reset"/>
                                    <input type="submit" onClick={this.onSubmit} value="Submit"/>
                                    <input type="button" onClick={this.onCancel} value="Cancel" />
                                </div>
                            </div>}
                        </form>
                    </div>
                    <UploadPhotoModal
                        photo={this.state.photo}
                        isOpen={this.state.modal[constants.UPLOAD_PHOTO]}
                        onClose={this.toggleModal}
                        uploadPhoto={this.props.actions.uploadPhoto}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);