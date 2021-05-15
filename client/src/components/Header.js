import React from 'react';
import { NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import noReplyImage from '../images/no_image_available.svg';
import {userContext} from '../context/userContext';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.showNotifications = this.showNotifications.bind(this);
    }

    render() {
        return (
            <div id="header">
                <div className="left-content">
                    <a href="/posts">
                        <div className="app-logo">
                            <i className="fas fa-link"></i>
                            <span className="app-name">EXPRESS TO MATCH</span>
                        </div>
                    </a>
                </div>
                <div className="right-content">
                    <div className="menu-items">
                        <div className="menu-item">
                            <NavLink to="/createpost">New Post</NavLink>
                        </div>
                        {/*<div className="menu-item">*/}
                            {/*<NavLink to="#" onClick={this.showNotifications}>Notifications</NavLink>*/}
                        {/*</div>*/}
                        {/*<div className="menu-item">*/}
                            {/*<NavLink to="/messages">Messages</NavLink>*/}
                        {/*</div>*/}
                        {/*<div className="menu-item">*/}
                            {/*<NavLink to="/contactus">C</NavLink>*/}
                        {/*</div>*/}
                    </div>
                    <div className="profile">
                        <userContext.Consumer>
                        {user => (
                            <UncontrolledDropdown className="menu-toggle">
                                <DropdownToggle tag="div" className="profile-picture">
                                    <picture>
                                        <source srcSet={user.photo}/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" href="/profile" className="menu-item header">
                                        <span className="item-text">
                                            <div className="main-text">{user.name ? user.name : user.email}</div>
                                            <div className="sub-text">See your profile</div>
                                        </span>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag="a" href="/preference" className="menu-item">
                                        <i className="fas fa-user-cog"></i>
                                        <span className="item-text">
                                            <div className="main-text">Preference</div>
                                            <div className="sub-text">Set your post feed preference</div>
                                        </span>
                                    </DropdownItem>
                                    <DropdownItem tag="a" href="/contactus" className="menu-item">
                                        <i className="fas fa-envelope"></i>
                                        <span className="item-text">
                                            <div className="main-text">Give Feedback</div>
                                            <div className="sub-text">Help us improve the experience</div>
                                        </span>
                                    </DropdownItem>
                                    <DropdownItem tag="a" href="/logout" className="menu-item">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span className="item-text">Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                        </userContext.Consumer>
                    </div>
                </div>
            </div>
        );
    }

    showNotifications(e) {
        alert('Notifications');
    }
}

export default Header;