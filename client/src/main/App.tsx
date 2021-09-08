import React from 'react';
// @ts-ignore
import { useRoutes } from 'hookrouter';
import {CssBaseline, Container, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Home from '../components/Home/home';
import About from '../components/About/about';
import Projects from '../components/Projects/projects';
import Project from "../components/Projects/project";
import Nav from '../components/Nav/nav';
import Contact from '../components/Contact/contact';
import Footer from "../components/Misc/footer";

const sections = [
    {title: 'Projects', url: '/projects'},
    {title: 'Blog', url: '#'},
    {title: 'About', url: '/about'},
    {title: 'Contact', url: '/contact'}
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: 'whitesmoke',
        backgroundImage: `url('./imgs/hale_sunset.jpg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#98878F',
        backgroundBlendMode: 'screen',
    },
    main: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        backgroundColor: 'rgba(73, 78, 107, 0.5)',
        color: 'whitesmoke',
        backdropFilter: 'blur(5px)',
    },
    footer: {
        backgroundColor: '#494E6B',
        padding: theme.spacing(2),
        width: '100%',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
    },
}));

function App() {
    const classes = useStyles();

    const routes = {
        '/' :()=> <Home/>,
        '/about' :()=> <About/>,
        '/projects' :()=> <Projects/>,
        '/project/:proj' :({proj}: any)=> <Project proj={proj} />,
        '/contact' :()=> <Contact/>
    };

    const routeResults = useRoutes(routes);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Nav title='Tobias.J' sections={sections} />
            <Container>
                <Paper component='main' className={classes.main}>
                    <Container>
                        {routeResults||<h1>PAGE NOT FOUND</h1>}
                    </Container>
                </Paper>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth='sm'>
                    <Footer />
                </Container>
            </footer>
        </div>
    );
}

export default App;
