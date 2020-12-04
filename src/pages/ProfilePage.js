import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { formatter } from '../models/formatter';
import { useMessage } from "../hooks/message.hook";

export const ProfilePage = () => {
    
    const message = useMessage();
    const [user, setUser] = useState(null);
    const userId = useParams().id;

    const getUser = async () => {
        await axios.get(`/api/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                message(error.message, "error");
            });
    };

    useEffect(()=>{
        getUser();
    }, []);

    if(!user){
        return(
            <Loader/>
        )
    }

    return(
        <div className="container">
            <h2>{user.name} {user.surname}</h2>
            <h5 className="grey-text text-darken-2">Email: {user.email}</h5>
            <h5 className="grey-text text-darken-2">Role: {user.role}</h5>
            <h5 className="grey-text text-darken-2">Status: {formatter.statusFormatter(user.status)}</h5>
        </div>
    )
}