import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EmModal extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.onClose}
                className={this.props.className}
                backdrop={this.props.backDrop}>
                <ModalHeader toggle={this.props.onClose}>
                    {this.props.header}
                </ModalHeader>
                <ModalBody>
                    {this.props.content}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.submit}>{this.props.submitButton || 'Ok'}</Button>{' '}
                    <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EmModal;