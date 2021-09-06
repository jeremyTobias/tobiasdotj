import React from 'react';
// @ts-ignore
import { useRoutes } from 'hookrouter';
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Home from '../components/Home/home';
import About from '../components/About/about';
import Projects from '../components/Projects/projects';
import Project from "../components/Projects/project";
import Nav from '../components/Nav/nav';
import Contact from '../components/Contact/contact';
import Footer from "../components/Misc/Footer";

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
        backgroundColor: theme.palette.grey[500],
        color: 'whitesmoke'
    },
    header: {
        padding: theme.spacing(12),
        margin: 'auto',
    },
    main: {
        paddingTop: theme.spacing(8),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
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
            <header className={classes.header}>
                <Container>
                    <Nav title='TobiasDotJ' sections={sections}/>
                </Container>
            </header>
            <div>
            <Container component='main' className={classes.main}>
                {routeResults||<h1>PAGE NOT FOUND</h1>}
            </Container>
            </div>
            <footer className={classes.footer}>
                <Container maxWidth='sm'>
                    <Footer />
                </Container>
            </footer>
        </div>
    );
}

export default App;
