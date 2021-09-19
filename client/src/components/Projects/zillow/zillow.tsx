import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

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
          backgroundColor: theme.palette.grey[500]
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
                        <Grid container spacing={6}>
                            <Grid item xs>
                                <h3>Recommendations</h3>
                                <p>
                                    Based on the chart below and the investor profile we recommend the following zip codes for
                                    investment: 95134, 80238, 20105. All three zip codes fall within the acceptable risk
                                    levels of the profile and provide potential for high dollar gains. Additionally,
                                    population growth across all three zip codes appears to be high, and it is assumed
                                    that these levels will only increase.
                                </p>
                                <Paper className={classes.paper}>
                                    <ZChart chartData={curData}/>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>
                                    <ZTimeSeries chartData={curData}/>
                                </Paper>
                            </Grid>
                        </Grid>
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
