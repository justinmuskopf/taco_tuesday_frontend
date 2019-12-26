import React, {PureComponent} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,} from 'recharts';
import TacoTuesdayApiHelper from '../TacoTuesdayApiHelper'

export default class OrderLineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        TacoTuesdayApiHelper.getAllFullOrders().then(data => this.setState({data: data}));
    }

    render() {
        return (
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
        )
    }
}
