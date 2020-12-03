import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import {useHttp} from '../hooks/http.hook'
import { formatter } from '../models/formatter';


export const ProfilePage = () => {
    
    const [user, setUser] = useState(null);
    const {request} = useHttp();
    const userId = useParams().id;

    const getUser = useCallback(async () => {
        try {
            console.log(userId);
            if(userId){
                const userData = await request(`/api/users/${userId}`, "GET");
            
                setUser(userData);
            }
        } catch (error) {
            console.log(error);
        }
    }, [request]);

    useEffect(()=>{
        getUser();
    }, [getUser]);

    if(!user){
        return(
            <Loader/>
        )
    }

    return(
        <div>
            <h2>{user.name} {user.surname}</h2>
            <h5 className="grey-text text-darken-2">Email: {user.email}</h5>
            <h5 className="grey-text text-darken-2">Role: {user.role}</h5>
            <h5 className="grey-text text-darken-2">Status: {formatter.statusFormatter(user.status)}</h5>
        </div>
    )
}