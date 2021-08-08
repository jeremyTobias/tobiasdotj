import React from 'react';
// @ts-ignore
import { useRoutes } from 'hookrouter';
import Home from '../components/Home/home';
import About from '../components/About/about';
import Projects from '../components/Projects/projects';
import Nav from '../components/Nav/nav';
import Contact from '../components/Contact/contact';

// import '../styles/App.css';

function App() {

    const routes = {
        '/' :()=> <Home/>,
        '/about' :()=> <About/>,
        '/projects' :()=> <Projects/>,
        '/contact' :()=> <Contact/>
    };

    const routeResults = useRoutes(routes);

    return (
        <div className='App'>
            <header className='App-header'>
                <Nav/>
            </header>
            {routeResults||<h1>PAGE NOT FOUND</h1>}
        </div>
    );
}

export default App;
