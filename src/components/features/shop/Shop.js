import { Col } from 'react-bootstrap';
import './Shop.scss';

import React, { useEffect, useState } from 'react';
import KingShoopingCard from '../../shared/card/KingShoopingCard';
import KingInput from '../../shared/input/Input';
import PriceFilter from '../priceFilter/PriceFilter';
import KingDropdown from '../../shared/dropdown/Dropdown';
import CategoryFilter from '../categoryFilter/CategoryFilter';
import KingPagination from '../../shared/pagination/Pagination';

const Shop = () => {
	// const [inputValue, setInputValue] = useState('');
	// const [sliderValue, setSliderValue] = useState(50);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [titleFilter, setTitleFilter] = useState('');
	const [selectedPrice, setSelectedPrice] = useState('');
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState(null);
	const [productsMetaData, setProductsMetaData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [sortOption, setSortOption] = useState('');

	const [error, setError] = useState('');

	const sortOptions = [
		{ label: 'cijena (uzlazno)', value: 'price-ascending' },
		{ label: 'cijena (silazno)', value: 'price-descending' },
		{ label: 'naslov (A-Z)', value: 'title-ascending' },
		{ label: 'naslov (Z-A)', value: 'title-descending' },
	];

	// Data fetching
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products?limit=20');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setData(result.products);
				setProductsMetaData({ limit: result.limit, skip: result.skip, total: result.total });
				setFilteredProducts(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		const fetchCategories = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products/category-list');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setCategories(result);
			} catch (error) {
				setError(error);
			}
		};

		fetchCategories();
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

		if (selectedCategories.length !== 0) {
			filtered = filtered.filter((item) => {
				return selectedCategories.includes(item.category);
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
	}, [selectedPrice, selectedCategories, titleFilter, sortOption, data]);

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

	const handleCategoryChange = (value) => {
		const selCategories = [...selectedCategories];
		if (selCategories.includes(value)) {
			const index = selCategories.indexOf(value);
			selCategories.splice(index, 1);
		} else {
			selCategories.push(value);
		}
		setSelectedCategories(selCategories);
	};

	const handlePageChange = (value) => {
		console.log(value);
		const fetchDataWithPagination = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products?limit=20&skip=' + (value - 1) * 20);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setData(result.products);
				setProductsMetaData({ limit: result.limit, skip: result?.skip, total: result.total });
				setFilteredProducts(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchDataWithPagination();
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
					<div className="control">
						<span>Cijena</span>
						<PriceFilter selectedPrices={selectedPrice} onPriceChange={handlePriceChange} />
					</div>
					<div className="control">
						<span>Kategorije</span>
						<CategoryFilter
							categories={categories}
							selectedCategories={selectedCategories}
							onCategoryChange={handleCategoryChange}
						/>
					</div>

					<KingDropdown
						className="sort-control"
						label="Sortiraj"
						options={sortOptions}
						value={sortOption}
						onChange={handleSortChange}
					/>
				</div>
			</form>

			<div className="shop-data">
				<div className="shop-cards">
					{filteredProducts?.map((product, index) => (
						<Col key={index} md={6} lg={4} className="mb-4">
							<KingShoopingCard product={product} onAddToBasket={handleAddToBasket}></KingShoopingCard>
						</Col>
					))}
				</div>
				<div className="shop-pagination">
					<KingPagination
						currentPage={Math.floor(productsMetaData.skip / 20) + 1}
						onPageChange={handlePageChange}
						totalPages={productsMetaData.total / 20}
					></KingPagination>
				</div>
			</div>
		</div>
	);
};

export default Shop;
