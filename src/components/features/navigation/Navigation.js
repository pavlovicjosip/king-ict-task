import './Navigation.scss';
import logo from '../../../assets/logos/logo.png';

import React from 'react';

import { useAuth } from '../../services/AuthContext';
import { Button, Container, Nav, NavLink, Navbar } from 'react-bootstrap';

const Navigation = ({ handleNavClick }) => {
	const { user, logout } = useAuth();

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand onClick={() => handleNavClick(1)}>
					<img className="logo" src={logo} alt="logo" />
				</Navbar.Brand>

				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav className="me-auto">
						<Nav.Link onClick={() => handleNavClick(1)}>Trgovina</Nav.Link>
						<Nav.Link onClick={() => handleNavClick(2)}>Profil</Nav.Link>
						<Nav.Link onClick={() => handleNavClick(3)}>Košarica</Nav.Link>
					</Nav>
					<Nav>
						{user ? (
							<>
								<Navbar.Text className="me-2">Dobrodošli {user.firstName + ' ' + user.lastName}</Navbar.Text>
								<Button variant="outline-danger" onClick={logout}>
									Odjava
								</Button>
							</>
						) : (
							<NavLink to="/login">
								<Button variant="outline-primary">Prijava</Button>
							</NavLink>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
