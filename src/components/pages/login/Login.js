import './Login.scss';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import logo from '../../../assets/logos/logo.png';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login, error } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(username, password);
	};

	return (
		<Container className="login-window">
			<Row className="login">
				<Col className="justify" md={5}>
					<img className="login-logo" src={logo} alt="logo" />

					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit} className="login-form">
						<Form.Group className="justify" controlId="formUsername">
							<Form.Label>Korisničko ime</Form.Label>
							<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</Form.Group>

						<Form.Group className="justify" controlId="formPassword">
							<Form.Label>Lozinka</Form.Label>
							<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Form.Group>

						<Button variant="danger" type="submit">
							Prijava
						</Button>
						<a className="login-anonymous-link" href="/">
							Nastavi kao anonimni korisnik
						</a>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
