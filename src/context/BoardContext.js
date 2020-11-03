import React, { useState, createContext, useEffect } from 'react';

const BOARD_SIZE = 19;
const BOARD_PIXELS = 800;

export const BoardContext = createContext(null);

export const BoardProvider = ({ children }) => {
    const [boardSize, setBoardSize] = useState(BOARD_SIZE);
    const [boardPixels, setBoardPixels] = useState(BOARD_PIXELS);
    const [currentPlayer, setCurrentPlayer] = useState(1);

    const [board, setBoard] = useState(() => {
        return [...Array(BOARD_SIZE)].map((e,i) => [...Array(BOARD_SIZE)].map((f,j) => {
            return {
                hasStone: false,
            }
        }))
    })

    const [stars, setStars] = useState([3, 9, 15]);
    const [previousStone, setPreviousStone] = useState([]);
    const [groupLiberties, setGroupLiberties] = useState([]);
    const [oppLibs, setOppLibs] = useState([]);
    const [ko, setKo] = useState([]);

    // useEffect(() => {
    //     setBoard(() => {
    //         let newBoard = newBoard.slice()

    //         newBoard.forEach((e,i) => e.forEach((f,j) => {
    //             let counter = 0
    //             if (newBoard[i+1] && newBoard[i+1][j].hasStone)
    //         }))
    //     })
    // }, [previousStone])
    
    return (
        <BoardContext.Provider
            value={{
                boardSize,
                setBoardSize,
                boardPixels,
                setBoardPixels,
                currentPlayer,
                setCurrentPlayer,
                board,
                setBoard,
                stars,
                setStars,
                previousStone,
                setPreviousStone,
                groupLiberties,
                setGroupLiberties,
                oppLibs,
                setOppLibs,
                ko,
                setKo,
            }}
        >
            { children }
        </BoardContext.Provider>
    )
}