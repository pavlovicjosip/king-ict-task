import React from 'react';
import { Form } from 'react-bootstrap';

const KingDropdown = ({ label, options, value, onChange }) => {
  return (
    <Form.Group controlId={`form${label}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control as="select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default KingDropdown;
