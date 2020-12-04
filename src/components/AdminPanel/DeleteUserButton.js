import React from "react"
import axios from "axios";
import { useMessage } from "../../hooks/message.hook";

export const DeleteUserButton = ({user, getUsers}) => {

    const message = useMessage();

    const onDelete = async (userId) => {

      await axios.delete(`/api/users/${userId}`)
          .then((response) => {
            getUsers();
            message(response.message, "accept");
          })
          .catch((error) => {
              message(error.message, "error");  
          }); 
        
      };

    return (
        <button className="btn-flat" onClick={onDelete.bind(Event,user._id)}><i className="material-icons red-text text-darken-4" >delete_forever</i></button>
    );
}