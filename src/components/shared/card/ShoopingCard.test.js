import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import KingShoopingCard from './ShoopingCard';

// Mock components and icons
jest.mock('../input/quantityInput/QuantityInput', () => (props) => (
	<div data-testid="quantity-input" onClick={() => props.onQuantityChange(2)}>
		Quantity Input
	</div>
));

jest.mock(
	'../modal/ProductModal/ProductModal',
	() => (props) => props.show ? <div data-testid="product-modal">Product Modal</div> : null
);

const mockProduct = {
	title: 'Test Product',
	description: 'This is a test product description.',
	images: ['http://placehold.it/200'],
	rating: 4.5,
	price: 99.99,
};

describe('KingShoopingCard', () => {
	it('renders the product details correctly', () => {
		render(<KingShoopingCard product={mockProduct} onAddToBasket={jest.fn()} />);

		expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
		expect(screen.getByText(/This is a test product description./)).toBeInTheDocument();
		expect(screen.getByText('$99.99')).toBeInTheDocument();
		expect(screen.getByText(/4.5/)).toBeInTheDocument();
		expect(screen.getByRole('img', { name: /Test Product/i })).toHaveAttribute('src', mockProduct.images[0]);
	});

	it('handles quantity changes', () => {
		render(<KingShoopingCard product={mockProduct} onAddToBasket={jest.fn()} />);

		fireEvent.click(screen.getByTestId('quantity-input'));
		expect(screen.getByTestId('quantity-input')).toHaveTextContent('Quantity Input');
	});
});
