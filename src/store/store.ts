export enum Token {
    Empty,
    Red,
    Yellow
}

export interface GameStore{
    gameBoard: Token[][];
    turn: Token;
    winner?: Token;
}

export interface TimerStore{
    count: number;
    message: string;
}

export interface Store {
    game?: GameStore,
    timer?: TimerStore
}



export interface IMemRowObj{
    token: Token;
    count: number;
}