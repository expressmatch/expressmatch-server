import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div id="footer">
                <div className="footer-message">
                    Copyright @ 2021 Express To Match, India. All rights reserved.&nbsp;
                    <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms of Use</a>
                </div>
            </div>
        );
    }
}

export default Footer;