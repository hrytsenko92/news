import React from 'react'
import { Link } from 'react-router-dom'
import style from './navBar.module.scss'

function NavBar() {
  return (
    <nav className={style.navBarContainer}>
        <Link to={'/'}>News</Link>
        <Link to={'/weather'}>Weather</Link>
        <Link to={'/currency'}>Currency</Link>
    </nav>
  )
}

export default NavBar