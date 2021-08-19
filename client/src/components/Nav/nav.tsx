import React from 'react';
// @ts-ignore
import {A} from 'hookrouter';
import {Toolbar} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

function Nav(props: any) {
    const classes = useStyles();
    const {sections, title} = props;
    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={classes.toolbarTitle}
                >
                    <Link
                        color='inherit'
                        noWrap
                        key={title}
                        href='/'
                        className={classes.toolbarLink}
                    >
                        {title}
                    </Link>
                </Typography>
            </Toolbar>
            <Toolbar component='nav' variant='dense' className={classes.toolbarSecondary}>
                {sections.map((section: any) => (
                    <Link
                    color='inherit'
                    noWrap
                    key={section.title}
                    variant='body2'
                    href={section.url}
                    className={classes.toolbarLink}>
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}

export default Nav
