import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Load cart from local storage when user logs in
		if (user) {
			const storedCart = localStorage.getItem(`${user.username}-cart`);
			if (storedCart) {
				setCart(JSON.parse(storedCart));
			}
		}
	}, [user]);

	useEffect(() => {
		// Save cart to local storage when cart changes
		if (user) {
			localStorage.setItem(`${user.username}-cart`, JSON.stringify(cart));
		}
	}, [cart, user]);

	const login = async (username, password) => {
		try {
			const response = await fetch('https://dummyjson.com/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const data = await response.json();
			if (data.token) {
				setUser(data);
				navigate('/'); // Redirect to home page after login
			} else {
				setError(data.message);
			}
		} catch (err) {
			setError('Login failed');
		}
	};

	const logout = () => {
		setUser(null);
		setCart([]);
		navigate('/login'); // Redirect to login page after logout
	};

	const addToCart = (item, quantity) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity }];
			}
		});
	};

	const updateQuantity = (id, quantity) => {
		setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)));
	};

	const removeFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, addToCart, updateQuantity, removeFromCart, cart, error }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
