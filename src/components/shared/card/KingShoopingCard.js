import './KingShoopingCard.scss';

import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import KingModal from '../modal/Modal';

const KingShoopingCard = ({ product, onAddToBasket }) => {
	const [quantity, setQuantity] = useState(1);
	const [modalShow, setModalShow] = useState(false);
	const [modalContent, setModalContent] = useState({});

	const handleShowModal = (item) => {
		setModalContent(item);
		setModalShow(true);
	};

	const handleQuantityChange = (e) => {
		setQuantity(Number(e.target.value));
	};

	const handleAddToBasket = () => {
		onAddToBasket(quantity);
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
					{/* <InputGroup className="mb-3">
						<Button variant="outline-secondary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
							-
						</Button>
						<FormControl type="number" value={quantity} onChange={handleQuantityChange} min="1" />
						<Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>
							+
						</Button>
					</InputGroup> */}
					<div className="card-buttons">
						<Button variant="secondary" onClick={() => handleShowModal(product)}>
							Prikaži detalje
						</Button>
						<Button variant="danger" onClick={handleAddToBasket}>
							<FontAwesomeIcon color="white" icon={faBasketShopping} />
						</Button>
					</div>
				</Card.Body>
			</Card>
			<KingModal
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
