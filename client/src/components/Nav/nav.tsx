import React, {useEffect, useState} from 'react';
// @ts-ignore
import {A} from 'hookrouter';
import {AppBar, Container, CssBaseline, Fade, Toolbar, Slide} from '@material-ui/core';
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
        backgroundImage: `url(imgs/hale_sunset.jpg)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: theme.palette.grey[500],
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
    },
    titleLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'darkgray',
        fontSize: '72px',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
    },
    sToolbar: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    sToolbarTitle: {
        flex: 1,
    },
    sToolbarLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'darkgray',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
    },
    sTitleLink: {
        padding: theme.spacing(2),
        textDecoration: 'none',
        color: 'darkgray',
        fontSize: '24px',
        textShadow: '2px 2px 5px #000000',
        flexShrink: 0,
    },
    sContainer: {

    }
}));

function Nav(props: any) {
    const classes = useStyles();
    const {sections, title} = props;

    const [isShrunk, setShrunk] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            setShrunk((isShrunk) => {
                if ( !isShrunk && (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)) {
                    return true;
                }
                if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
                    return false;
                }
                return isShrunk;
            });
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
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
            <Fade in={isShrunk} timeout={500} mountOnEnter unmountOnExit>
                <AppBar className={classes.root}>
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
                                className={classes.sToolbarTitle}
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
                                    className={classes.sToolbarLink}
                                >
                                    {section.title}
                                </A>
                            ))}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Fade>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {isShrunk ? displayShrunkHeader() : displayNormHeader()}
        </React.Fragment>
    );
}

export default Nav;
