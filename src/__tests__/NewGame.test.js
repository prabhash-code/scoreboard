import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewGame from '../components/NewGame';

test('renders form inputs', () => {
    render(<NewGame startNewGame={() => { }} />);
    const homeTeamInput = screen.getByLabelText(/Home Team:/i);
    const awayTeamInput = screen.getByLabelText(/Away Team:/i);
    const startButton = screen.getByText(/Start New Game/i);

    expect(homeTeamInput).toBeInTheDocument();
    expect(awayTeamInput).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
});

test('calls startNewGame with correct values', () => {
    const startNewGameMock = jest.fn();
    render(<NewGame startNewGame={startNewGameMock} />);
    const homeTeamInput = screen.getByLabelText(/Home Team:/i);
    const awayTeamInput = screen.getByLabelText(/Away Team:/i);
    const startButton = screen.getByText(/Start New Game/i);

    fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
    fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
    fireEvent.click(startButton);

    expect(startNewGameMock).toHaveBeenCalledWith('Team A', 'Team B');
});
