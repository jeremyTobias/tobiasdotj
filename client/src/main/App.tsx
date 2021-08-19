import React from 'react';
// @ts-ignore
import {A, useRoutes} from 'hookrouter';
import Home from '../components/Home/home';
import About from '../components/About/about';
import Projects from '../components/Projects/projects';
import Nav from '../components/Nav/nav';
import Contact from '../components/Contact/contact';
import Footer from "../components/Misc/Footer";
import {CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function App() {
    const classes = useStyles();

    const routes = {
        '/' :()=> <Home/>,
        '/about' :()=> <About/>,
        '/projects' :()=> <Projects/>,
        '/contact' :()=> <Contact/>
    };

    const routeResults = useRoutes(routes);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component='main' className={classes.main}>
                <Nav title='TobiasDotJ' sections={sections}/>
                {routeResults||<h1>PAGE NOT FOUND</h1>}
            </Container>
            <footer className={classes.footer}>
                <Container>
                    <Footer />
                </Container>
            </footer>
        </div>
    );
}

export default App;
