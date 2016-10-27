import { TimerTick } from "actions/timer";
import { GAME_OVER, GameAction, NEW_GAME,TIME_OUT_CHANGE_TURN, PLACE_TOKEN, URL_Change } from "actions/game";

import * as _ from "lodash";

class messages {
    static Good: string = "Loads of Time!";
    static Bad: string = "Getting Close!";
    static Ugly: string = "AAAAAARGH!";

}

const initialState = getInitialTimer()

function getInitialTimer(){
  return {
      count:10,
      message: messages.Good
    }
}


export default function timerReducer(state = initialState, action):any  {
    switch (action.type) {
        case GAME_OVER:
        case NEW_GAME: 
        case PLACE_TOKEN:
        case URL_Change:
        case TIME_OUT_CHANGE_TURN:
            return initialState;
        case TimerTick:
            let count = _.clone(state.count)
            let message = _.clone(state.message)
            count--;
            if(count>5){
                message = messages.Good
            } else if(count>2){
                message = messages.Bad
            } else{
                message = messages.Ugly
            }
            return  Object.assign({}, state, { count, message });
        default:
            return state;
    }
}