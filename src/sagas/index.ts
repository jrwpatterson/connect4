import {take, fork, spawn} from "redux-saga/effects";

import game from "./game";
import timer from "./timer";
import {NEW_GAME} from "actions/game";

export default function* root(): any {
    do {
        yield spawn(timer);
        yield fork(game);
    } while (yield take(NEW_GAME));
}
