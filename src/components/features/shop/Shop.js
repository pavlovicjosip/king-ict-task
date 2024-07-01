import { Col } from 'react-bootstrap';
import './Shop.scss';

import React, { useEffect, useState } from 'react';
import KingShoopingCard from '../../shared/card/KingShoopingCard';
import KingInput from '../../shared/input/Input';
import PriceFilter from '../priceFilter/PriceFilter';
import KingDropdown from '../../shared/dropdown/Dropdown';

const Shop = () => {
	// const [inputValue, setInputValue] = useState('');
	// const [sliderValue, setSliderValue] = useState(50);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [titleFilter, setTitleFilter] = useState('');
	const [selectedPrice, setSelectedPrice] = useState('');
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [sortOption, setSortOption] = useState('');

	const [error, setError] = useState('');

	const sortOptions = [
		{ label: 'Sortiraj po cijeni (uzlazno)', value: 'price-ascending' },
		{ label: 'Sortiraj po cijeni (silazno)', value: 'price-descending' },
		{ label: 'Sortiraj po naslovu (A-Z)', value: 'title-ascending' },
		{ label: 'Sortiraj po naslovu (Z-A)', value: 'title-descending' },
	];

	// Data fetching
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setData(result.products);
				setFilteredProducts(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Filtering data by price and title
	useEffect(() => {
		let filtered = data;

		if (selectedPrice !== '') {
			filtered = filtered.filter((item) => {
				const itemPrice = parseFloat(item.price);
				const [min, max] = selectedPrice.split('-').map(Number);
				if (max) {
					return itemPrice >= min && itemPrice <= max;
				}
				return itemPrice > min;
			});
		}

		if (titleFilter !== '') {
			filtered = filtered.filter((item) => item.title.toLowerCase().includes(titleFilter.toLowerCase()));
		}

		if (sortOption !== '') {
			filtered = filtered.sort((a, b) => {
				if (sortOption === 'price-ascending') {
					return a.price - b.price;
				} else if (sortOption === 'price-descending') {
					return b.price - a.price;
				} else if (sortOption === 'title-ascending') {
					return a.title.localeCompare(b.title);
				} else if (sortOption === 'title-descending') {
					return b.title.localeCompare(a.title);
				}
				return 0;
			});
		}

		setFilteredProducts(filtered);
	}, [selectedPrice, titleFilter, sortOption, data]);

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const handleTitleFilterChange = (event) => {
		setTitleFilter(event.target.value);
	};

	const handleAddToBasket = (quantity) => {
		alert(`Added ${quantity} item(s) to the basket`);
	};

	// const handleSearchChange = (e) => {
	// 	setInputValue(e.target.value);
	// 	setError(''); // Reset error message on change
	// };

	// const handleSliderChange = (e) => {
	// 	setSliderValue(e.target.value);
	// 	setError(''); // Reset error message on change
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (!inputValue) {
	// 		setError('This field is required.');
	// 	} else {
	// 		alert('Form submitted!');
	// 	}
	// };

	const handlePriceChange = (value) => {
		setSelectedPrice(value);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="shop">
			<form>
				<div className="shop-controls">
					<KingInput
						className="search-input"
						placeholder="Pretraži"
						value={titleFilter}
						onChange={handleTitleFilterChange}
						errorMessage={error}
					></KingInput>
					<PriceFilter selectedPrices={selectedPrice} onPriceChange={handlePriceChange} />
					<KingDropdown label="Sort Items" options={sortOptions} value={sortOption} onChange={handleSortChange} />
				</div>
			</form>

			<div className="shop-data">
				{filteredProducts?.map((product, index) => (
					<Col key={index} md={6} lg={4} className="mb-4">
						<KingShoopingCard product={product} onAddToBasket={handleAddToBasket}></KingShoopingCard>
					</Col>
				))}
			</div>
		</div>
	);
};

export default Shop;
