import React from 'react';
import EmModal from '../modal';
import * as constants from '../../../constants/constants';
import {connect} from 'react-redux';
import noImageAvailable from '../../../images/no_image_available.svg';

class UploadPhotoModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            dataRequested: false
        }
    }
    componentWillReceiveProps(nextProps){

    }

    header() {
        return <div>Set a profile photo</div>;
    }

    content() {
        return (
            <div className="upload-photo-container">
                <div className="left-content">
                    <div className="display-pic">
                        <picture>
                            <source srcSet={this.props.photo}/>
                            <img srcSet={noImageAvailable}/>
                        </picture>
                    </div>
                </div>
                <div className="right-content">
                    <div className="actions">
                        {/*<div className="action-item fb-photo">*/}
                            {/*<button>Use my Facebook Photo</button>*/}
                        {/*</div>*/}
                        <div className="action-item new-photo">
                            <button>Upload a new Photo</button>
                        </div>
                        <div className="action-item no-photo">
                            <button>Don't show a photo</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onClose() {
        this.props.onClose(constants.UPLOAD_PHOTO);
    }

    render() {
        return (
            <EmModal
                isOpen={this.props.isOpen}
                onClose={this.onClose}
                className="uploadPhoto"
                backdrop={true}
                header={this.header()}
                content={this.content()}
                hideButtons={true}/>
        );
    }
}

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, {})(UploadPhotoModal);