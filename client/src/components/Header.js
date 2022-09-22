import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import image from '../photos/insta.png'
import homeImage from '../photos/home.png'
import { useContext, useEffect } from 'react'
import AlertContext from '../context/AlertContext'


const Header = () => {

const {userData} = useContext(AlertContext)



  return (
    <header className='header-container'>
        <div className='header-logo'>
         <Link to='/'> <img className='header-img' src={image} alt="isntagram logo" /></Link>  
        </div>
        <nav className='nav-item'>
            <ul className='nav-list'>
              {userData.id &&
                <li> <Link to = 'profile'> <img className='home-logo' src={homeImage} alt="home logo" />  </Link> </li>
              }
                <li className='nav-list-item'> <Link className='nav-list-link' to = '/logout'> Atsijungti</Link></li>
            </ul>
        </nav>

    </header>
  )
}

export default Header