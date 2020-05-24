import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div id="footer">
                <div className="footer-message">
                     Copyright @ 2020 Express To Match, India. All rights reserved.
                    <a href="/privacy">Privacy Policy</a> & <a href="/terms">Terms of Use</a>
                </div>
            </div>
        );
    }
}

export default Footer;