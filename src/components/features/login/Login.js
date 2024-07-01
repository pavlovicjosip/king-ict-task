import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login, error } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(username, password);
	};

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={6}>
					<h1>Login</h1>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formUsername">
							<Form.Label>Korisničko ime</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label>Lozinka</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Prijava
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
