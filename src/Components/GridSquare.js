import React, { useState, useContext, useEffect } from 'react';

import {BoardContext} from '../context/BoardContext';

import '../SCSS/GridSquare.scss';

const GridSquare = ( {i, j, f, getLiberties, getOpponentDeadGroups} ) => {

    const {currentPlayer, setCurrentPlayer, board, setBoard, boardSize, stars, previousStone, setPreviousStone, groupLiberties, oppLibs, ko, setKo} = useContext(BoardContext);

    const [stoneStyle, setStoneStyle] = useState({
        background: board[i][j].hasStone === 1 ? "black" : 
                    board[i][j].hasStone === 2 ? "white" : 
                    board[i][j].hasStone === 3 ? "green" : "transparent"
    })

    useEffect(() => {
        setStoneStyle({
            background: board[i][j].hasStone === 1 ? "black" : 
                        board[i][j].hasStone === 2 ? "white" : 
                        board[i][j].hasStone === 3 ? "green" : "transparent"
        })
    }, [board])

    const handleSquareClick = () => {
        
        console.log("YOO", `${i}-${j}`, ko)
        if (`${i}-${j}` === ko) {return} else {setKo([])}
        console.log("ko", ko)
        const newBoard = board.slice();
        let opponentDeadGroups = getOpponentDeadGroups(i, j, currentPlayer === 1 ? 2 : 1)
        let libertyNumber = getLiberties(i, j, currentPlayer)
        console.log("opponentDeadGroups", opponentDeadGroups)
        if (opponentDeadGroups) {
            if (opponentDeadGroups.length === 1) {
                if (opponentDeadGroups[0].length === 1) {
                    console.log("opponentDeadGroups[0]", opponentDeadGroups[0][0])
                    setKo(opponentDeadGroups[0][0])
                }
            }
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

    // const stoneStyle = {
    //     background: board[i][j].hasStone === 1 ? "black" : 
    //                 board[i][j].hasStone === 2 ? "white" : 
    //                 board[i][j].hasStone === 3 ? "green" : "grey"
    // }

    const previousStyle = {
        background: board[i][j].hasStone === 1 ? "white" :
                    board[i][j].hasStone === 2 ? "black" : "transparent"
    }

    const handleEnter = () => {
        if (!board[i][j].hasStone) {
            setStoneStyle({background: currentPlayer === 1 ? "black" : "white"})
        }
    }

    const handleLeave = () => {
        setStoneStyle({
            background: board[i][j].hasStone === 1 ? "black" : 
                        board[i][j].hasStone === 2 ? "white" : 
                        board[i][j].hasStone === 3 ? "green" : "transparent"
        })
    }

    return (
        <div 
            className="grid-square-container"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={!board[i][j].hasStone ? handleSquareClick : null}>
                {
                    <div className="stone" style={stoneStyle}>
                        {(previousStone[0] === i && previousStone[1] === j) && <div className="previous-stone" style={previousStyle}></div>}
                    </div>
                }

                {
                    (stars.includes(i) && stars.includes(j)) && <div className="star"></div>
                }

                {/* {
                    groupLiberties.includes(`${i}-${j}`) && <div className="red-liberty"></div>
                }
                {
                    oppLibs.includes(`${i}-${j}`) && <div className="blue-liberty"></div>
                } */}
        </div>
    )
}

export default GridSquare;