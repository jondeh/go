import React, { useState, useContext } from 'react';

import Board from './Board';
import Grid from './Grid';
import {BoardContext} from '../context/BoardContext';

import '../SCSS/BehindBoard.scss';

const BehindBoard = () => {

    const {board, setBoard, boardSize, boardPixels, setGroupLiberties, currentPlayer, setOppLibs} = useContext(BoardContext);

    const behindBoardStyle = {
        height: `${boardPixels}px`,
        width: `${boardPixels}px`
    }

    const getOpponentDeadGroups = (i, j, player) => {
        let newStone = `${i}-${j}`
        let group = []
        let deadGroup = []
        let newBoard = board.map((a,aa) => a.map((b,bb) => b))

        let i1 = i-1
        let i2 = i+1
        let j1 = j-1
        let j2 = j+1

        if (newBoard[i1] && (newBoard[i1][j].hasStone === player)) {
            let oppLib1 = getLiberties(i1, j, player, i, j)
            if (oppLib1.group) {group.push(oppLib1)}
        }
        if (newBoard[i2] && (newBoard[i2][j].hasStone === player)) {
            let oppLib2 = getLiberties(i2, j, player, i, j)
            if (oppLib2.group) {group.push(oppLib2)}
        }
        if (newBoard[i][j1] && (newBoard[i][j1].hasStone === player)) {
            let oppLib3 = getLiberties(i, j1, player, i, j)
            if (oppLib3.group) {group.push(oppLib3)}
        }
        if (newBoard[i][j2] && (newBoard[i][j2].hasStone === player)) {
            let oppLib4 = getLiberties(i, j2, player, i, j)
            if (oppLib4.group) {group.push(oppLib4)}
        }

        console.log("opponent", i, j, player)
        console.log("group", group)

        group.forEach((e,i) => {
            if (e.liberties.length === 0) {
                deadGroup.push(e.group)
            }
        })

        console.log("deadGroup", deadGroup)
        if (deadGroup.length > 0) {return deadGroup}
        else {return null}
    }

    const getLiberties = (i, j, player, ix, iy) => {
        let newStone = player === currentPlayer ? `${i}-${j}` : `${ix}-${iy}`
        let group = [`${i}-${j}`]
        let liberties = []
        let newBoard = board.map((a,aa) => a.map((b,bb) => b))

        const checkAdjacent = (ii, jj) => {
            let i1 = ii-1
            let i2 = ii+1
            let j1 = jj-1
            let j2 = jj+1

            if (newBoard[i1] && (newBoard[i1][jj].hasStone === player)) {
                if (!group.includes(`${i1}-${jj}`)){
                    group.push(`${i1}-${jj}`)
                    checkAdjacent(i1, jj)
                }
            } else if (newBoard[i1] && (newBoard[i1][jj].hasStone === false && `${i1}-${jj}` != newStone)) {
                if (!liberties.includes(`${i1}-${jj}`)) {
                    liberties.push(`${i1}-${jj}`)
                }
            } 

            if (newBoard[i2] && (newBoard[i2][jj].hasStone === player)) {
                if (!group.includes(`${i2}-${jj}`)){
                    group.push(`${i2}-${jj}`)
                    checkAdjacent(i2, jj)
                }
            } else if (newBoard[i2] && (newBoard[i2][jj].hasStone === false && `${i2}-${jj}` != newStone)) {
                if (!liberties.includes(`${i2}-${jj}`)) {
                    liberties.push(`${i2}-${jj}`)
                }
            }

            if (newBoard[ii][j1] && (newBoard[ii][j1].hasStone === player)) {
                if (!group.includes(`${ii}-${j1}`)){
                    group.push(`${ii}-${j1}`)
                    checkAdjacent(ii, j1)
                }
            } else if (newBoard[ii][j1] && (newBoard[ii][j1].hasStone === false && `${ii}-${j1}` != newStone)) {
                if (!liberties.includes(`${ii}-${j1}`)) {
                    liberties.push(`${ii}-${j1}`)
                }
            }

            if (newBoard[ii][j2] && (newBoard[ii][j2].hasStone === player)) {
                if (!group.includes(`${ii}-${j2}`)){
                    group.push(`${ii}-${j2}`)
                    checkAdjacent(ii, j2)
                }
            } else if (newBoard[ii][j2] && (newBoard[ii][j2].hasStone === false && `${ii}-${j2}` != newStone)) {
                if (!liberties.includes(`${ii}-${j2}`)) {
                    liberties.push(`${ii}-${j2}`)
                }
            }

        }
        checkAdjacent(i, j)
        // console.log("group", group)
        // console.log("liberties", liberties)
        if (currentPlayer === player) {setGroupLiberties(liberties)}
        else {setOppLibs(liberties)}
        if (currentPlayer === player) {
            return liberties.length
        } else {
            return {group, liberties}
        }
    }


    return (
        <div className="behind-board-container" style={behindBoardStyle}>
            <Board />
            <Grid {...{getLiberties, getOpponentDeadGroups}} />
        </div>
    )
}

export default BehindBoard;