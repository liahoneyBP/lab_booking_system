import React from 'react'
import {
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn, 
    NavBtnLink} from './NavbarElements';

const Navbar = () => {
  return (
    <>
    <Nav>
        <NavLink to="/">
            <p>Logo</p>
        </NavLink>
        <Bars />

        <NavMenu>
            <NavLink 
              to="/lab"
            >
                LAB
            </NavLink>
            <NavLink 
              to="/mybookings" 
              >
                MY BOOKINGS
            </NavLink>
            <NavLink 
              to="/schedule"
              >
                SCHEDULE
            </NavLink>
            <NavLink 
              to="/sign-up" 
              >
                Sign Up
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/sign-in">
                Sign In
            </NavBtnLink>
        </NavBtn>
    </Nav>
    </>
  )
}

export default Navbar
