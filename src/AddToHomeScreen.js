import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const AddToHomeScreen = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const isIos = () => {
          const userAgent = window.navigator.userAgent.toLowerCase();
          return /iphone|ipad|ipod/.test(userAgent);
        };
    
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    
        if (isIos() && !isInStandaloneMode()) {
          setShowModal(true);
        }
      }, []);
    
      const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add to Home Screen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To install this app on your home screen, tap the Share button below and then choose "Add to Home Screen".</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddToHomeScreen