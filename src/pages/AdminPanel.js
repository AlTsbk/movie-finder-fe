import React, { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { Loader } from "../components/Loader";
import { UserTable } from "../components/AdminPanel/UserTable";
import { useMessage } from "../hooks/message.hook";

export const AdminPanel = () => {
  const loading = false;
  const [users, setUsers] = useState([]);
  const message = useMessage();

  const getUsers = useCallback( async () => {

    await axios.get("/api/users/")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
            message(error.message, "error");  
        });
  }, [axios]);

  useEffect(()=>{
    getUsers();
  }, []);
  
  
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
      <div className="container">
        <Loader/>
        <UserTable users={users} getUsers={getUsers}/>
      </div>
    );
  }

  return (
  <div className="container">
    <UserTable users={users} getUsers={getUsers}/>
  </div>
    
  );

}