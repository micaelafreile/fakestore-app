import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, onClose, message }) {
  const handleYes = () => onClose(true);
  const handleNo = () => onClose(false);

  return (
    <Modal show={show} onHide={handleNo} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || 'Are you sure?'}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleNo}>
          No
        </Button>
        <Button variant="primary" onClick={handleYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
