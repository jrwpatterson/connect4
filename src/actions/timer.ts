export const TimerTickAction = (counterID: number) => <TimeoutAction> {
    type: Timer_Tick,
    counter: counterID
};

export interface TimeoutAction{
    type: string
    counter: number
}

export const Timer_Tick: string = "TIMER_TICK"