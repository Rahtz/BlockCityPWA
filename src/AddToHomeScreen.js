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

      const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: "Block City",
            text: "Install this app on your home screen",
            url: window.location.href
          });
        }
      };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add to Home Screen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-4">To install this app on your home screen, tap the Share button below and then choose "Add to Home Screen".</p>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L11 6.414V16a1 1 0 1 1-2 0V6.414l-4.293 4.293a1 1 0 1 1-1.414-1.414l5-5z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-lg font-medium">Add to Home Screen</p>
              <p className="text-sm text-gray-600">Tap the Share button and then choose "Add to Home Screen".</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleShare}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddToHomeScreen