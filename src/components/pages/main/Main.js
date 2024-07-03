import './Main.scss';
import React, { useState } from 'react';

import Shop from '../../features/shop/Shop';
import Navigation from '../../features/navigation/Navigation';

import Cart from '../cart/Cart';
import Profile from '../profile/Profile';

const Main = () => {
	const [nav, setNav] = useState(1);

	return (
		<div className="main-wrapper">
			<div className="header">
				<Navigation
					handleNavClick={(nav) => {
						setNav(nav);
					}}
				/>
			</div>
			<div className="content">
				{nav === 1 ? <Shop /> : null}
				{nav === 2 ? <Profile /> : null}
				{nav === 3 ? <Cart /> : null}
			</div>
			<div className="footer">
				<p>Stručni zadatak za radno mjesto Frontend Developera @KingICT 2024.</p>
			</div>
		</div>
	);
};

export default Main;
