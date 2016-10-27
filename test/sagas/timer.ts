import testSaga from "redux-saga-test-plan";
import * as test from "tape";
import {changeTurn} from "actions/game"
import {TimerTickAction, Timer_Tick} from "actions/timer"
import timer from "sagas/timer"
import {

} from "actions/timer"

test("Timer change Turn", t=>{
    const saga = testSaga(timer)
    let count = 0
    saga.next().take(Timer_Tick).next(TimerTickAction).next(count).put(changeTurn())
    t.end()
})

test("Timer doesnt change Turn", t=>{
    const saga = testSaga(timer)
    let count = 1
    saga.next().take(Timer_Tick).next(TimerTickAction).next(count).take(Timer_Tick)
    t.end()
})