import './QuantityInput.scss';

import React, { useState } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

const KingQuantityInput = ({ initialQuantity = 1, onQuantityChange }) => {
	const [quantity, setQuantity] = useState(initialQuantity);

	const handleQuantityChange = (e) => {
		const value = Number(e.target.value);
		setQuantity(value);
		if (onQuantityChange) {
			onQuantityChange(value);
		}
	};

	const increaseQuantity = () => {
		setQuantity((prevQuantity) => {
			const newQuantity = prevQuantity + 1;
			if (onQuantityChange) {
				onQuantityChange(newQuantity);
			}
			return newQuantity;
		});
	};

	const decreaseQuantity = () => {
		setQuantity((prevQuantity) => {
			const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
			if (onQuantityChange) {
				onQuantityChange(newQuantity);
			}
			return newQuantity;
		});
	};

	return (
		<InputGroup className="quantity">
			<Button variant="outline-secondary" onClick={decreaseQuantity}>
				-
			</Button>
			<FormControl type="number" value={quantity} onChange={handleQuantityChange} min="1" />
			<Button variant="outline-secondary" onClick={increaseQuantity}>
				+
			</Button>
		</InputGroup>
	);
};

export default KingQuantityInput;
