import * as React from "react";
import {Dispatch, connect} from "react-redux";

import {newGame} from "actions/game";
import colors from "colors";
import {Store, Token} from "store/store";

interface GameOverProps {
    winner: Token;
    dispatch?: Dispatch<Store>;
}

const players = {
    [Token.Red]: "Red",
    [Token.Yellow]: "Yellow",
};
const coloredMessage = (token: Token) =>
    <span><span style={{ color: colors[token] }}>{players[token]}</span> wins!</span>;

const GameOver = (props: GameOverProps) => {
    if (props.winner === null || props.winner===undefined || props.winner.toString().length==0) {
        return null;
    }

    const gameOverMessage = props.winner === Token.Empty
        ? "It's a draw!"
        : coloredMessage(props.winner);

    return <div style={overlayStyle}>
        <div style={modalStyle}>
            <p style={titleStyle}>{gameOverMessage}</p>
            <button style={buttonStyle} onClick={() => props.dispatch(newGame())}>New game?</button>
        </div>
    </div>;
};

const titleStyle = {
    fontFamily: "sans-serif",
    fontSize: 30,
};

const modalStyle = {
    background: "white",
    borderRadius: 10,
    margin: "0 auto",
    padding: 20,
    textAlign: "center",
    width: 600,
};

const buttonStyle = {
    backgroundColor: "#0af",
    borderRadius: 6,
    borderStyle: "none",
    color: "white",
    cursor: "pointer",
    padding: "10px 20px",
};

const overlayStyle = {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.2)",
    bottom: 0,
    display: "flex",
    justifyItems: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
};

export default connect(store => ({ winner: store.game.winner }))(GameOver);
