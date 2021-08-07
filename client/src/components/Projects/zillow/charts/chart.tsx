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
                            marker: {
                                symbol: 'circle',
                                color: this.props.chartData.map((pop: any) => pop.priceGrowth),
                                size: this.props.chartData.map((range: any) => range.populationGrowth),
                                sizeref: 10
                            },
                            text: this.props.chartData.map((c: any) => c.city + ', ' + c.state + ' ' + c.zip),
                            hovertemplate:
                                "<b>%{text}</b><br><br>" +
                                "Avg. Price Forecast: %{y:$,.0f}<br>" +
                                "Upper/Lower Price Deviation: %{x:.0%}<br>" +
                                "Population Growth Rate (2018): %{marker.size:,}%<br>" +
                                "Price Growth Rate: %{marker.color:.0%}" +
                                "<extra></extra>"
                      }
                    ]}
                    layout={{
                        width: 900,
                        height: 750,
                        title: '5yr Price Forecasts and Price Range Deviation',
                        xaxis: {
                            title: {
                                text: 'Deviation range from forecast',
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
                                text: '5yr price forecast (USD)',
                                standoff: 500
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
