import React from 'react';
import KingCheckbox from '../../shared/checkbox/Checkbox';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		onCategoryChange(value, checked);
	};

	return (
		<div>
			{categories.map((category) => (
				<KingCheckbox
					key={category}
					label={category}
          value={category}
          
          checked={selectedCategories.includes(category)}
					onChange={handleCheckboxChange}
				/>
			))}
		</div>
	);
};

export default CategoryFilter;
