import React, {useEffect, useState} from 'react';
// @ts-ignore
import {A} from 'hookrouter';
import {
    AppBar,
    Container,
    CssBaseline,
    Toolbar,
    IconButton,
    Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        backgroundColor: '#494E6B',
        backdropFilter: 'blur(5px)',
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
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
        '&:hover': {
            color: '#98878F',
        },
    },
    titleLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: '#98878F',
        fontSize: '36px',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
        '&:hover': {
            color: 'whitesmoke',
        },
    },
    sToolbar: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        opacity: '50%',
        backdropFilter: 'blur(5px)',
    },
    drawer: {
        flexShrink: 0,
    },
    paper: {
        backgroundColor: '#494E6B',
    }
}));

function Nav(props: any) {
    const classes = useStyles();
    const {sections, title} = props;
    const [isSkinny, setSkinny] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = isSkinny;

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setSkinny((prevState) => ({ ...prevState, mobileView: true }))
            : setSkinny((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", setResponsiveness);

        return () => {
            window.removeEventListener("resize", setResponsiveness);
        }
    }, []);

    const displayDesktop = () => {
        return (
            <React.Fragment>
                <Container>
                    <Toolbar
                        component='nav'
                        variant='dense'
                        className={classes.toolbarSecondary}
                    >
                        <Typography
                            component='h2'
                            variant='h5'
                            color='inherit'
                            align='left'
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            <A
                                color='inherit'
                                key={title}
                                href='/'
                                className={classes.titleLink}
                            >
                                {title}
                            </A>
                        </Typography>
                        {sections.map((section: any) => (
                            <A
                                color='inherit'
                                key={section.title}
                                variant='body2'
                                href={section.url}
                                className={classes.toolbarLink}>
                                {section.title}
                            </A>
                        ))}
                    </Toolbar>
                </Container>
            </React.Fragment>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setSkinny((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setSkinny((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <React.Fragment>
                <Toolbar className={classes.sToolbar}>
                    <Typography
                        component='h2'
                        variant='h5'
                        color='inherit'
                        align='left'
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        <A
                            color='inherit'
                            key={title}
                            href='/'
                            className={classes.titleLink}
                        >
                            {title}
                        </A>
                    </Typography>
                    <IconButton
                      {...{
                        edge: 'start',
                        color: 'inherit',
                        'aria-label': 'menu',
                        'aria-haspopup': 'true',
                        onClick: handleDrawerOpen,
                      }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor='right'
                        open={drawerOpen}
                        onClose={handleDrawerClose}
                        className={classes.drawer}
                        classes={{ paper: classes.paper}}
                    >
                        {sections.map((section: any) => (
                            <A
                                color='inherit'
                                key={section.title}
                                variant='body2'
                                href={section.url}
                                className={classes.toolbarLink}
                            >
                                {section.title}
                            </A>
                        ))}
                    </Drawer>
                </Toolbar>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.root}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </React.Fragment>
    );
}

export default Nav;
