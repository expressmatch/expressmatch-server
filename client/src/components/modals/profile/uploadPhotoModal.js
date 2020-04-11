import React from 'react';
import EmModal from '../modal';
import * as constants from '../../../constants/constants';
// import {connect} from 'react-redux';
import noImageAvailable from '../../../images/no_image_available.svg';

class UploadPhotoModal extends React.Component {

    constructor(props) {
        super(props);

        this.header = this.header.bind(this);
        this.content = this.content.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            dataRequested: false,
            selectedFile: null
        }
    }

    componentWillReceiveProps(nextProps) {

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
                        <form action="/api/uploadphoto"
                              method="POST"
                              encType="multipart/form-data"
                              onSubmit={this.onSubmit}>
                            <div className="action-item new-photo">
                                <input type="file"
                                       name="picture"
                                       onChange={this.onFileChange}
                                       accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/>
                            </div>
                            <input type="submit" value="Upload"/>
                        </form>
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

    onFileChange(e) {
        let file = e.target.files[0],
            size = Math.round((file.size / 1024));

        if (size >= 256) {
            alert("File too Big, please select a file less than 256KB");
            return;
        }
        this.setState({
            selectedFile: file
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.selectedFile) {
            const data = new FormData();
            data.append('picture', this.state.selectedFile);

            this.props.uploadPhoto(data).then(() => {
                this.props.onClose(constants.UPLOAD_PHOTO);
            });
        }
    }
}

export default UploadPhotoModal;

// const mapStateToProps = (state) => ({});
// export default connect(mapStateToProps, {})(UploadPhotoModal);