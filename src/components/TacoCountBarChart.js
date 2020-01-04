import React, {PureComponent} from 'react';
import {CartesianGrid, Legend, Bar, BarChart, Tooltip, Label, XAxis, YAxis,} from 'recharts';
import TacoTuesdayApiHelper from '../TacoTuesdayApiHelper'


export default class TacoCountBarChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        TacoTuesdayApiHelper.getAllFullOrders().then(data => {
            let tacoCounts = {};
            for (const order of data) {
                let orderTacos = order.tacos;
                for (const tacoType in orderTacos) {
                    if (!tacoCounts.hasOwnProperty(tacoType)) {
                        tacoCounts[tacoType] = {
                            name: TacoTuesdayApiHelper.tacoTypeToName(tacoType),
                            count: 0
                        };
                    }

                    tacoCounts[tacoType].count += orderTacos[tacoType];
                }
            }

            this.setState({data: Object.values(tacoCounts)});
        });
    }

    render() {
        return (
            <BarChart width={800} height={300} data={this.state.data}>
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
