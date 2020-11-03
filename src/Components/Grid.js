import React, { useState, useContext } from 'react';

import GridSquare from './GridSquare';
import {BoardContext} from '../context/BoardContext';

import '../SCSS/Grid.scss';

const Grid = ( { getLiberties, getOpponentDeadGroups } ) => {

    const {boardSize, board, setBoard} = useContext(BoardContext);

    const gridStyle = {
        height: `${89.25 + (100/(boardSize-1))}%`,
        width: `${89.25 + (100/(boardSize-1))}%`,
        gridTemplateColumns: `repeat(${boardSize}, ${100/boardSize}%)`,
        gridTemplateRows: `repeat(${boardSize}, ${100/boardSize}%)`,
    }

    const grid = board.map((e,i) => e.map((f,j) => {
        return <GridSquare {...{i, j, f, getLiberties, getOpponentDeadGroups}}/>
    }))

    console.log("board", board)

    return (
        <div className="grid-container" style={gridStyle} >
            { grid }
        </div>
    )
}

export default Grid;