import React, { useState } from 'react';
import NewGame from './NewGame';
import '../App.css'

const Scoreboard = () => {
    const [matches, setMatches] = useState([]);
    const [showSummary, setShowSummary] = useState(false);

    const startNewGame = (homeTeam, awayTeam) => {
        const newMatch = {
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            goalTimes: [],
            id: Date.now(),
        };

        setMatches([...matches, newMatch]);
    };

    const updateScore = (matchId, homeScore, awayScore) => {
        const timeOfGoal = Date.now();

        setMatches((prevMatches) =>
            prevMatches.map((match) =>
                match.id === matchId
                    ? {
                        ...match,
                        homeScore,
                        awayScore,
                        goalTimes: [...match.goalTimes, getGoalTime(timeOfGoal, match.id)],
                    }
                    : match
            )
        );
    };

    const getGoalTime = (goalTime, matchStartTime) => {
        const timeDifference = Math.floor((goalTime - matchStartTime) / (60000));
        return `${timeDifference}"`;
    };

    const finishGame = (matchId) => {
        setMatches(matches.filter((match) => match.id !== matchId));
    };

    const calculateTotalScore = (match) => match.homeScore + match.awayScore;

    const getSummary = () => {
        const sortedMatches = [...matches].sort((a, b) => {
          const totalScoreDiff = calculateTotalScore(b) - calculateTotalScore(a);
          return totalScoreDiff !== 0 ? totalScoreDiff : b.id - a.id;
        });
      
        return sortedMatches.map((match, index) => (
            <div key={match.id} className="summary-item" data-testid="summary-item">
              {index + 1}. {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam} {match.goalTimes.length > 0 && match.goalTimes.join(" ")}
          </div>
        ));
      };

    return (
        <div className="scoreboard">
            <h2>Ongoing Matches</h2>
            <div>
                {matches.map((match) => (
                    <div key={match.id} className="match">
                        <button onClick={() => updateScore(match.id, match.homeScore + 1, match.awayScore)}>+1 Home</button>
                        <span>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</span>
                        <button onClick={() => updateScore(match.id, match.homeScore, match.awayScore + 1)}>+1 Away</button>
                        <button className="finish" onClick={() => finishGame(match.id)}>Finish Game</button>
                    </div>
                ))}
            </div>

            <NewGame startNewGame={startNewGame} />

            <div className="summary">
                <button onClick={() => setShowSummary(!showSummary)}>
                    {showSummary ? 'Hide Summary' : 'Show Summary'}
                </button>
                {showSummary && (
                    <>
                        <h2>Summary</h2>
                        {getSummary()}
                    </>
                )}
            </div>
        </div>
    );
};

export default Scoreboard;
