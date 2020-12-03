import React, { useCallback, useContext } from "react"
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/message.hook";


export const BlockUserButtons = ({user, getUsers}) => {

  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  const message = useMessage();

    const onStatusChange = useCallback( async (user) => {
        try {
          const userId = user._id;
          const status = user.status === "active" ? "banned" : "active";
          const response = await request("/api/users/ban", "PUT", {userId,status});
    
          getUsers();
          
          message(response.message, "accept");
    
        } catch (error) {
          message(error.message, "error");
        }
        
      }, [request]);

    return (
        <div>
            <button className={user.status === "active" ? "btn-flat" : "btn-flat notDisplay"} onClick={onStatusChange.bind(Event,user)}>
                <i className="material-icons yellow-text text-darken-4">block</i>
            </button>
            <button className={user.status === "banned" ? "btn-flat" : "btn-flat notDisplay"} onClick={onStatusChange.bind(Event,user)}>
                <i className="material-icons green-text green-darken-4">check</i>
            </button>
        </div>
        
    );
}