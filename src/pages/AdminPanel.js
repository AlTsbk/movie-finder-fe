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
      const usersData = await request("/api/users/", "GET");

      setUsers(usersData);

    } catch (error) {
      message(error.message, "error");
    }
  }, [request]);

  useEffect(()=>{
    getUsers();
  }, [getUsers]);
  
  
  if(!users.length){
    if(loading){
      return (
        <div>
          <Loader/>
          <h1>No Data</h1>
        </div>
      );
    }

    return (
      <h1>No Data</h1>
    );

  }

  if(loading){
    return (
      <div>
        <Loader/>
        <UserTable users={users} getUsers={getUsers}/>
      </div>
    );
  }

  return (
    <UserTable users={users} getUsers={getUsers}/>
  );

}