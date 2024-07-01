import React from 'react';
import KingCheckbox from '../../shared/checkbox/Checkbox';

const PriceFilter = ({ selectedPrices, onPriceChange }) => {
	const priceRanges = [
		{ label: '10-49.99$', value: '0-49.99' },
		{ label: '50-99.99$', value: '50-99.99' },
		{ label: '100$+', value: '100' },
	];

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		onPriceChange(value, checked);
	};

	return (
		<div>
			{priceRanges.map((range) => (
				<KingCheckbox
					key={range.value}
					label={range.label}
					value={range.value}
					checked={selectedPrices.includes(range.value)}
					onChange={handleCheckboxChange}
				/>
			))}
		</div>
	);
};

export default PriceFilter;
