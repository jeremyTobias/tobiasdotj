import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Plot from 'react-plotly.js';

interface Props {
    chartData: any;
}

interface State {
    zipcode: any;
    forecasting: any;
    styles: any;
}

class ZTimeSeries extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            zipcode: 20105,
            forecasting: '',
            styles: makeStyles((theme: Theme) =>
                        createStyles({
                            root: {
                                flexGrow: 1,
                                justifyContent: 'center',
                            },
                            paper: {
                                padding: theme.spacing(2),
                                justifyContent: 'center',
                                textAlign: 'center',
                            },
                        }),
                    )
        }
    }

    handleChange = (event: any, value: any) => {
        this.setState({
            zipcode: value
        });
    };

    doForecast = () => {
        this.setState({
            forecasting: 'Forecasting ' + this.state.zipcode + ', please wait.'
        })

        fetch('/zillow/forecast/' + this.state.zipcode )
            .then((res) => res.json())
            .then((data) => {
                let count = 0;
                const curData = JSON.parse(data.data).data.map((d: any) => {
                    return({
                        id: count++,
                        date: d.ds,
                        upper: d.yhat_upper,
                        lower: d.yhat_lower,
                        fcast: d.yhat
                    });
                }) || 'Nothing to show';

                const dates = curData.map((d: any) => new Date(d.date));
                const firstDate = Math.min(...dates);
                const lastDate = Math.max(...dates);

                const plot =
                    <Plot
                        data={[
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.upper),
                                name: 'High Price',
                                type: 'scatter',
                                mode: 'lines',
                                line: {
                                    color: '#13F113'
                                }
                            },
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.fcast),
                                name: 'Avg. Price',
                                type: 'scatter',
                                mode: 'lines',
                                line: {
                                    color: '#0C8BF6'
                                }
                            },
                            {
                                x: curData.map((d: any) => d.date),
                                y: curData.map((d: any) => d.lower),
                                name: 'Low Price',
                                type: 'scatter',
                                mode: 'lines',
                                line: {
                                    color: '#F6400C'
                                }
                            }
                        ]}
                        layout={{
                            title: this.state.zipcode + ' Price Forecast',
                            hovermode: 'closest',
                            hoverlabel: { bgcolor: '#FFF' },
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
                                      label: '1y',
                                      step: 'year',
                                      stepmode: 'backward'
                                  },{
                                      count: 5,
                                      label: '5y',
                                      step: 'year',
                                      stepmode: 'backward'
                                  },{
                                      step: 'all'
                                  }]
                                },
                                rangeslider: {range: [firstDate, lastDate]},
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
                                    standoff: 475
                                },
                                autorange: true,
                                tickformat: '$,.0f',
                                showline: false,
                                showgrid: false,
                                zeroline: false
                            }
                         }}
                        config={{
                            responsive: true,
                            scrollZoom: true,
                            displaylogo: false
                        }}
                    />

                this.setState({
                    forecasting: plot
                });
            });
    }

    render() {
        const zipcodes = this.props.chartData.map((c: any) => c.zip.toString());
        const forecast = this.state.forecasting;
        // const classes = this.state.styles;

        return (
            <React.Fragment>
                <Grid container spacing={4}>
                    <Grid item sm={2}>
                        <Autocomplete
                            id='zipcode-select'
                            freeSolo
                            options={zipcodes}
                            onChange={this.handleChange}
                            defaultValue='20105'
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Zip Code Selection'
                                    margin='normal'
                                    variant='outlined'
                                />
                            )}
                        />
                    </Grid>
                    <Grid style={{marginTop: 'auto', marginBottom: 'auto'}} item sm={2}>
                        <Button
                            variant='contained'
                            onClick={this.doForecast}
                            disabled={this.state.zipcode === '' || isNaN(this.state.zipcode) || this.state.zipcode === null}
                        >
                            Forecast
                        </Button>
                    </Grid>
                </Grid>
                <div>{forecast}</div>
            </React.Fragment>
        );
    }
}

export default ZTimeSeries;
