import React from 'react';
import { NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import noReplyImage from '../images/no_image_available.svg';

class Header extends React.Component {

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
                            <NavLink to="/createpost">Create new post</NavLink>
                        </div>
                        <div className="menu-item">
                            <NavLink to="/contactus">Contact us</NavLink>
                        </div>
                        {/*<div className="menu-item">*/}
                            {/*<a href="#">Messages</a>*/}
                        {/*</div>*/}
                    </div>
                    <div className="profile">
                        <UncontrolledDropdown className="menu-toggle">
                            <DropdownToggle tag="div" className="profile-picture">
                                <picture>
                                    <source srcSet={this.props.user.photo}/>
                                    <img srcSet={noReplyImage}/>
                                </picture>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className="menu-item header" header>
                                    {this.props.user.name ? this.props.user.name : this.props.user.email}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag="a" href="/profile" className="menu-item">
                                    <i className="far fa-user-circle"></i>
                                    <span className="item-text">Profile</span>
                                </DropdownItem>
                                <DropdownItem tag="a" href="/logout" className="menu-item">
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span className="item-text">Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;