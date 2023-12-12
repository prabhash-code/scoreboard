import React, { useState } from 'react';
import NewGame from './NewGame';

const Scoreboard = () => {
    const [matches, setMatches] = useState([]);

    const startNewGame = (homeTeam, awayTeam) => {
        const newMatch = {
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            id: Date.now(),
        };

        setMatches([...matches, newMatch]);
    };

    return (
        <div>
            <h2>Ongoing Matches</h2>
            <div>
                {matches.map((match) => (
                    <div key={match.id}>
                        <span>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</span>
                    </div>
                ))}
            </div>

            <NewGame startNewGame={startNewGame} />
        </div>
    );
};

export default Scoreboard;
