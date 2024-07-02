import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/services/AuthContext';
import ProtectedRoute from './components/services/ProtectedRoute';
import Main from './components/pages/main/Main';


import Cart from './components/pages/cart/Cart';
import Profile from './components/pages/profile/Profile';
import Login from './components/pages/login/Login';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Main />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
