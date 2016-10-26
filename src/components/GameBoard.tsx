import * as _ from "lodash";
import * as React from "react";
import {Dispatch, connect} from "react-redux";
import {placeToken} from "actions/game";
import colors from "colors";
import {Store, Token} from "store/store";

interface GameBoardProps {
    gameBoard?: Token[][];
    turn?: Token;
    dispatch?: Dispatch<Store>;
}

const GameBoard = (props: GameBoardProps) => {
    const flippedGameBoard = _.reverse(_.zip.apply(_, props.gameBoard));

    const canPlaceToken = (col: number) => _.some(props.gameBoard[col], g => g === Token.Empty);

    const arrow = <span className="ion ion-chevron-down"
        style={Object.assign({}, arrowStyle, { color: colors[props.turn] })}></span>;
    const arrowRow = <div style={Object.assign({}, rowStyle, { height: 60 })}>
            {flippedGameBoard[0].map((token, col) =>
                <div style={tokenWrapperStyle}
                    onClick={() => canPlaceToken(col) && props.dispatch(placeToken(col))}>
                    {canPlaceToken(col) ? arrow : null}
                </div>)}
        </div>;

    const rows = flippedGameBoard.map(row =>
        <div style={rowStyle}>
            {row.map((token, col) =>
                <div style={tokenWrapperStyle}
                    onClick={() => canPlaceToken(col) && props.dispatch(placeToken(col))}>
                    <div style={Object.assign({}, tokenStyle, { backgroundColor: colors[token] })}></div>
                </div>)}
        </div>);

    return <div>{arrowRow}{rows}</div>;
};

const rowStyle = {
    textAlign: "center",
};
const tokenWrapperStyle = {
    cursor: "pointer",
    display: "inline-block",
    padding: 10,
    width: 100,
};
const tokenStyle = {
    border: "1px solid #ddd",
    borderRadius: "50%",
    height: 98,
    width: 98,
};
const arrowStyle = {
    fontSize: 45,
};

export default connect(store => ({ gameBoard: store.gameBoard, turn: store.turn }))(GameBoard);
