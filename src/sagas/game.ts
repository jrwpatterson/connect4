import * as _ from "lodash";
import {
    put,
    select,
    take,
} from "redux-saga/effects";

import {
    PLACE_TOKEN,
    gameOver,
} from "actions/game";
import {
    Store,
    Token,
    IMemRowObj,
} from "store/store";



function getWinner(gameBoard: Token[][]): Token {

    let winnerToken: Token;

    const verticalWinner = _.chain(gameBoard)
        .filter(g => _.uniq(g).length === 1 && g[0] !== Token.Empty)
        .map(g => g[0])
        .value();

    if (verticalWinner.length) {
        return verticalWinner[0];
    }

    let flippedGameBoardPreZipp: Token[][] = _.cloneDeep(gameBoard);
    let flippedGameBoard: Token[][] = _.unzip(flippedGameBoardPreZipp);

    if (!winnerToken) {
        winnerToken = getHoriz(flippedGameBoard);
    }


    if (!winnerToken) {
        winnerToken = getDiagonalToken(gameBoard);
    }

    if (!winnerToken) {
        winnerToken =  getDiagonalToken(gameBoard, true);
    }

    if (!winnerToken && isDraw(flippedGameBoardPreZipp)) {
        return Token.Empty;
    }
//return Token.Empty; 

    if (winnerToken) {
        return winnerToken;
    }

    return null;
}

function isDraw(grid: Token[][]) {
    return !grid.some(g=> g.find(a=>a===Token.Empty)>-1)
}

function getDiagonalToken(flippedGameBoard: Token[][], reverse = false): any {
    for (let i = 0; i < 3; i++) {
        let base = flippedGameBoard[i][0];
        let offset = [1, 2, 3];
        if (reverse) {
            base = flippedGameBoard[i][3];
            offset = [2, 1, 0];
        }

        let basePlus1 = base === flippedGameBoard[i + 1][offset[0]];
        let basePlus2 = base === flippedGameBoard[i + 2][offset[1]];
        let basePlus3 = base === flippedGameBoard[i + 3][offset[2]];
        if (basePlus1 && basePlus2 && basePlus3 && base != Token.Empty) {
            return base;
        }
    }
}

function getHoriz(flippedGameBoard: Token[][]): Token {
    let winningToken: Token;
    flippedGameBoard.forEach(row => {
        let count = 0;
        let lastToken = Token.Empty;
        row.forEach(quickToken => {
            if (!winningToken && quickToken !== Token.Empty && quickToken === lastToken) {
                if (count === 2) {
                    winningToken = quickToken;
                    return;
                } else {
                    count++;
                }
            } else {
                count = 0;
            }
            lastToken = quickToken;
        });
    });
    return winningToken;
}

export default function* game(): any {
    while (yield take(PLACE_TOKEN)) {
        const gameBoard = yield select < Store > (s => s.gameBoard);
        const winner = getWinner(gameBoard);
        if (winner!==null && winner>-1) {
            yield put(gameOver(winner));
            break;
        }
    }
}
