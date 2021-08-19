import React from 'react';
// @ts-ignore
import {A} from 'hookrouter';
import {AppBar, CssBaseline, Toolbar} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        color: 'whitesmoke',
        backgroundColor: theme.palette.grey[700],
    },
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
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'whitesmoke',
        flexShrink: 0,
    },
}));

function Nav(props: any) {
    const classes = useStyles();
    const {sections, title} = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.root}>
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
                        <A
                            color='inherit'
                            noWrap
                            key={section.title}
                            variant='body2'
                            href={section.url}
                            className={classes.toolbarLink}>
                                {section.title}
                        </A>
                    ))}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Nav
