import './Main.scss';
import React, { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';

import Shop from '../../features/shop/Shop';
import Navigation from '../../features/navigation/Navigation';

import Cart from '../../features/cart/Cart';
import Profile from '../../features/profile/Profile';

const Main = () => {
	const { user, logout } = useAuth();
	const [nav, setNav] = useState(1);

	return (
		<Container>
			<div className="main-wrapper">
				<div className="header">
					{user && (
						<Navigation
							handleNavClick={(nav) => {
								setNav(nav);
							}}
						/>
					)}
				</div>
				<div className="content">
					{nav === 1 ? <Shop /> : null}
					{nav === 2 ? <Profile /> : null}
					{nav === 3 ? <Cart /> : null}
				</div>
				<div className="footer">
					<p>Strucni zadatak za radno mjesto Frontend Developera @KingICT 2024.</p>
				</div>
			</div>
		</Container>
	);
};

export default Main;
