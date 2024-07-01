import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const KingInput = ({ label, placeholder, type = 'text', value, onChange, errorMessage }) => {
	return (
		<Form.Group controlId={`form${label}`}>
			{label && <Form.Label>{label}</Form.Label>}
			<InputGroup>
				<Form.Control
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					isInvalid={!!errorMessage}
				/>
				<Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
			</InputGroup>
		</Form.Group>
	);
};

export default KingInput;
