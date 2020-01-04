import React from 'react';
//import logo from './logo.svg';
import taco from './taco.svg'
import './App.css';
import OrderLineChart from "./components/OrderLineChart";
import TacoCountBarChart from "./components/TacoCountBarChart";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={taco} className="App-logo" alt="logo"/>
                <br/>
                <div>
                    <div>All Full Orders</div>
                    <div className="Chart-general">
                        <OrderLineChart/>
                    </div>
                    <div>All Tacos Ordered</div>
                    <div className="Chart-general">
                        <TacoCountBarChart/>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
