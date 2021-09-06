import React, {useEffect, useState} from 'react';
// @ts-ignore
import {A} from 'hookrouter';
import {
    AppBar,
    Container,
    CssBaseline,
    Fade,
    Toolbar,
    Slide,
    IconButton,
    Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.grey[700],
        opacity: '80%',
        backdropFilter: 'blur(5px)',
    },
    toolbar: {
        backgroundImage: `url('./imgs/hale_sunset.jpg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: theme.palette.grey[700],
        backgroundBlendMode: 'screen',
        width: '100%',
        minHeight: '20vh',
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
        color: 'darkgray',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
        '&:hover': {
            color: 'black',
        },
    },
    titleLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'darkgray',
        fontSize: '72px',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
        '&:hover': {
            color: 'black',
        },
    },
    sToolbar: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        opacity: '80%',
        backdropFilter: 'blur(5px)',
    },
    sTitleLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'darkgray',
        fontSize: '24px',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
        '&:hover': {
            color: 'black',
        },
    },
    drawer: {
        flexShrink: 0,
    },
    paper: {
        backgroundColor: theme.palette.grey[700],
    }
}));

function Nav(props: any) {
    const classes = useStyles();
    const {sections, title} = props;
    const [isShrunk, setShrunk] = useState(false);
    const [isSkinny, setSkinny] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = isSkinny;

    useEffect(() => {
        const onScroll = () => {
            setShrunk((isShrunk) => {
                if ( !isShrunk && (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)) {
                    return true;
                }
                if (isShrunk && document.body.scrollTop < 20 && document.documentElement.scrollTop < 20) {
                    return false;
                }
                return isShrunk;
            });
        };

        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setSkinny((prevState) => ({ ...prevState, mobileView: true }))
            : setSkinny((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", setResponsiveness);
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener("resize", setResponsiveness);
        }
    }, []);

    const displayNormHeader = () => {
        return (
            <Slide in={!isShrunk} timeout={500} mountOnEnter unmountOnExit>
                <AppBar className={classes.root}>
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            component='h2'
                            variant='h5'
                            color='inherit'
                            align='center'
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
                    </Toolbar>
                    <Container>
                        <Toolbar
                            component='nav'
                            variant='dense'
                            className={classes.toolbarSecondary}
                        >
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
                </AppBar>
            </Slide>
        );
    };

    const displayShrunkHeader = () => {
        return (
            <AppBar className={classes.root}>
                <Fade in={isShrunk} timeout={500} mountOnEnter unmountOnExit>
                    <Container>
                        <Toolbar
                            component='nav'
                            variant='dense'
                            className={classes.sToolbar}
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
                                    className={classes.sTitleLink}
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
                                    className={classes.toolbarLink}
                                >
                                    {section.title}
                                </A>
                            ))}
                        </Toolbar>
                    </Container>
                </Fade>
            </AppBar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setSkinny((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setSkinny((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <AppBar className={classes.root}>
                <Toolbar className={classes.sToolbar}>
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
                        anchor='left'
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
                            className={classes.sTitleLink}
                        >
                            {title}
                        </A>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {mobileView ? displayMobile() : isShrunk ? displayShrunkHeader() : displayNormHeader()}
        </React.Fragment>
    );
}

export default Nav;
