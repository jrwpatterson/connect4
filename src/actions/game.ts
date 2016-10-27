import {Token} from "store/store";

export const GAME_OVER: "GAME_OVER" = "GAME_OVER";
export const NEW_GAME: "NEW_GAME" = "NEW_GAME";
export const PLACE_TOKEN: "PLACE_TOKEN" = "PLACE_TOKEN";
export const URL_Change: "URL_Change" = "URL_Change";
export const TIME_OUT_CHANGE_TURN: "TIME_OUT_CHANGE_TURN" = "TIME_OUT_CHANGE_TURN"

export interface PlaceTokenAction {
    type: "PLACE_TOKEN";
    column: number;
}
export interface NewGameAction {
    type: "NEW_GAME";
}
export interface GameOverAction {
    type: "GAME_OVER";
    winner: Token;
}
export interface UrlChangeAction{
    type: "URL_Change";
}
export interface TimeoutAction{
    type: "TIME_OUT_CHANGE_TURN"
}

export const newGame = () => <NewGameAction> { type: NEW_GAME };
export const urlChange = () => <UrlChangeAction>{type: URL_Change};
export const gameOver = (winner: Token) => <GameOverAction> {
    type: GAME_OVER,
    winner,
};
export const placeToken = (column?: number) => <PlaceTokenAction> {
    type: PLACE_TOKEN,
    column,
};
export const changeTurn = () => <TimeoutAction>{type: TIME_OUT_CHANGE_TURN}

export type GameAction = NewGameAction | TimeoutAction | GameOverAction | PlaceTokenAction | UrlChangeAction;
