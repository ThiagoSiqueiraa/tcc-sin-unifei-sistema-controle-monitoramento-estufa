import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from './NavBar.module.css'

const Navbar = ({ history }) => {
  return (
    <nav>
      <div className={classnames['nav-container']}>
        <NavLink exact to="/" className={classnames['nav-logo']}>
          <h2>Minha Estufa</h2>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
