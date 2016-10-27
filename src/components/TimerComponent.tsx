import * as React from "react";
import { Dispatch, connect } from "react-redux";
import {TimerTickAction} from "../actions/timer"
import { GAME_OVER, changeTurn, NEW_GAME, PLACE_TOKEN, URL_Change } from "actions/game";
import {Store, Token} from "store/store";

interface ITimerProps{
        count: number;
        message: string;
        counter: number;
        dispatch?: Dispatch<Store>;
};

class TimerComponent extends React.Component<ITimerProps, any> {
    props: ITimerProps;
    counter;
    constructor(props: ITimerProps){
        super(props);
        console.log("Restart")
        this.props = props;
        this.counter = setInterval(this.tick.bind(this),1000)
    }
    
    private tick(){
        this.props.dispatch(TimerTickAction(this.counter))
    }

    public render(): JSX.Element {
        return (<div>
            <h1>
                {this.props.count} Seconds Left {this.props.message}
            </h1>
        </div>);
    }
}

export default connect(
    (store) => ({
        count: store.timer.count,
        message: store.timer.message,
        counter: store.timer.counter
    }))(TimerComponent);
