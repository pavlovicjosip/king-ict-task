import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KingModal = ({ title, description, image, show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img src={image} alt={title} className="img-fluid mb-3" />
				<p>{description}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default KingModal;
