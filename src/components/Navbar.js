import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

/*Navbar*/
const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-2'>
            <div className='container-fluid'>
                <Link to='/' className=  ' text  navbar-brand ml-5 '><span className='nav'>Contacts-App</span></Link>
            </div>
        </nav >
    )
}

export default Navbar