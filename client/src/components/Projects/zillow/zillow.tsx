import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef} from '@material-ui/data-grid';
import ZChart from './charts/quadchart';
import ZTimeSeries from "./charts/timeseries";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 95 },
    {
        field: 'zip',
        headerName: 'Zip Code',
        width: 135},
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

    useEffect(() => {
        fetch('/zillow')
            .then((res) => res.json())
            .then((data) => {
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
                    <div>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={curData}
                                columns={columns}
                                pageSize={5}
                                disableSelectionOnClick
                            />
                        </div>
                        <ZChart chartData={curData}/>
                        <ZTimeSeries chartData={curData}/>
                    </div>

                // @ts-ignore
                setProjectData(dat);
            });
    }, []);

    return (
        <div>{projectData}</div>
    );
}

export default Zillow;
