import React, {useState} from 'react';
import clsx from 'clsx';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {
    FormControl,
    FormHelperText,
    OutlinedInput,
    InputAdornment, Button, Checkbox, FormControlLabel, TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {stringify} from "querystring";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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
  }),
);

interface State {
    'const': number,
    'Bonus': number,
    'BonusPaid': number,
    'Buyout': number,
    'head_coaches - seasons_coached': number,
    'head_coaches - wl_pct': number,
    'head_coaches - tournament_wl_pct': number,
    'AvgAttendance': number,
    'StadiumCapacity': number,
    'PctCapacity': number,
    'MULTIYR_ELIG_RATE': number,
    'MULTIYR_RET_RATE': number,
    'gsr': number,
    'fgr': number,
}

/*'Conference_Atlantic_Coast_Conference' : number,
    'Conference_Big_12_Conference' : number,
    'Conference_Big_Ten_Conference' : number,
    'Conference_Conference_USA' : number,
    'Conference_Independent' : number,
    'Conference_Mid - American_Conference' : number,
    'Conference_Mountain_West_Conference' : number,
    'Conference_Pac - 12_Conference' : number,
    'Conference_Southeastern_Conference' : number,
    'Conference_Sun_Belt_Conference' : number,
}*/

function Salary() {
    const classes = useStyles();
    const [isChecked, setIsChecked] = useState(false);
    const [prevData, setPrevData] = useState({
        prevSal: '0',
        prevWin: 0,
        prevAvgAttendance: 0,
        prevConf: '',
    });
    const [predSal, setPredSal] = useState('');
    const [coachData, setCoachData] = useState<State>({
        'const': 1,
        'Bonus': 725093.5116,
        'BonusPaid': 102001.0698,
        'Buyout': 2160417,
        'head_coaches - seasons_coached': 6,
        'head_coaches - wl_pct': 0.553,
        'head_coaches - tournament_wl_pct': 0,
        'AvgAttendance': 41696,
        'StadiumCapacity': 68400,
        'PctCapacity': 60.96,
        'MULTIYR_ELIG_RATE': 0.9658385093,
        'MULTIYR_RET_RATE': 0.937007874,
        'gsr': 86,
        'fgr': 56,
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
        'Conference_Mountain_West_Conference' : 'MWC',
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

    const prevConf: any = () => {
        for (const k in confData) {
            if (confData[k].toString() === '1') {
                for (const j in conferences) {
                    if (k === j) {
                        return conferences[j]
                    }
                }
            }
        }
    }

    const savePrev: any = () => {
        setPrevData({
            prevSal: predSal,
            prevWin: coachData['head_coaches - wl_pct'],
            prevAvgAttendance: coachData.AvgAttendance,
            prevConf: conference
        });
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoachData({ ...coachData, [prop]: parseFloat(event.target.value) });
    };

    const doPredSal = () => {
        const allData = { ...coachData, ...confSelect };

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

                setPredSal(curData);

                savePrev();
            });
    };

    return (
      <React.Fragment>
          <div>
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
              <Button onClick={doPredSal}>Click Me</Button>
              <FormControl>
                  <FormControlLabel control={<Checkbox onChange={saveData} checked={isChecked}/>}
                                    label='Save Previous Prediction' />
              </FormControl>

          </div>
          {predSal !== '' &&
            <div>
                <p>Predicted Salary: {predSal}</p>
                {(isChecked && prevData.prevSal !== '') &&
                    <div>
                        <p>Previous Salary: {prevData.prevSal}</p>
                    </div>
                }
            </div>
          }
      </React.Fragment>
    );
}

export default Salary;
