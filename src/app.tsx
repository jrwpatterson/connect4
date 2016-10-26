import * as React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import {configureStore} from "./store";
import Index from "views";
import { Router, Route,withRouter, browserHistory } from "react-router";
const store = configureStore();
/* tslint:disable */
require("ionicons-npm/css/ionicons.css");
/* tslint:enable */


// const Appy = withRouter(React.createClass({

//     componentDidMount(){
//         console.log(this)
//     },
//     render(){ return(<div>
//          <Index /></div>)}
// }))


// export class App extends React.Component<any, any>{

//     render(){
//         return (<div>
//         {this.props.params.turn}
//          <Index /></div>)
//     }
// }

export default function App():any {
    // console.log(Appy)
    return  <Index />
}