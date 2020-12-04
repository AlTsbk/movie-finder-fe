import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "./Loader";

export const Navbar = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = event =>{
        auth.logout();
    }

    if(auth.isAuthenticated){
        return (
            <nav className="grey darken-4 navbar">
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">Movie Finder</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/adminPanel">AdminPanel</NavLink></li>
                    <li><NavLink onClick={logoutHandler} to="/">Logout</NavLink></li>
                    <li><NavLink to={`/user/${auth.userId}`}>Profile</NavLink></li>
                </ul>
                </div>
            </nav>
        );
    }else{
        return (
            <nav className="grey darken-4 navbar">
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">Movie Finder</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
                </div>
            </nav>
        );
    }
}