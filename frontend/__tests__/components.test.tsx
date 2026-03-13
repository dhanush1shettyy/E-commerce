import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';

describe('Shared Components', () => {
  it('renders Button correctly', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('shows loading state on Button', () => {
    const { container } = render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    // Assuming lucide-react Loader2 has an animate-spin class or svg
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders InputField correctly', () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  it('shows error message on InputField', () => {
    render(<InputField label="Email" error="Invalid email address" />);
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });
});
