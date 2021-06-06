import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div id="footer">
                <div className="footer-message">
                    <div>Copyright @ 2021 Express To Match, India. All rights reserved.&nbsp;</div>
                    <div><a href="/privacy" target="_blank">Privacy Policy</a> . <a href="/terms" target="_blank">Terms of Use</a></div>
                </div>
            </div>
        );
    }
}

export default Footer;