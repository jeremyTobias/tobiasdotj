import React, {useEffect, useState} from 'react';
// @ts-ignore
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Zillow from './zillow';
import Rideshare from './rideshare';
import Salary from './salary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function Projects() {
    const classes = useStyles();
    const [project, setProject] = useState();
    const [projectData, setProjectData] = useState();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // @ts-ignore
        setProject(event.target.value as string);
    };

    useEffect(() => {
        if (project === 'zillow' || project === undefined) {
            // @ts-ignore
            setProjectData(<Zillow />)
        } else if (project === 'salary') {
            // @ts-ignore
            setProjectData(<Salary />)
        } else if (project === 'rideshare') {
            // @ts-ignore
            setProjectData(<Rideshare />)
        }
    }, [project]);

    return (
      <div className='Projects'>
          <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>Project</InputLabel>
              <Select
                  labelId='project-selector'
                  id='project-select'
                  defaultValue={'zillow'}
                  onChange={handleChange}
              >
                  <MenuItem value={'zillow'}>Zillow Housing</MenuItem>
                  <MenuItem value={'salary'}>Salary Prediction</MenuItem>
                  <MenuItem value={'rideshare'}>O'Hare Rideshare</MenuItem>
              </Select>
          </FormControl>
          {projectData}
      </div>
    );
}

export default Projects;
