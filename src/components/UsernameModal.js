import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Button } from "reactstrap";
import Loader from "./Loader";

const UsernameModal = (props) => {
    return (
        <Modal isOpen={props.showModal} autoFocus={true} keyboard={false} backdrop="static">
            <ModalHeader>Welcome to CyberCoin</ModalHeader>
            <ModalBody>
                <label htmlFor="userEntry">Enter a username:&nbsp;</label>
                <input type="text" id="userEntry" className="mono-font" />
                <Alert className="mb-0 mt-2" color="danger" isOpen={props.showAlert} toggle={props.closeAlert}>
                    {props.alertMessage}
                </Alert>
            </ModalBody>
            <ModalFooter>
                {props.showLoader ? (
                    <Loader />
                ) : (
                    <Button color="success" onClick={props.saveUser}>
                        Save and Start
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );
};

export default UsernameModal;
