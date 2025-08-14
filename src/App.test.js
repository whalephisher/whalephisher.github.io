import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage hero title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Gabriel Liau/i })).toBeInTheDocument();
});
