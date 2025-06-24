import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the logo and navigation links', () => {
    render(<Header />);
    
    // Check if logo is rendered
    expect(screen.getByText('StyleHub')).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(screen.getByText('Men')).toBeInTheDocument();
    expect(screen.getByText('Women')).toBeInTheDocument();
    expect(screen.getByText('Accessories')).toBeInTheDocument();
    expect(screen.getByText('Sale')).toBeInTheDocument();
    
    // Check if search and cart icons are rendered
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Wishlist')).toBeInTheDocument();
    expect(screen.getByLabelText('Shopping Cart')).toBeInTheDocument();
  });
});
