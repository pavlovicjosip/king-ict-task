import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const KingSlider = ({ label, min, max, value, onChange, errorMessage }) => {
	return (
		<Form.Group controlId={`form${label}`}>
			{label && <Form.Label>{label}</Form.Label>}
			<InputGroup>
				<Form.Range min={min} max={max} value={value} onChange={onChange} isInvalid={!!errorMessage} />
				<Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
			</InputGroup>
			<Form.Text className="text-muted">Value: {value}</Form.Text>
		</Form.Group>
	);
};

export default KingSlider;
