import {combineReducers} from "redux"

import game from "./game";
import timer from "./timer";

export default combineReducers({game, timer});
