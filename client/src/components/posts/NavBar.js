import React from 'react';
import noReplyImage from '../../images/no_image_available.svg';
import {userContext} from '../../context/userContext';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="nav-bar-content">
                <ul className="nav-list">
                    <li className="nav-item selected">
                        <a href="/profile" className="nav-link-item">
                            <userContext.Consumer>
                                {user => (
                                    <React.Fragment>
                                        <div className="user-photo logo">
                                            <picture>
                                                <source srcSet={user.photo}/>
                                                <img srcSet={noReplyImage}/>
                                            </picture>
                                        </div>
                                        <div className="name">{user.name ? user.name : user.email}</div>
                                    </React.Fragment>
                                )}
                            </userContext.Consumer>
                        </a>
                    </li>
                    <li className="nav-item selected">
                        <a href="/preference" className="nav-link-item">
                            <div className="logo">
                                <i className="fas fa-user-cog"></i>
                            </div>
                            <div className="name">Match Preference</div>
                        </a>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*<a href="#" className="nav-link-item">*/}
                    {/*<div className="logo">*/}
                    {/*<i className="fas fa-thumbtack"></i>*/}
                    {/*</div>*/}
                    {/*<div className="name">My Posts</div>*/}
                    {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*<a href="#" className="nav-link-item">*/}
                    {/*<div className="logo">*/}
                    {/*<i className="fas fa-bookmark"></i>*/}
                    {/*</div>*/}
                    {/*<div className="name">Favourites</div>*/}
                    {/*</a>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <a href="/privacy" className="nav-link-item">
                            <div className="logo">
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <div className="name">Privacy Policy</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/terms" className="nav-link-item">
                            <div className="logo">
                                <i className="fas fa-gavel"></i>
                            </div>
                            <div className="name">Terms of use</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/contactus" className="nav-link-item">
                            <div className="logo">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="name">Contact</div>
                        </a>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*<a href="#" className="nav-link-item">*/}
                    {/*<div className="logo">*/}
                    {/*<i className="far fa-question-circle"></i>*/}
                    {/*</div>*/}
                    {/*<div className="name">FAQ</div>*/}
                    {/*</a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
