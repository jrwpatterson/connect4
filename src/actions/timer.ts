export const TimerTickAction = () => <TimeoutAction> {
    type: TimerTick
};

export interface TimeoutAction{
    type: string
}

export const TimerTick: string = "TIMER_TICK"