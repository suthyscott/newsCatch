import React, {useState, useEffect} from 'react';
import '../../reset.css';
import './Header.css';
import {Link} from 'react-router-dom';

function Header(){

    let dropdown = React.createRef()
    // console.log(dropdown)

    const toggleMenu = () => {
        const {current} = dropdown
        console.log(current.classList)


        if(current.classList.contains('show-animation')){
            current.classList.add('hide-animation')
            current.classList.remove('show-animation')
        } else {
            current.classList.add('show-animation')
            current.classList.remove('hide-animation')
        }
    }

    return(
        <main  className='header'>
            <header>
                <h1>NewsCatch</h1>
            </header>

            <nav >
                <div id='nav-bar'>
                
                    <section className='nav-buttons'>
                        user_email@email.com
                        <button>My Account</button>
                        <button>Home</button>
                        <button>Saved Articles</button>
                        <button>Sign Out</button>
                    </section>
                </div>
                    <div id='menu-hamburger-icon'><i id='hamburger-icon' className='fas fa-bars fa-2x' onClick={toggleMenu} />
                </div>

            </nav>
            <div className='dropdown-menu show-animation' ref={dropdown}>

                <section id='nav-buttons-dropdown'>
                    <p id='user-email'>useremail@email.com</p>
                    <Link to='/myaccount'><button className='link'>My Account</button></Link>
                    <Link to='/home'><button className='link'>Home</button></Link>
                    <Link to='/savedarticles'><button className='link'>Saved Articles</button></Link>
                    <Link to='/'><button className='link'>Sign Out</button></Link>
                </section>
            </div>

        </main>
    )
}

export default Header