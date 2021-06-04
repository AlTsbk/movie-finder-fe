import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Search } from "./Search";

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
                <div className="navigation">
                    <div className="logo">
                        <NavLink to="/"><img src="https://i.ibb.co/0fPvZCX/logo.png" alt="Logo" /></NavLink>
                    </div>
                    <Search />
                    <div>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li className={isAdmin ? "" : "hide"}><NavLink to="/adminPanel">Панель администратора</NavLink></li>
                            <li><NavLink to={`/user/${auth.userId}`}>Профиль</NavLink></li>
                            <li><NavLink onClick={logoutHandler} to="/">Выйти</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }else{
        return (
            <nav className="grey darken-4 navbar">
                <div className="navigation">
                    <div className="logo">
                            <NavLink to="/"><img src="https://i.ibb.co/0fPvZCX/logo.png" alt="Logo" /></NavLink>
                    </div>
                    <Search />
                    <div>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to="/login">Войти</NavLink></li>
                        </ul> 
                    </div>
                </div>
            </nav>
        );
    }
}