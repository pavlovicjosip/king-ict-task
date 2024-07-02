import './ShoopingCard.scss';

import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faStar } from '@fortawesome/free-solid-svg-icons';

import KingQuantityInput from '../input/quantityInput/QuantityInput';
import KingProductModal from '../modal/ProductModal/ProductModal';

const KingShoopingCard = ({ product, onAddToBasket }) => {
	const [quantity, setQuantity] = useState(1);
	const [modalShow, setModalShow] = useState(false);

	const [modalContent, setModalContent] = useState({});

	const handleShowModal = (item) => {
		setModalContent(item);
		setModalShow(true);
	};

	const handleUpdateQuantity = (quantity) => {
		setQuantity(quantity);
	};

	const handleAddToCart = () => {
		onAddToBasket(product, quantity);
	};

	const getRatingColor = (rating) => {
		if (rating >= 0 && rating < 2) {
			return 'danger';
		} else if (rating >= 2 && rating < 4) {
			return 'warning';
		} else if (rating >= 4 && rating <= 5) {
			return 'success';
		} else {
			return 'black'; // Default color for out of range ratings
		}
	};

	const ratingColor = getRatingColor(product.rating);
	if (!product) return <div>Loading</div>;

	return (
		<div>
			<Card className="card">
				<Card.Img className="card-image" variant="top" src={product.images[0]} alt={product.title} />
				<Card.Body className="card-body">
					<Card.Title>{product.title}</Card.Title>
					<Card.Text>
						{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
					</Card.Text>
					<div className="card-numeric-info">
						<Badge className="card-rating" bg={ratingColor}>
							{product.rating} <FontAwesomeIcon color="white" icon={faStar} />
						</Badge>
						<Card.Text className="card-price">{'$' + product.price}</Card.Text>
					</div>
					<KingQuantityInput onQuantityChange={(quantity) => handleUpdateQuantity(quantity)} />
					<div className="card-buttons">
						<Button variant="outline-secondary" onClick={() => handleShowModal(product)}>
							Detalji
						</Button>
						<Button variant="danger" onClick={handleAddToCart}>
							<FontAwesomeIcon color="white" icon={faBasketShopping} />
						</Button>
					</div>
				</Card.Body>
			</Card>
			<KingProductModal
				show={modalShow}
				handleClose={() => setModalShow(false)}
				title={product.title}
				description={product.description}
				image={product.images[0]}
			/>
		</div>
	);
};

export default KingShoopingCard;
