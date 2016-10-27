import * as React from "react";
import { Dispatch, connect } from "react-redux";
import {TimerTickAction} from "../actions/timer"
import { GAME_OVER, changeTurn, NEW_GAME, PLACE_TOKEN, URL_Change } from "actions/game";
import {Store, Token} from "store/store";

interface ITimerProps{
        count: number;
        message: string;
        dispatch?: Dispatch<Store>;
};

class TimerComponent extends React.Component<ITimerProps, any> {
    props: ITimerProps;
    constructor(props: ITimerProps){
        super(props);
        this.props = props;
        setInterval(this.tick.bind(this),1000)
    }

    private tick(){
        this.props.dispatch(TimerTickAction())
        if(this.props.count === 0){
            this.props.dispatch(changeTurn())
        }
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
        message: store.timer.message
    }))(TimerComponent);
