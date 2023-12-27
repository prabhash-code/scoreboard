import React, { useState } from 'react';
import NewGame from './NewGame';
import '../App.css'

const Scoreboard = () => {
    const [matches, setMatches] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [currentCard, setCurrentCard] = useState('red');

    const startNewGame = (homeTeam, awayTeam) => {
        const newMatch = {
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            goalDetails: [],
            cardDetails: [],
            id: Date.now(),
        };

        setMatches([...matches, newMatch]);
    };

    const updateScore = (matchId, homeScore, awayScore) => {
        if (!currentPlayer.trim()) {
            alert('Please enter the player name that scores the goal.');
            return;
        }

        const timeOfGoal = Date.now();

        setMatches((prevMatches) =>
            prevMatches.map((match) =>
                match.id === matchId
                    ? {
                        ...match,
                        homeScore,
                        awayScore,
                        goalDetails: [
                            ...match.goalDetails,
                            { time: getEventTime(timeOfGoal, match.id), player: currentPlayer },
                        ],
                    }
                    : match
            )
        );

        setCurrentPlayer('')
    };

    const getEventTime = (eventTime, matchStartTime) => {
        const timeDifference = Math.floor((eventTime - matchStartTime) / (60000));
        return `${timeDifference}"`;
    };

    const getSummary = () => {
        const sortedMatches = [...matches].sort((a, b) => {
            const totalScoreDiff = calculateTotalScore(b) - calculateTotalScore(a);
            return totalScoreDiff !== 0 ? totalScoreDiff : b.id - a.id;
        });

        return sortedMatches.map((match, index) => (
            <div key={match.id} className="summary-item" data-testid="summary-item">
                {index + 1}. {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
                {match.goalDetails.length > 0 && (
                    <span>
                        {match.goalDetails.map((goal, goalIndex) => (
                            <span key={`${goal.time}-${goal.player}`}>
                                {goalIndex > 0 ? ' ' : ''} {/* Add space between multiple goals */}
                                {goal.time} {getInitials(goal.player)}
                            </span>
                        ))}
                    </span>
                )}
                {match.cardDetails.length > 0 && (
                    <span>
                        {match.cardDetails.map((card, idx) => (
                            <span key={`${card.time}-${card.player}`}>
                                {idx > 0 || match.goalDetails.length > 0 ? ' ' : ''}
                                {card.time} ({card.card} - {getInitials(card.player)})
                            </span>
                        ))}
                    </span>
                )}
            </div>
        ));
    };

    const calculateTotalScore = (match) => match.homeScore + match.awayScore;

    const getInitials = (playerName) => {
        const initials = playerName
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('.');
        return `(${initials})`;
    };

    const handleIssueCard = (matchId) => {
        if (!currentPlayer.trim()) {
            alert('Please enter the player name that scores the goal.');
            return;
        }
        const timeOfCard = Date.now();

        setMatches((prevMatches) =>
            prevMatches.map((match) =>
                match.id === matchId
                    ? {
                        ...match,
                        cardDetails: [
                            ...match.cardDetails,
                            { time: getEventTime(timeOfCard, match.id), card: currentCard, player: currentPlayer },
                        ],
                    }
                    : match
            )
        );

        setCurrentPlayer('')
    };

    const finishGame = (matchId) => {
        setMatches(matches.filter((match) => match.id !== matchId));
    };

    return (
        <div className="scoreboard">
            <h2>Ongoing Matches</h2>
            <div>
                {matches.map((match) => (
                    <div key={match.id} className="match">
                        <div className="score-section">
                            <label htmlFor="playerName">Player Name:</label>
                            <input
                                type="text"
                                id="playerName"
                                value={currentPlayer}
                                onChange={(e) => setCurrentPlayer(e.target.value)}
                            />
                            <button onClick={() => updateScore(match.id, match.homeScore + 1, match.awayScore)}>+1 Home</button>
                            <span>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</span>
                            <button onClick={() => updateScore(match.id, match.homeScore, match.awayScore + 1)}>+1 Away</button>
                            <button className="finish" onClick={() => finishGame(match.id)}>Finish Game</button>
                        </div>
                        <div className="card-section">
                            <label htmlFor="card">Card Type:</label>
                            <select
                                id="card"
                                value={currentCard}
                                onChange={(e) => setCurrentCard(e.target.value)}
                            >
                                <option value={"green"}>Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="red">Red</option>
                            </select>
                            <button onClick={() => handleIssueCard(match.id)}>Issue Card</button>
                        </div>
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
