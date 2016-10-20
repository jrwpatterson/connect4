export enum Token {
    Empty,
    Red,
    Yellow
}

export interface Store {
    gameBoard: Token[][];
    turn: Token;
    winner?: Token;
}

export interface IMemRowObj{
    token: Token;
    count: number;
}