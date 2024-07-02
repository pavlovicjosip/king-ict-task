import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KingProductModal = ({ title, description, image, show, handleClose }) => {
	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img src={image} alt={title} className="img-fluid " />
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

export default KingProductModal;
