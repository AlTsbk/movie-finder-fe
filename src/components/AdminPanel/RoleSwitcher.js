import React, { useCallback, useContext } from "react"
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/message.hook";

export const RoleSwitcher = ({user, getUsers}) => {

    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const message = useMessage();

    const onChangeRole = useCallback( async (user) => {

        try{
          const userId = user._id;
          const role = user.role === "Admin" ? "User" : "Admin";
    
          const response = await request("/api/users/changeRole", "PUT", {userId, role}, {
            Authorization: `Bearer ${token}`
          });
    
          getUsers();
    
          message(response.message, "accept");
        }catch(error){
          message(error.message, "error");
        }
      }, [request]);

    return (
        <div className="switch">
            <label>
                <input type="checkbox" checked={user.role === "Admin"} onChange={onChangeRole.bind(Event,user)}/>
                <span className="lever"></span>
            </label>
        </div>
    )
}