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
    let flippedGameBoard: Token[][] = _.unzip(gameBoard)

    if(!winnerToken){
        winnerToken = getVertical(flippedGameBoard)
    }


    if (!winnerToken) {
        winnerToken = getDiagonalToken(gameBoard);
    }

    if (!winnerToken) {
        let reverseGameBoard: Token[][] = _.cloneDeep(gameBoard)
        _.reverse(reverseGameBoard)
        winnerToken = getDiagonalToken(reverseGameBoard)
    }

    if(!winnerToken){
        
    }


    if (winnerToken) {
        return winnerToken;
    }

    return null;
}

function getDiagonalToken(flippedGameBoard: Token[][]): any {
     for (let i = 0; i < 2; i++) {
         let base = flippedGameBoard[i][0];
         let basePlus1 = base === flippedGameBoard[i + 1][1];
         let basePlus2 = base === flippedGameBoard[i + 2][2];
         let basePlus3 = base === flippedGameBoard[i + 3][3];
        if (basePlus1 && basePlus2 && basePlus3 && base != Token.Empty) {
            return base;
        }
     }
}

function getVertical(flippedGameBoard: Token[][]):Token{
    flippedGameBoard.forEach(row => {
        let count = 0;
        let lastToken = row[0];
        row.forEach(quickToken => {
            if (quickToken !== Token.Empty && quickToken === lastToken) {
                if (count === 3) {
                    return quickToken;
                } else {
                    count++;
                }
            } else {
                count = 0;
            }
            lastToken = quickToken;
        });
    });
    return null
}

export default function* game(): any {
    while (yield take(PLACE_TOKEN)) {
        const gameBoard = yield select < Store > (s => s.gameBoard);
        const winner = getWinner(gameBoard);
        if (winner) {
            yield put(gameOver(winner));
            break;
        }
    }
}
