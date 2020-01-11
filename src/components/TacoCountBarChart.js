import React, {Component} from 'react';
import {CartesianGrid, Legend, Bar, BarChart, Tooltip, Label, XAxis, YAxis,} from 'recharts';
import TacoTuesdayApiHelper from '../TacoTuesdayApiHelper'
import TTCounter from "./TTCounter";


export default class TacoCountBarChart extends Component {
    constructor(props) {
        super(props);

        this.apiHelper = TacoTuesdayApiHelper.getInstance();
        this.apiHelper.subscribeToOrderSummary(this.updateData);

        this.state = {
            data: []
        }
    }

    apiHelper;

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.timestamp === this.state.timestamp) {
            return;
        }

        let tacoCounts = [];
        let newTacoCounts = this.state.data;

        for (const tacoType in newTacoCounts) {
            tacoCounts.push({
                name: this.apiHelper.tacoTypeToName(tacoType),
                count: newTacoCounts[tacoType]
            });
        }

        this.setState({tacos: tacoCounts});
    }

    updateData = (data) => this.setState({data: data.tacos, timestamp: Date.now()});

    render() {
        return (
            <div className="Chart-general">
            <h1>
                <TTCounter field="tacoCount" suffix=" tacos eaten."/>
            </h1>
            <BarChart width={800} height={300} data={this.state.tacos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
            </div>
        )
    }
}
