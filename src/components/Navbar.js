import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState();

    const logoutHandler = event =>{
        auth.logout();
    }

    const getUser = async () => {
        if(auth.userId){
            await axios.get(`/api/users/${auth.userId}`)
                .then((response) => {
                    setIsAdmin(response.data.role === "Admin");
                })
                .catch((error) => {
                    
                });
        }
       
    };

    useEffect(()=>{
        getUser();
    });

    if(auth.isAuthenticated){
        return (
            <nav className="grey darken-4 navbar">
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">Movie Finder</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/findMovie">Find Movie</NavLink></li>
                    <li className={isAdmin ? "" : "hide"}><NavLink to="/adminPanel">AdminPanel</NavLink></li>
                    <li><NavLink to={`/user/${auth.userId}`}>Profile</NavLink></li>
                    <li><NavLink onClick={logoutHandler} to="/">Logout</NavLink></li>
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
                    <li><NavLink to="/findMovie">Find Movie</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
                </div>
            </nav>
        );
    }
}