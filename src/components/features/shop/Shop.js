import { Button, Col } from 'react-bootstrap';
import './Shop.scss';

import React, { useEffect, useState } from 'react';
import KingShoopingCard from '../../shared/card/ShoopingCard';
import KingInput from '../../shared/input/Input';
import PriceFilter from '../priceFilter/PriceFilter';
import KingDropdown from '../../shared/dropdown/Dropdown';
import CategoryFilter from '../categoryFilter/CategoryFilter';
import KingPagination from '../../shared/pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import KingSimpleModal from '../../shared/modal/simpleModal/SimpleModal';
import { useAuth } from '../../services/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Shop = () => {
	const [data, setData] = useState(null);
	const [productsMetaData, setProductsMetaData] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const [titleFilter, setTitleFilter] = useState('');
	const [selectedPrice, setSelectedPrice] = useState('');
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [sortOption, setSortOption] = useState('');

	const [filterModalShow, setFilterModalShow] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const { addToCart } = useAuth();

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
				const response = await fetch('https://dummyjson.com/products?limit=0');
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
					return b.price - a.price;
				} else if (sortOption === 'price-descending') {
					return a.price - b.price;
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

	const handleAddToBasket = (product, quantity) => {
		toast.success(`Proizvod ${product.title} je dodan u košaricu!`);
		addToCart(product, quantity);
	};

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

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// INFO: If the next page data has to be fetched from the backend instead of handling it from memory, we can do it like this:

	// const handlePageChange = (value) => {
	// 	const fetchDataWithPagination = async () => {
	// 		try {
	// 			const response = await fetch('https://dummyjson.com/products?limit=20&skip=' + (value - 1) * 20);
	// 			if (!response.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			const result = await response.json();
	// 			setData(result.products);
	// 			setProductsMetaData({ limit: result.limit, skip: result?.skip, total: result.total });
	// 			setFilteredProducts(data);
	// 		} catch (error) {
	// 			setError(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchDataWithPagination();
	// };

	const itemsPerPage = 20;
	const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
	const currentItems = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleFilterModalClose = () => setFilterModalShow(false);
	const handleFilterModalShow = () => setFilterModalShow(true);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	const shopControls = () => {
		return (
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
		);
	};

	return (
		<div className="shop">
			<div className="shop-controls-wrapper">{shopControls()}</div>
			<div className="shop-data">
				<Button className="shop-controls-button " variant="outline-secondary" onClick={handleFilterModalShow}>
					Filteri <FontAwesomeIcon icon={faTableList} />
				</Button>
				<div className="shop-cards">
					{currentItems?.map((product, index) => (
						<Col key={index} md={6} lg={4} className="mb-4">
							<KingShoopingCard product={product} onAddToBasket={handleAddToBasket}></KingShoopingCard>
						</Col>
					))}
				</div>
				<div className="shop-pagination">
					<KingPagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					></KingPagination>
				</div>
			</div>
			<KingSimpleModal handleClose={handleFilterModalClose} show={filterModalShow}>
				{shopControls()}
			</KingSimpleModal>
			<ToastContainer />
		</div>
	);
};

export default Shop;
