import React from 'react';
import Plot from 'react-plotly.js';

interface Props {
    chartData: any;
}

class ZChart extends React.Component<Props> {
    constructor(props: any) {
        super(props);

        this.state = { chartData: [] };
    }

    render() {
        return(
            <div>
                <Plot
                    data={[
                        {
                            x: this.props.chartData.map((r: any) => r.ranges),
                            y: this.props.chartData.map((f: any) => f.forecasts),
                            type: 'scatter',
                            mode: 'markers',
                            transforms: [{
                                type: 'groupby',
                                groups:  this.props.chartData.map((s: any) => s.state)
                            }],
                            marker: {
                                symbol: 'circle',
                                size: this.props.chartData.map((range: any) => range.populationGrowth),
                                // sizeref: 4,
                                sizemode: 'area'
                            },
                            text: this.props.chartData.map((c: any) => c.city + ', ' + c.state + ' ' + c.zip),
                            hovertemplate:
                                "<b>%{text}</b><br><br>" +
                                "Avg. Price Forecast: %{y:$,.0f}<br>" +
                                "Upper/Lower Price Deviation: %{x:.0%}<br>" +
                                "Population Growth Rate (2018): %{marker.size:,}%<br>" +
                                "<extra></extra>"
                      }
                    ]}
                    layout={{
                        width: 900,
                        height: 750,
                        title: 'Top 50 Growing Zip Codes 5yr Price Forecasts and Price Range Deviation',
                        hovermode: "closest",
                        hoverlabel: { bgcolor: "#FFF" },
                        legend: {orientation: 'h', y: -0.3},
                        xaxis: {
                            title: {
                                text: 'Upper/Lower Price Deviation',
                                font: {
                                    size:18
                                },
                                standoff: 300
                            },
                            tickformat: '.0%',
                            showline: true,
                            showgrid: false,
                            zeroline: false,
                            anchor: 'free',
                            position: 0.5
                        },
                        yaxis: {
                            title: {
                                text: 'Price Forecast (USD)',
                                font: {
                                    size:18
                                },
                                standoff: 450
                            },
                            tickformat: '$,.0f',
                            showline: true,
                            showgrid: false,
                            zeroline: false,
                            anchor: 'free',
                            position: 0.5
                        }
                    }}
                />
            </div>
        );
    }
}

export default ZChart;
