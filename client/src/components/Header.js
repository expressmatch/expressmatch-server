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
                            EXPRESS MATCH
                        </div>
                    </a>
                </div>
                <div className="right-content">
                    <div className="menu-items">
                        <div className="menu-item">
                            <NavLink to="/createpost">Create new post</NavLink>
                        </div>
                        {/*<div className="menu-item">*/}
                            {/*<a href="#">Messages</a>*/}
                        {/*</div>*/}
                    </div>
                    <div className="profile">
                        <UncontrolledDropdown className="menu-toggle">
                            <DropdownToggle tag="div" className="profile-picture">
                                <picture>
                                    <source srcset={this.props.user.photo}/>
                                    <img srcset={noReplyImage}/>
                                </picture>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className="menu-item header" header>
                                    {this.props.user.name ? this.props.user.name : this.props.user.email}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag="a" href="/profile" className="menu-item">Profile</DropdownItem>
                                <DropdownItem tag="a" href="/logout" className="menu-item">Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;