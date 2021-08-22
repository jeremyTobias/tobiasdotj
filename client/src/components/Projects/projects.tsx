import React from 'react';
// @ts-ignore
import { A } from 'hookrouter';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      projectsRoot: {
          flexGrow: 1,
          margin: 'auto',
      },
      card: {
          margin: theme.spacing(1),
          padding: theme.spacing(1),
          display: 'inline-block',
          height: 250,
          width: 345,
      }
  }),
);

function Projects() {
    const classes = useStyles();

    const projectsList = [
        {
            name: 'zillow',
            imgLoc: 'imgs/zillow.jpg',
            altText: 'zillow housing image',
            title: 'Zillow Housing Forecast',
            header: 'Housing Price Forecast',
            text: 'Forecasting housing prices with time series and FB Prophet',
        },
        {
            name: 'salary',
            imgLoc: 'imgs/salary.jpg',
            altText: 'zillow housing image',
            title: 'NCAA B\'ball Coach Salary Prediction',
            header: 'Salary Prediction',
            text: 'Predicting coaches\' salary using multi-variate linear regression',
        },
        /*{
            name: 'rideshare',
            imgLoc: 'imgs/zillow.jpg',
            altText: 'zillow housing image',
            title: 'Chicago Rideshare Analysis',
            header: 'Rideshare',
            text: 'Uber and stuff',
        },*/
    ]

    return (
      <div className={classes.projectsRoot}>
          {projectsList.map((project: any) => (
              <A href={'/project/' + project.name}  key={project.name}>
                  <Card className={classes.card}>
                      <CardActionArea>
                          <CardMedia
                            component='img'
                            alt={project.altText}
                            height='140'
                            image={project.imgLoc}
                            title={project.title}
                          />
                          <CardContent>
                              <Typography gutterBottom variant='h5' component='h2'>
                                  {project.header}
                              </Typography>
                              <Typography variant='body2' color='textSecondary' component='p'>
                                  {project.text}
                              </Typography>
                          </CardContent>
                      </CardActionArea>
                  </Card>
              </A>
          ))}
      </div>
    );
}

export default Projects;
