import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from '../components/Scoreboard';

test('renders ongoing matches', () => {
    render(<Scoreboard />);
    const matchesElement = screen.getByText(/Ongoing Matches/i);
    expect(matchesElement).toBeInTheDocument();
});

test('renders new game form', () => {
    render(<Scoreboard />);
    const formElement = screen.getByLabelText(/Home Team:/i);
    expect(formElement).toBeInTheDocument();
});

test('starts a new game', () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByLabelText(/Home Team:/i);
    const awayTeamInput = screen.getByLabelText(/Away Team:/i);
    const startButton = screen.getByText(/Start New Game/i);

    fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
    fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
    fireEvent.click(startButton);

    const matchElement = screen.getByText(/Team A 0 - 0 Team B/i);
    expect(matchElement).toBeInTheDocument();
});

test('updates home score', () => {
  render(<Scoreboard />);
  const homeTeamInput = screen.getByLabelText(/Home Team:/i);
  const awayTeamInput = screen.getByLabelText(/Away Team:/i);
  const startButton = screen.getByText(/Start New Game/i);

  fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
  fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
  fireEvent.click(startButton);

  const homeScoreButton = screen.getByText('+1 Home');

  fireEvent.click(homeScoreButton);

  const updatedMatchElement = screen.getByText(/Team A 1 - 0 Team B/i);
  expect(updatedMatchElement).toBeInTheDocument();
});

test('updates away score', () => {
  render(<Scoreboard />);
  const homeTeamInput = screen.getByLabelText(/Home Team:/i);
  const awayTeamInput = screen.getByLabelText(/Away Team:/i);
  const startButton = screen.getByText(/Start New Game/i);

  fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
  fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
  fireEvent.click(startButton);
  
  const awayScoreButton = screen.getByText('+1 Away');

  fireEvent.click(awayScoreButton);

  const updatedMatchElement = screen.getByText(/Team A 0 - 1 Team B/i);
  expect(updatedMatchElement).toBeInTheDocument();
});