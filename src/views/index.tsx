import * as React from "react";

import GameBoard from "components/GameBoard";
import GameOver from "components/GameOver";
import TimerComponent from "components/TimerComponent";

export default () => <div>
    <TimerComponent />
    <GameBoard />
    <GameOver />
</div>;
