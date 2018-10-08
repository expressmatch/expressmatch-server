import React from 'react';
import { NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <div className="left-content">
                    <a href="/posts">
                        <div className="app-logo">
                            EXPRESS MATCH&nbsp;
                            <i className="fas fa-kiss-wink-heart"></i>
                        </div>
                    </a>
                </div>
                <div className="right-content">
                    <div className="menu-items">
                        <div className="menu-item">
                            <a href="/login">Log in</a>
                        </div>
                        <div className="menu-item">
                            <a href="/signup">Sign up</a>
                        </div>
                        <div className="menu-item">
                            <NavLink to="/createpost">Create new post</NavLink>
                        </div>
                        {/*<div className="menu-item">*/}
                            {/*<a href="#">Messages</a>*/}
                        {/*</div>*/}
                    </div>
                    <div className="profile">
                        <UncontrolledDropdown className="menu-toggle">
                            <DropdownToggle tag="div" className="profile-picture" />
                            <DropdownMenu right>
                                <DropdownItem className="menu-item header" header>Express User</DropdownItem>
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