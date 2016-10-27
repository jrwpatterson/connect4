export enum Token {
    Empty,
    Red,
    Yellow
}

export interface Store {
    game?: any;
    gameBoard: Token[][];
    turn: Token;
    winner?: Token;
}

export interface IMemRowObj{
    token: Token;
    count: number;
}