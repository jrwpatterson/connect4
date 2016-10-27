import * as _ from "lodash";
import { browserHistory } from 'react-router'
import { GAME_OVER, GameAction, NEW_GAME,TIME_OUT_CHANGE_TURN, PLACE_TOKEN, URL_Change } from "actions/game";
import { Store, Token } from "store/store";

const initialState = <Store>getGameBoard()
function getGameBoard(): any {
    let splitLocation = location.href.split("/");
    if (splitLocation[3].length > 0) {
        return {
            gameBoard: JSON.parse(splitLocation[3]),
            turn: splitLocation[4],
            winner: splitLocation[5]
        }
    } else {
        return {
            gameBoard: [
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
                [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
            ],
            turn: Token.Yellow,
            winner: null
        }
    }
}


export default function tokenReducer(state: Store = initialState, action: GameAction = null): Store {
    switch (action.type) {
        case NEW_GAME:
            window.history.pushState(null, null, "/");
            return initialState;
        case URL_Change:
            return <Store>getGameBoard();
        case GAME_OVER:
            return Object.assign({}, state, { winner: action.winner });
        case PLACE_TOKEN:
            let gameBoardClone = _.clone(state.gameBoard);
            const column = _.clone(gameBoardClone[action.column]);
            const emptyIndex = _.findIndex(column, c => c === Token.Empty);
            column.splice(emptyIndex, 1, state.turn);
            gameBoardClone[action.column] = column;
         case TIME_OUT_CHANGE_TURN:
            const gameBoard = gameBoardClone || _.clone(state.gameBoard);
            const turn = state.turn === Token.Yellow ? Token.Red : Token.Yellow;
            window.history.pushState(null, null, "/" + JSON.stringify(gameBoard)
                 + "/" + turn)
            if(gameBoardClone) return Object.assign({}, state, { gameBoard , turn });
            return Object.assign({}, state, { turn });
        default:
            return state;
    }
}
