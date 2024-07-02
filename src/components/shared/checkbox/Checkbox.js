import './Checkbox.scss';
import React from 'react';
import { Form } from 'react-bootstrap';

const KingCheckbox = ({ label, value, checked, onChange }) => {
	return (
		<Form.Check
		
			className="king-checkbox"
			type="checkbox"
			label={label}
			value={value}
			checked={checked}
			onChange={onChange}

		/>
	);
};

export default KingCheckbox;
