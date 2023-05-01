import React from 'react'
import { Link } from 'react-router-dom'
import style from './navBar.module.scss'

function NavBar() {
  return (
    <nav className={style.navBarContainer}>
        <Link to={'/news'}>News</Link>
        <Link to={'/weather'}>Weather</Link>
        <Link to={'/currency'}>Currency</Link>
        <Link to={'/recipe'}>Recipe</Link>
        <Link to={'/historyFacts'}>History Facts</Link>
    </nav>
  )
}

export default NavBar