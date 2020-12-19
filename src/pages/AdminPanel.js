import React, { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { Loader } from "../components/Loader";
import { UserTable } from "../components/AdminPanel/UserTable";
import { useMessage } from "../hooks/message.hook";

export const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const message = useMessage();

  const getUsers = useCallback( async () => {
    setLoading(true);
    await axios.get("/api/users/")
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
            message(error.message, "error");
            setLoading(false);
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
      <div>
        <Loader/>
        <UserTable users={users} getUsers={getUsers}/>
      </div>
    );
  }

  return (
  <div>
    <UserTable users={users} getUsers={getUsers}/>
  </div>
    
  );

}