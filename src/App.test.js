import { render, screen } from '@testing-library/react';
import App from './App';

test('renders scoreboard app', () => {
  render(<App />);
  const scoreboardElement = screen.getByText(/Ongoing Matches/i);
  expect(scoreboardElement).toBeInTheDocument();
});
