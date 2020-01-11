import CountUp from "react-countup";
import React, {Component} from "react";
import TacoTuesdayApiHelper from "../TacoTuesdayApiHelper";

export default class TTCounter extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data: 0,
            field: props.field,
            prefix: props.prefix,
            suffix: props.suffix
        };

        TacoTuesdayApiHelper.getInstance().subscribeToOrderSummary(this.updateData);
    }

    updateData = (data) => this.setState({data: data[this.state.field], timestamp: Date.now()});

    componentDidMount() {
    }

    render() {
        return (
            <CountUp prefix={this.state.prefix} end={this.state.data} suffix={this.state.suffix}/>
        )
    }
}
