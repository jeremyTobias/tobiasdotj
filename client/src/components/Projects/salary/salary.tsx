import React, {useState} from 'react';
import clsx from 'clsx';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {
    FormControl,
    FormHelperText,
    OutlinedInput,
    InputAdornment,
    Button,
    Checkbox,
    FormControlLabel,
    TextField, Container
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {DataGrid, GridColDef} from "@material-ui/data-grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
       root: {
          display: 'flex',
          flexWrap: 'wrap',
          flexGrow: 1,
          color: 'whitesmoke',
          justifyContent: 'center',
          backgroundColor:
              theme.palette.grey[100]
       },
      paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
      },
      margin: {
          margin: theme.spacing(1),
      },
      withoutLabel: {
          marginTop: theme.spacing(3),
      },
      textField: {
          width: '25ch',
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
        field: 'conference',
        headerName: 'Conference',
        headerAlign: 'center',
        width: 155,
    },
    {
        field: 'wins',
        headerName: 'Wins (%)',
        headerAlign: 'center',
        width: 135,
    },
    {
        field: 'attendance',
        headerName: 'Home Attendance (avg.)',
        headerAlign: 'center',
        width: 240,
    },
    {
        field: 'salary',
        headerName: 'Salary ($USD)',
        headerAlign: 'center',
        width: 175,
    },
];

interface State {
    'const': number,
    'head_coaches - wl_pct': number,
    'AvgAttendance': number,
}

function Salary() {
    const classes = useStyles();
    const [isChecked, setIsChecked] = useState(false);
    const [prevData, setPrevData] = useState([]);
    const [predSal, setPredSal] = useState('');
    const [coachData, setCoachData] = useState<State>({
        'const': 1,
        'head_coaches - wl_pct': 55.3,
        'AvgAttendance': 41696,
    });

    let confData: any = {
        'Conference_Atlantic_Coast_Conference': 1,
        'Conference_Big_12_Conference': 0,
        'Conference_Big_Ten_Conference': 0,
        'Conference_Conference_USA': 0,
        'Conference_Independent': 0,
        'Conference_Mid - American_Conference': 0,
        'Conference_Mountain_West_Conference': 0,
        'Conference_Pac - 12_Conference': 0,
        'Conference_Southeastern_Conference': 0,
        'Conference_Sun_Belt_Conference': 0,
    };

    const [confSelect, setConfSelect] = useState(confData);

    const conferences: any = {
        'Conference_Atlantic_Coast_Conference' : 'ACC',
        'Conference_Big_12_Conference' : 'Big 12',
        'Conference_Big_Ten_Conference' : 'Big Ten',
        'Conference_Conference_USA' : 'USA',
        'Conference_Independent' : 'Independent',
        'Conference_Mid - American_Conference' : 'MAC',
        'Conference_Mountain_West_Conference' : 'Midwest',
        'Conference_Pac - 12_Conference' : 'Pac-12',
        'Conference_Southeastern_Conference' : 'SEC',
        'Conference_Sun_Belt_Conference' : 'Sun Belt',
    };

    const defaultConf: any = Object.values(conferences)[0]
    const [conference, setConf] = useState(defaultConf);

    const saveData = () => {
        setIsChecked(!isChecked);
    };

    const handleConferenceSelect = (e: any, v: any) => {
        setConf(v);
        for (const k in conferences) {
            let val = conferences[k]
            if (v === val) {
                confData[k] = 1;
            } else {
                confData[k] = 0;
            }
        }
        setConfSelect(confData);
    };

    const savePrev = (data: any) => {
        let tempData: any = [];
        tempData.push.apply(tempData, prevData);
        tempData.push(data);
        setPrevData(tempData);
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(event.target.value);

        setCoachData({ ...coachData, [prop]: val });
    };

    const doPredSal = () => {
        const allData = { ...coachData, ...confSelect };

        if (allData['head_coaches - wl_pct'] > 1.0) {
            allData['head_coaches - wl_pct'] = allData['head_coaches - wl_pct'] / 100;
        }

        fetch('/salary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coachData: [allData]
            })
        })
            .then((res) => res.json())
            .then((data) => {
                let curData = data.data.map((d: any) => {
                    return(
                        d.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                            })
                    );
                }) || 'Nothing to show';

                if (isChecked) {
                    savePrev({
                        id: prevData.length + 1,
                        salary: curData[0],
                        wins: allData['head_coaches - wl_pct'] * 100,
                        attendance: allData['AvgAttendance'],
                        conference: conference
                    });
                }

                setPredSal(curData[0]);
            });
    };

    const clearPreds = () => {setPrevData([])}

    return (
      <React.Fragment>
          <Container>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <Autocomplete
                      id='outlined-conf-select'
                      options={Object.values(conferences)}
                      value={conference}
                      onInputChange={handleConferenceSelect}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              variant={'outlined'}
                          />
                      )}
                  />
                  <FormHelperText id='outlined-conf-helper-text'>Conference</FormHelperText>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <OutlinedInput
                  id="outlined-adornment-weight"
                  defaultValue={coachData['head_coaches - wl_pct']}
                  onChange={handleChange('head_coaches - wl_pct')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  aria-describedby="outlined-winperc-helper-text"
                  inputProps={{'aria-label': 'Win Percentage',
                  }}
                  />
                  <FormHelperText id="outlined-winperc-helper-text">Win/Loss Percentage</FormHelperText>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <OutlinedInput
                  id="outlined-adornment-avgattendance"
                  defaultValue={coachData['AvgAttendance']}
                  onChange={handleChange('AvgAttendance')}
                  endAdornment={<InputAdornment position="end">avg.</InputAdornment>}
                  aria-describedby="outlined-avgattendance-helper-text"
                  inputProps={{'aria-label': 'Average Attendance',
                  }}
                  />
                  <FormHelperText id="outlined-avgattendnace-helper-text">Avg Home Game Attendance</FormHelperText>
              </FormControl>
          </Container>
          <Container>
              <Button
                  onClick={doPredSal}
                  disabled={(isNaN(coachData['head_coaches - wl_pct']) ||
                      isNaN(coachData['AvgAttendance']) ||
                          conference === ''
                  )}
                  variant='contained'
              >
                  Predict Salary
              </Button>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                  <FormControlLabel control={<Checkbox onChange={saveData} checked={isChecked}/>}
                                    label='Save Prediction' />
              </FormControl>
          </Container>
          {predSal !== '' &&
            <Container>
                <p>Predicted Salary: {predSal}</p>
                {(isChecked && prevData.length > 0) &&
                    <div>
                        <p><strong>Previous Data:</strong></p>
                        <DataGrid
                            className={classes.dataTable}
                            rows={prevData}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                        />
                        <Button
                            onClick={clearPreds}
                        >Clear Table</Button>
                    </div>
                }
            </Container>
          }
      </React.Fragment>
    );
}

export default Salary;
