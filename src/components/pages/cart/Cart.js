import './Cart.scss';
import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import KingQuantityInput from '../../shared/input/quantityInput/QuantityInput';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
	const { cart } = useAuth();
	const { removeFromCart } = useAuth();
	const { updateQuantity } = useAuth();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const getTotal = () => {
			let total = 0;
			cart.forEach((product) => {
				total = total + product.quantity * product.price;
			});
			setTotal(total);
		};
		getTotal();
	}, [cart]);

	const handleRemoveItemFromCart = (id) => {
		removeFromCart(id);
	};

	const handleQuantityChange = (id, quantity) => {
		updateQuantity(id, quantity);
	};

	const buy = () => {
		toast.error('Možda neki drugi dan..');
	};

	return (
		<Container>
			<h3>Košarica</h3>
			{cart.length === 0 ? (
				<p>Vaša košarica je trenutno prazna.</p>
			) : (
				<ListGroup>
					{cart.map((item, index) => (
						<ListGroup.Item key={item.id}>
							<div className="cart">
								<div>
									<h5>{item.title}</h5>
									<div className="cart-quantity-price">
										<div className="cart-quantity">
											<KingQuantityInput
												initialQuantity={item.quantity}
												onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
											/>
										</div>
										<p className="cart-price">Cijena: ${item.price}</p>
									</div>
								</div>
								<img src={item.images[0]} alt={item.title} style={{ width: '50px' }} />
								<Button className="cart-remove" variant="danger" onClick={() => handleRemoveItemFromCart(item.id)}>
									<FontAwesomeIcon color="white" icon={faClose} />
								</Button>
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
			<Row>
				<Col className="cart-total">
					UKUPNO: ${parseFloat(total).toFixed(2)}
					<Button className="cart-buy" variant="success" onClick={() => buy()}>
						Kupi
					</Button>
				</Col>
			</Row>
			<ToastContainer />
		</Container>
	);
};

export default Cart;
