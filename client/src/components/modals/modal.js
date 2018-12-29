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
                toggle={this.props.toggle}
                className={this.props.className}
                backdrop={this.props.backDrop}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.header}
                </ModalHeader>
                <ModalBody>
                    {this.props.content}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.submit}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EmModal;