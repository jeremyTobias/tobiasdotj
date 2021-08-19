import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          flexGrow: 1,
      },
      card: {
          margin: theme.spacing(1),
          display: 'inline-block',
          maxWidth: 345,
      }
  }),
);

function Projects() {
    const classes = useStyles();

    const projectsList = [
        {
            name: 'zillow',
            imgLoc: 'assets/zillow.jpg',
            altText: 'zillow housing image',
            title: 'Zillow Housing Forecast',
            header: 'Zillow',
            text: 'Words about things...',
        },
        {
            name: 'salary',
            imgLoc: 'assets/zillow.jpg',
            altText: 'zillow housing image',
            title: 'NCAA B\'ball Coach Salary Prediction',
            header: 'Salary',
            text: 'Words about things...',
        },
        {
            name: 'rideshare',
            imgLoc: 'assets/zillow.jpg',
            altText: 'zillow housing image',
            title: 'Chicago Rideshare Analysis',
            header: 'Rideshare',
            text: 'Words about things...',
        },
    ]

    return (
      <div className='Projects'>
          {projectsList.map((project: any) => (
              <Card className={classes.card}>
                  <CardActionArea href={'/project/' + project.name}>
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
                  <CardActions>
                      <Button size='small' color='primary'>
                          Learn more
                      </Button>
                  </CardActions>
              </Card>
          ))}
      </div>
    );
}

export default Projects;
