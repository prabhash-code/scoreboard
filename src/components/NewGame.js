import React, { useState } from 'react';
import '../App.css'

const NewGame = ({ startNewGame }) => {
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');

    const handleStartNewGame = (e) => {
        e.preventDefault();
        startNewGame(homeTeam, awayTeam);
        setHomeTeam('');
        setAwayTeam('');
    };

    return (
        <div className="new-game" >
            <form onSubmit={handleStartNewGame}>
                <label>
                    Home Team:
                    <input type="text" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} />
                </label>
                <label>
                    Away Team:
                    <input type="text" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} />
                </label>
                <button type="submit">Start New Game</button>
            </form>
        </div>
    );
};

export default NewGame;
