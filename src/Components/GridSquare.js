import React, { useContext, useEffect } from 'react';

import {BoardContext} from '../context/BoardContext';

import '../SCSS/GridSquare.scss';

const GridSquare = ( {i, j, f, getLiberties, getOpponentDeadGroups} ) => {

    const {currentPlayer, setCurrentPlayer, board, setBoard, boardSize, stars, previousStone, setPreviousStone, groupLiberties, oppLibs} = useContext(BoardContext);

    const handleSquareClick = () => {
        const newBoard = board.slice();
        let opponentDeadGroups = getOpponentDeadGroups(i, j, currentPlayer === 1 ? 2 : 1)
        let libertyNumber = getLiberties(i, j, currentPlayer)
        if (opponentDeadGroups) {
            console.log("opp libs", opponentDeadGroups)
            opponentDeadGroups.forEach((e,i) => e.forEach((f,j) => {
                let kill = f.split('-')
                console.log("kill", kill)
                newBoard[kill[0]][kill[1]].hasStone = false
            }))
        }

        if (libertyNumber || opponentDeadGroups) {
            setBoard(() => {
                newBoard[i][j].hasStone = currentPlayer
                return newBoard
            })
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
            setPreviousStone([i, j])
        } else {return}
    }

    const stoneStyle = {
        background: board[i][j].hasStone === 1 ? "black" : 
                    board[i][j].hasStone === 2 ? "white" : 
                    board[i][j].hasStone === 3 ? "green" : "transparent"
    }

    const previousStyle = {
        background: board[i][j].hasStone === 1 ? "white" :
                    board[i][j].hasStone === 2 ? "black" : "transparent"
    }

    return (
        <div 
            className="grid-square-container" 
            onClick={!board[i][j].hasStone ? handleSquareClick : null}>
                {
                    board[i][j].hasStone && 
                        <div className="stone" style={stoneStyle}>
                            {(previousStone[0] === i && previousStone[1] === j) && <div className="previous-stone" style={previousStyle}></div>}
                        </div>
                }

                {
                    (stars.includes(i) && stars.includes(j)) && <div className="star"></div>
                }

                {
                    groupLiberties.includes(`${i}-${j}`) && <div className="red-liberty"></div>
                }
                {
                    oppLibs.includes(`${i}-${j}`) && <div className="blue-liberty"></div>
                }
        </div>
    )
}

export default GridSquare;