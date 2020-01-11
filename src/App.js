import React from 'react';
import taco from './taco.svg'
import './App.css';
import OrderLineChart from "./components/OrderLineChart";
import TacoCountBarChart from "./components/TacoCountBarChart";
import TTCounter from "./components/TTCounter";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={taco} className="App-logo" alt="logo"/>
                <br/>
                <h1>
                    <TTCounter prefix="$" field="total" suffix=" spent."/>
                </h1>
                <div>
                    <TacoCountBarChart/>
                    <OrderLineChart/>
                </div>
            </header>
        </div>
    );
}

export default App;
