import React, {Component} from 'react';
import {CartesianGrid, Legend, Bar, BarChart, Tooltip, Label, XAxis, YAxis,} from 'recharts';
import TacoTuesdayApiHelper from '../TacoTuesdayApiHelper'


export default class TacoCountBarChart extends Component {
    constructor(props) {
        super(props);

        this.apiHelper = TacoTuesdayApiHelper.getInstance();
        this.apiHelper.subscribeToOrderSummary(this.test);

        this.state = {
            data: []
        }
    }

    apiHelper;

    componentDidMount() {
        //TacoTuesdayApiHelper.fetchOrderSummary();
    }

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

    test = (data) => this.setState({data: data.tacos, timestamp: Date.now()});

    render() {
        console.log("render?");
        return (
            <BarChart width={800} height={300} data={this.state.tacos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        )
    }
}
