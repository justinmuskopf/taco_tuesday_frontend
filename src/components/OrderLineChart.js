import React, {Component} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,} from 'recharts';
import TacoTuesdayApiHelper from '../TacoTuesdayApiHelper'
import TTCounter from "./TTCounter";

export default class OrderLineChart extends Component {
    constructor(props) {
        super(props);

        TacoTuesdayApiHelper.getInstance().subscribeToFullOrders(this.updateData);

        this.state = {
            data: []
        }
    }

    updateData = (data) => this.setState({data: data, timestamp: Date.now()});

    render() {
        return (
            <div className="Chart-general">
                <h1>
                    <TTCounter field="fullOrderCount" suffix=" orders placed."/>
                </h1>
                <LineChart
                width={800}
                height={300}
                data={this.state.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="createdAt" hide={true}/>
                <YAxis dataKey="total" name="Order Total"/>
                <Tooltip name={"Test?"}/>
                <Legend/>

                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
            </div>
        )
    }
}
