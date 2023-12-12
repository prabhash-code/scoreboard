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

    const updateScore = (matchId, homeScore, awayScore) => {
        setMatches(matches.map((match) =>
            match.id === matchId
                ? { ...match, homeScore, awayScore }
                : match
        ));
    };

    const finishGame = (matchId) => {
        setMatches(matches.filter((match) => match.id !== matchId));
    };

    return (
        <div>
            <h2>Ongoing Matches</h2>
            <div>
                {matches.map((match) => (
                    <div key={match.id}>
                        <button onClick={() => updateScore(match.id, match.homeScore + 1, match.awayScore)}>+1 Home</button>
                        <span>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</span>
                        <button onClick={() => updateScore(match.id, match.homeScore, match.awayScore + 1)}>+1 Away</button>
                        <button onClick={() => finishGame(match.id)}>Finish Game</button>
                    </div>
                ))}
            </div>

            <NewGame startNewGame={startNewGame} />
        </div>
    );
};

export default Scoreboard;
