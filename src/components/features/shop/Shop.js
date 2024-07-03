import { Button, Col } from 'react-bootstrap';
import './Shop.scss';

import React, { useEffect, useState } from 'react';
import KingShoopingCard from '../../shared/card/ShoopingCard';
import KingPagination from '../../shared/pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import KingSimpleModal from '../../shared/modal/simpleModal/SimpleModal';
import { useAuth } from '../../services/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import useFetchCategories from '../../services/customHooks/useFetchCategories';
import useFetchData from '../../services/customHooks/useFetchData';
import ShopControls from './controls/ShopControls';

const Shop = () => {
	const {
		data: products,
		loading: loadingProducts,
		error: productsError,
	} = useFetchData('https://dummyjson.com/products?limit=0');
	const {
		categories,
		loading: loadingCategories,
		error: categoriesError,
	} = useFetchCategories('https://dummyjson.com/products/category-list');
	const [filteredProducts, setFilteredProducts] = useState([]);

	const [titleFilter, setTitleFilter] = useState('');
	const [selectedPrice, setSelectedPrice] = useState('');
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [sortOption, setSortOption] = useState('');

	const [filterModalShow, setFilterModalShow] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const { addToCart } = useAuth();

	useEffect(() => {
		let filtered = products;

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
	}, [selectedPrice, selectedCategories, titleFilter, sortOption, products]);

	const handleAddToBasket = (product, quantity) => {
		toast.success(`Proizvod ${product.title} je dodan u košaricu!`);
		addToCart(product, quantity);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const itemsPerPage = 20;
	const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
	const currentItems = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleFilterModalClose = () => setFilterModalShow(false);
	const handleFilterModalShow = () => setFilterModalShow(true);

	if (loadingProducts || loadingCategories) return <div>Loading...</div>;
	if (productsError || categoriesError) return <div>Error: {productsError?.message || categoriesError?.message}</div>;

	return (
		<div className="shop">
			<div className="shop-controls-wrapper">
				<ShopControls
					titleFilter={titleFilter}
					setTitleFilter={setTitleFilter}
					selectedPrice={selectedPrice}
					setSelectedPrice={setSelectedPrice}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
					sortOption={sortOption}
					setSortOption={setSortOption}
					categories={categories}
					error={productsError || categoriesError}
				/>
			</div>
			<div className="shop-data">
				<Button className="shop-controls-button " variant="outline-secondary" onClick={handleFilterModalShow}>
					Filteri <FontAwesomeIcon icon={faTableList} />
				</Button>
				<div className="shop-cards">
					{currentItems?.map((product, index) => (
						<Col key={index} md={6} lg={4} className="mb-4">
							<KingShoopingCard product={product} onAddToBasket={handleAddToBasket} />
						</Col>
					))}
				</div>
				<div className="shop-pagination">
					<KingPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
				</div>
			</div>
			<KingSimpleModal handleClose={handleFilterModalClose} show={filterModalShow}>
				<ShopControls
					titleFilter={titleFilter}
					setTitleFilter={setTitleFilter}
					selectedPrice={selectedPrice}
					setSelectedPrice={setSelectedPrice}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
					sortOption={sortOption}
					setSortOption={setSortOption}
					categories={categories}
					error={productsError || categoriesError}
				/>
			</KingSimpleModal>
			<ToastContainer />
		</div>
	);
};

export default Shop;
