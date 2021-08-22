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
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey[200]
      },
      dataTable: {
          margin: theme.spacing(1),
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
          height: 425,
          backgroundColor: theme.palette.grey[200]
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
    let curData: any;

    const classes = useStyles();

    useEffect(() => {
        fetch('/zillow')
            .then((res) => res.json())
            .then((data: any) => {
                let count = 0;
                curData = data.data.map((d: any) => {
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
                        <DataGrid
                                className={classes.dataTable}
                                rows={curData}
                                columns={columns}
                                pageSize={5}
                                disableSelectionOnClick
                        />
                        <Grid container spacing={2}>
                            <Grid item xs>
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
    }, []);

    return (
        <React.Fragment>{projectData}</React.Fragment>
    );
}

export default Zillow;
