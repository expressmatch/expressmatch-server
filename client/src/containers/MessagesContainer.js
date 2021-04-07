import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/messagesActions';
import noReplyImage from '../images/no_image_available.svg';

class MessagesContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        document.body.classList.toggle('noscroll', true)
        return (
            <div className="messages-container">
                <div className="left-panel">
                    <div className="header">
                        Badri Sridharan
                    </div>
                    <div className="messages-content">
                        <div className="messages-list">
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                <span className="message-details">
                                    <div className="name">
                                        Aishwarya
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Arav
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Sridharan
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Geetha
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item selected">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Meera Narayanan
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Krithik
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Nethra
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Sowndarya
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Rajesh Iyengar
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        S R Narayanan
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Deepa Sridharan
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                            <div className="message-item">
                                <span className="message-photo">
                                    <picture>
                                        <source srcSet=""/>
                                        <img srcSet={noReplyImage}/>
                                    </picture>
                                </span>
                                    <span className="message-details">
                                    <div className="name">
                                        Last User
                                    </div>
                                    <div className="message-content">chat last line</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="header">
                        <span className="header-photo">
                            <picture>
                                <source srcSet=""/>
                                <img srcSet={noReplyImage}/>
                            </picture>
                        </span>
                        <span className="header-details">
                            <div className="name">
                                Display Name
                            </div>
                            <div className="header-content">Last online 22w ago</div>
                        </span>
                    </div>
                    <div className="content">
                        <div className="chat-date">Feb 26, 2021, 2:17 AM</div>
                        <div className="bubble from-self">
                            <span className="chat-photo">
                                <picture>
                                    <source srcSet=""/>
                                    <img srcSet={noReplyImage}/>
                                </picture>
                            </span>
                            <span className="chat-message">
                                hello
                            </span>
                        </div>
                        <div className="bubble from-other">
                            <span className="chat-photo">
                                <picture>
                                    <source srcSet=""/>
                                    <img srcSet={noReplyImage}/>
                                </picture>
                            </span>
                            <span className="chat-message">
                                how are you?
                            </span>
                        </div>
                        <div className="chat-date">Feb 27, 2021, 2:17 AM</div>
                        <div className="bubble from-other">
                            <span className="chat-photo">
                                <picture>
                                    <source srcSet=""/>
                                    <img srcSet={noReplyImage}/>
                                </picture>
                            </span>
                            <span className="chat-message">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </span>
                        </div>
                        <div className="bubble from-self">
                            <span className="chat-photo">
                                <picture>
                                    <source srcSet=""/>
                                    <img srcSet={noReplyImage}/>
                                </picture>
                            </span>
                            <span className="chat-message">
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </span>
                        </div>
                    </div>
                    <div className="user-input">
                        <textarea className="user-message" placeholder="Enter Message"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

MessagesContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesContainer);
