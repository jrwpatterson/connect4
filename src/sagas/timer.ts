
import {
    put,
    select,
    take
} from "redux-saga/effects";
import { takeLatest } from 'redux-saga'
import {
    changeTurn
} from "actions/game";
import {
    Timer_Tick
} from "actions/timer";
import {
    Store
} from "store/store";



export default function* timer(): any {
    while (yield take(Timer_Tick)) {
        const count = yield select<Store>(s => s.timer.count);
        if (count <= 0) {
            yield put(changeTurn())
        }
    }
}