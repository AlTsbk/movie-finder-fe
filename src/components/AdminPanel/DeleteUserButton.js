import React, { useCallback, useContext } from "react"
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/message.hook";

export const DeleteUserButton = ({user, getUsers}) => {

    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const message = useMessage();

    const onDelete = useCallback( async (userId) => {

        try{
          const response = await request(`/api/users/${userId}`, "DELETE");
      
          getUsers();
    
          message(response.message, "accept");
        }catch(error){
          message(error.message, "error");
        }
    
        
      }, [request]);

    return (
        <button className="btn-flat" onClick={onDelete.bind(Event,user._id)}><i className="material-icons red-text text-darken-4" >delete_forever</i></button>
    );
}