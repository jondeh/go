import React, { useContext } from 'react';

import Square from './Square';
import {BoardContext} from '../context/BoardContext';

import '../SCSS/Board.scss';
const Board = () => {
    const {boardSize} = useContext(BoardContext)

    const grid = [...Array(boardSize-1)].map((e,i) => [...Array(boardSize-1)].map((f,j) => {
        return <Square />
    }))

    const gridStyle = {
        gridTemplateColumns: `repeat(${boardSize-1}, ${100/(boardSize-1)}%)`,
        gridTemplateRows: `repeat(${boardSize-1}, ${100/(boardSize-1)}%)`,
    }

    return (
        <div className="board-container" style={gridStyle} >
            { grid }
        </div>
    )
}

export default Board;