import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';

const Cart = () => {
	const { cart } = useAuth();

	return (
		<Container>
			<h1>Košarica</h1>
			{cart.length === 0 ? (
				<p>Vaša košarica je trenutno prazna.</p>
			) : (
				<ListGroup>
					{cart.map((item) => (
						<ListGroup.Item key={item.id}>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h5>{item.title}</h5>
									<p>Količina: {item.quantity}</p>
									<p>Cijena: ${item.price}</p>
								</div>
								<img src={item.images[0]} alt={item.title} style={{ width: '50px' }} />
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Container>
	);
};

export default Cart;
