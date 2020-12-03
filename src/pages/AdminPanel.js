import React, { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../components/Loader";
import { UserTable } from "../components/AdminPanel/UserTable";
import { AuthContext } from "../context/AuthContext";
import {useHttp} from '../hooks/http.hook'
import { useMessage } from "../hooks/message.hook";

export const AdminPanel = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [users, setUsers] = useState([]);
  const message = useMessage();

  const getUsers = useCallback( async () => {
    try {
      const usersData = await request("/api/users/", "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setUsers(usersData);

    } catch (error) {
      message(error.message, "error");
    }
  }, [request]);

  useEffect(()=>{
    getUsers();
  }, [getUsers]);

  if(loading){
    return (
     <Loader/>
    )
  }
  if(!users.length){
    return (
      <h1>No Data</h1>
    )
  }
  
  return (
    <UserTable users={users} getUsers={getUsers}/>
  );
}