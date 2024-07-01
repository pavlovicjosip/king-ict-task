import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/services/AuthContext';
import ProtectedRoute from './components/services/ProtectedRoute';
import Main from './components/pages/main/Main';
import Login from './components/features/login/Login';
import Profile from './components/features/profile/Profile';

import Cart from './components/features/cart/Cart';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Main />
							</ProtectedRoute>
						}
					/>
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
