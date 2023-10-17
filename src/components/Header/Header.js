import React, { useState } from 'react'
import './Header.css'   
import {Link} from 'react-router-dom'
import brand from '../../images/logo.png'
const Header = () => {
   
  return (
    <>
        <nav className={`header`}>
            <div className='header-container'>
                <div>
                 <Link to='/' className='navlink'>Thunder client</Link>
                </div>
          
            </div>
        </nav>
    </>
  )
}

export default Header