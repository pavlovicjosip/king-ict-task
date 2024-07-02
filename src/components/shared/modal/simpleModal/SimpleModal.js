import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KingSimpleModal = ({ show, handleClose, children }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body>
				<Button variant="link" onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0 }}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
				{children}
			</Modal.Body>
		</Modal>
	);
};

export default KingSimpleModal;
