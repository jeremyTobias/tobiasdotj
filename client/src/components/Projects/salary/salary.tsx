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
    TextField,
    Paper
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
          margin: theme.spacing(1),
          padding: theme.spacing(1),
          justifyContent: 'center',
          textAlign: 'center',
      },
      margin: {
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1)
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

interface Coach {
    'const': number,
    'head_coaches - wl_pct': number,
    'AvgAttendance': number,
}

function Salary() {
    const classes = useStyles();
    const [isChecked, setIsChecked] = useState(false);
    const [prevData, setPrevData] = useState([]);
    const [predSal, setPredSal] = useState('');
    const [coachData, setCoachData] = useState<Coach>({
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

    const handleChange = (prop: keyof Coach) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <div>
              <p>I don't care about your gibberish. Take me to the <a href='#salary_predictions_container'>salary predicting...</a></p>
              <h3>About this project</h3>
              <p>
                  A hypothetical scenario where you are looking to hire a new coach and want to predict what that coach is worth.
              </p>
              <p>
                  Looking at the salary by conference, I created a swarm to also represent a coaches win/loss
                  percentage by color of the marker and average attendance by the size (normalized to fit well on the
                  chart). The win/loss percentages are binned in to ten groups for ease of analyses and visualization.
              </p>
              <p>
                  It can be seen that while there are some outliers, in general, coaches with a higher win/loss percentage are
                  paid more in their respective conference. Looking at average game attendance, however, it is not completely
                  obvious that average attendance plays a major part in a coach’s salary. Average attendance was chosen
                  over stadium capacity due to being a slightly stronger metric, and the hypothesis that just because a
                  stadium can hold a large amount of people, it does not necessarily translate to a large paying audience.
                  Whereas average attendance may more likely contribute to such an outcome.
              </p>
              <p>
                  It should be noted though that it can be observed that the highest paid coaches are in the largest winning
                  percentage bracket and appear to have relatively high game attendance averages. One might also assume
                  that high attendance is strongly correlated to a high win percentage. Which makes sense.
              </p>
              <Paper className={classes.paper} >
                <img src='/imgs/coach_bw_plot.png' alt='Box and Whisker plot for coach data' />
              </Paper>
          </div>
          <Paper className={classes.paper}>
            <div id='salary_predictions_container'>
                <p>
                    <small style={{color: 'red'}}>
                        <strong>Disclaimer:</strong> This is a hypothetical scenario. Do not use this salary predictor to
                        determine your coach's salary. If you happen to be a hiring manager for a NCAA football team, it is
                        highly recommended you consult your own analytics team and/or Human Resources personnel.
                    </small>
                </p>
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
                    inputProps={{'aria-label': 'Average Attendance'
                    }}
                    />
                    <FormHelperText id="outlined-avgattendnace-helper-text">Avg Home Game Attendance</FormHelperText>
                </FormControl>
            </div>
            <div>
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
            </div>
          </Paper>

            {predSal !== '' &&
                <Paper className={classes.paper}>
                    <div>
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
                    </div>
                </Paper>
            }
      </React.Fragment>
    );
}

export default Salary;
