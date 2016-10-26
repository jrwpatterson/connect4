import * as _ from "lodash";
import { browserHistory } from 'react-router'
import { GAME_OVER, GameAction, NEW_GAME, PLACE_TOKEN, URL_Change } from "actions/game";
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
            location.pathname = "/";
            return initialState;
        case URL_Change:
            return <Store>getGameBoard();
        case GAME_OVER:
            return Object.assign({}, state, { winner: action.winner });
        case PLACE_TOKEN:
            const gameBoard = _.clone(state.gameBoard);
            const column = _.clone(gameBoard[action.column]);
            const emptyIndex = _.findIndex(column, c => c === Token.Empty);
            column.splice(emptyIndex, 1, state.turn);
            gameBoard[action.column] = column;
            const turn = state.turn === Token.Yellow ? Token.Red : Token.Yellow;
            window.history.pushState(null, null, "/" + JSON.stringify(gameBoard)
                + "/" + turn)
            return Object.assign({}, state, { gameBoard, turn });
        default:
            return state;
    }
}
