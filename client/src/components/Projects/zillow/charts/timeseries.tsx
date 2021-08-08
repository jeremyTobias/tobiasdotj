import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import ZChart from "./quadchart";
import Plot from "react-plotly.js";

interface Props {
    chartData: any;
}

interface State {
    zipcode: any;
    forecasting: any;
}

class ZTimeSeries extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            zipcode: 20105,
            forecasting: ''
        }
    }
    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({
            zipcode: event.target.value
        });
    };

    doForecast = () => {
        this.setState({
            forecasting: 'Forecasting ' + this.state.zipcode
        })

        fetch('/zillow/forecast/' + this.state.zipcode )
            .then((res) => res.json())
            .then((data) => {
                let count = 0;
                let curData = JSON.parse(data.data).data.map((d: any) => {
                    return({
                        id: count++,
                        date: d.ds,
                        upper: d.yhat_upper,
                        lower: d.yhat_lower,
                        fcast: d.yhat
                    });
                }) || 'Nothing to show';

                const plot =
                    <Plot
                        data={[
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.fcast),
                                name: 'Avg. Price',
                                type: 'scatter',
                                mode: 'lines'
                            },
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.upper),
                                name: 'High Price',
                                type: 'scatter',
                                mode: 'lines'
                            },
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.lower),
                                name: 'Low Price',
                                type: 'scatter',
                                mode: 'lines'
                            }
                        ]}
                        layout={{
                            width: 900,
                            height: 550,
                            title: this.state.zipcode + ' Price Forecast',
                            hovermode: 'closest',
                            hoverlabel: { bgcolor: "#FFF" },
                            xaxis: {
                                title: {

                                    text: 'Date',
                                    font: {

                                        size:18
                                    },
                                    standoff: 300
                                },
                                autorange: true,
                                rangeselector: {
                                  buttons: [{
                                      count: 1,
                                      label: '1m',
                                      step: 'month',
                                      stepmode: 'backward'
                                  },{
                                      count: 6,
                                      label: '6m',
                                      step: 'month',
                                      stepmode: 'backward'
                                  },{
                                      step: 'all'
                                  }]
                                },
                                showline: false,
                                showgrid: false,
                                zeroline: false
                            },
                            yaxis: {
                                title: {
                                    text: 'Price (USD)',
                                    font: {
                                        size:18
                                    },
                                    standoff: 450
                                },
                                autorange: true,
                                tickformat: '$,.0f',
                                showline: false,
                                showgrid: false,
                                zeroline: false
                            }
                         }}
                    />

                this.setState({
                    forecasting: plot
                });
            });
    }

    showZip = () => {
        if (this.state!== null && this.state.zipcode !== undefined) {
            return this.state.zipcode;
        }
    }

    render() {
        return (
            <div>
                <FormControl variant='filled'>
                    <InputLabel id='zipcodes'>Zip Codes</InputLabel>
                    <Select
                        labelId='project-selector'
                        id='project-select'
                        defaultValue='20105'
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                    >
                        {
                            this.props.chartData.map((c: any) => (
                                <MenuItem value={c.zip.toString()} key={c.zip}>{c.zip}</MenuItem>
                            ))
                        }
                    </Select>
                    <Button variant='contained' onClick={this.doForecast}>Forecast</Button>
                </FormControl>
                <p>Current selection: {this.showZip()}</p>
                <div>{this.state.forecasting}</div>
            </div>
        )
    }
}

export default ZTimeSeries;
