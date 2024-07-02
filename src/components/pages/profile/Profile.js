import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';

const Profile = () => {
	const { user } = useAuth();

	return (
		<Container>
			<h1>Korisnički profil</h1>
			<p>Korisničko ime: {user.username}</p>
			<p>Email adresa: {user.email}</p>
			{/* Add more user details as needed */}
		</Container>
	);
};

export default Profile;
