import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import ZChart from './charts/quadchart';
import ZTimeSeries from "./charts/timeseries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          flexGrow: 1,
      },
      paper: {
          margin: theme.spacing(1),
          padding: theme.spacing(1),
          justifyContent: 'center',
          textAlign: 'center',
      },
      dataTable: {
          margin: theme.spacing(1),
          padding: theme.spacing(2),
          textAlign: 'center',
          height: 425,
          backgroundColor: 'white'
      }
  }),
);

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 95 },
    {
        field: 'zip',
        headerName: 'Zip Code',
        width: 135,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 115,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 175,
    },
    {
        field: 'metro',
        headerName: 'Metro',
        width: 175,
    },
    {
        field: 'county',
        headerName: 'County',
        width: 160,
    },
    {
        field: 'populationGrowth',
        headerName: 'Pop. Growth',
        type: 'number',
        width: 205,
    },
    {
        field: 'priceGrowth',
        headerName: 'Price Growth',
        type: 'number',
        width: 205,
    },
    {
        field: 'ranges',
        headerName: 'Range',
        type: 'number',
        width: 165,
    },
    {
        field: 'forecasts',
        headerName: '5yr Price Forecast ($USD)',
        type: 'number',
        width: 255,
    }
];


function Zillow() {
    const [projectData, setProjectData] = useState();
    const classes = useStyles();

    useEffect(() => {
        fetch('/zillow')
            .then((res) => res.json())
            .then((data: any) => {
                let count = 0;
                let curData = data.data.map((d: any) => {
                    return({
                        id: count++,
                        zip: d.zip,
                        state: d.state,
                        city: d.city,
                        metro: d.metro,
                        county: d.county,
                        populationGrowth: d.populationGrowth,
                        priceGrowth: (d.priceGrowth).toFixed(2),
                        ranges: d.ranges,
                        forecasts: (d.forecasts).toFixed(2),
                    });
                }) || 'Nothing to show';

                const dat =
                    <div className={classes.root}>
                        <p>I don't care about your gibberish. Take me to the <a href='#price_forecast_container'>price forecast...</a></p>
                        <p>
                            <h3>About this project</h3>
                            A hypothetical scenario where we have an investor looking to invest in real estate across
                            the U.S. We are tasked with determining the best location(s) for this investor based on their
                            investor profile and information retrieved from the Zillow housing database and any additional
                            data we deem relevant in order to build a useful investment model for this particular investor.
                        </p>
                        <p>
                            <h3>Investor Profile:</h3>

                                * Investor is interest in high growth in both dollar value and population <br/>
                                * Believes areas with booming populations will drive up prices beyond forecasted growth <br/>
                                * Moderate risk level. Prefers a small range relative to price
                        </p>
                        <p>
                            While it has been shown that California has the highest percent growth in dollar value for
                            given data, according to <a href='https://www.zipdatamaps.com/national/population/map-of-fastest-growing-zipcodes-in-the-united-states'>
                            ZipDataMaps
                            </a> , only one California zip code is present within the top
                            ten fastest growing zip codes. Therefore, we will be taking in to consideration to top 50
                            fastest growing zip codes, according to the <a href='https://www.zipdatamaps.com/national/population/map-of-fastest-growing-zipcodes-in-the-united-states'>
                            ZipDataMaps
                            </a> data.
                        <br/><br/>
                            In the below table, we see that of the top five zip codes Texas takes three of the spots.
                            However, we need to combine this with our housing data to get a better idea of if these zip
                            codes are right for our investor.
                        </p>
                        <DataGrid
                                className={classes.dataTable}
                                rows={curData}
                                columns={columns}
                                pageSize={5}
                                disableSelectionOnClick
                        />
                        <h3>Recommendations</h3>
                        <p>
                            Based on the chart below and the investor profile we recommend the following zip codes for
                            investment: 95134, 80238, 20105. All three zip codes fall within the acceptable risk
                            levels of the profile and provide potential for high dollar gains. Additionally,
                            population growth across all three zip codes appears to be high, and it is assumed
                            that these levels will only increase.
                        </p>

                        <h3>Quad Chart breakdown:</h3>
                        <p>
                            <strong>Price Forecast(y):</strong> The 5yr price forecast starting from the last available
                            data in 2020.
                        </p>
                        <p>
                            <strong>U/L Price Deviation(x):</strong> A measure of the total price of the upper and lower
                            predicted prices in relation to the mean price predicted for a given zipcode. The lower
                            the percent deviation, the tighter the range of a given prediction. Thus, a lower risk
                            to the investor in regards to potential profit gained when eventually selling a house
                            in the zipcode of choice.
                        </p>
                        <p>
                            The <strong>size</strong> of an observation is a representation of the current population
                            growth data gathered from <a href='https://www.zipdatamaps.com/national/population/map-of-fastest-growing-zipcodes-in-the-united-states'>
                            ZipDataMaps</a>, while the <strong>color</strong> of the observation represents the state
                            that zipcode resides in.
                        </p>
                        <Paper className={classes.paper}>
                            <ZChart chartData={curData}/>
                        </Paper>
                        <Paper id='price_forecast_container' className={classes.paper}>
                            <p>
                                <small style={{color: 'red'}}>
                                    <strong>Disclaimer:</strong> This is a hypothetical scenario and not actual investment advice.
                                    Please consult a qualified real estate investment advisor for actual investment advice.
                                </small>
                            </p>
                            <ZTimeSeries chartData={curData}/>
                        </Paper>
                    </div>

                // @ts-ignore
                setProjectData(dat);
            });
    }, [classes.dataTable, classes.paper, classes.root]);

    return (
        <React.Fragment>{projectData}</React.Fragment>
    );
}

export default Zillow;
