import React from 'react';
// @ts-ignore
import {A} from 'hookrouter';

function Nav() {
    return (
        <div>
            <nav>
                <ul className='nav-links'>
                    <A className='Link' href='/'>
                        <li>Home</li>
                    </A>
                    <A className='Link' href='/about'>
                        <li>About</li>
                    </A>
                    <A className='Link' href='/projects'>
                        <li>Projects</li>
                    </A>
                    <A className='Link' href='/contact'>
                        <li>Contact</li>
                    </A>
                </ul>
            </nav>
        </div>
    )
}

export default Nav
