import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef} from '@material-ui/data-grid';


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
        width: 165,
    },
    {
        field: 'priceGrowth',
        headerName: 'Price Growth',
        width: 165,
    },
    {
        field: 'ranges',
        headerName: 'Range',
        width: 125,
    },
    {
        field: 'forecasts',
        headerName: '5yr Price Forecast',
        type: 'number',
        width: 195,
    }
];

function Zillow() {
    const [projectData, setProjectData] = useState();

    useEffect(() => {
        fetch('/zillow')
            .then((res) => res.json())
            .then((data) => {
                let count = 0;
                const curData = data.data.map((d: any) => {
                    return({
                        id: count++,
                        zip: d.zip,
                        state: d.state,
                        city: d.city,
                        metro: d.metro,
                        county: d.county,
                        populationGrowth: d.populationGrowth + '%',
                        priceGrowth: (d.priceGrowth * 100).toFixed(0) + '%',
                        ranges: d.ranges,
                        forecasts: '$' + (d.forecasts).toFixed(2),
                    });
                }) || 'Nothing to show';

                const dat = <DataGrid
                              rows={curData}
                              columns={columns}
                              pageSize={10}
                              //rowsPerPageOptions={[5,10,15]}
                              disableSelectionOnClick
                            />;

                // @ts-ignore
                setProjectData(dat);
            });
    }, []);

    return (
        <div style={{ height: 650, width: '100%' }}>{projectData}</div>
    );
}

export default Zillow;
