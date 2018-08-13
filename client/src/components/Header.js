import React from 'react';
import { NavLink } from 'react-router-dom';

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
                            <a href="/login">Log in</a>
                        </div>
                        <div className="menu-item">
                            <a href="/signup">Sign up</a>
                        </div>
                        <div className="menu-item">
                            <NavLink to="/createpost">Create new post</NavLink>
                        </div>
                        <div className="menu-item">
                            <a href="#">Messages</a>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="profile-picture"/>
                        <a href="/profile1">Profile</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;