import React from "react"
import axios from "axios";
import { useMessage } from "../../hooks/message.hook";


export const BlockUserButtons = ({user, getUsers}) => {
    const message = useMessage();

    const onStatusChange =  async (user) => {
      const userId = user._id;
      const status = user.status === "active" ? "banned" : "active";

        await axios.put("/api/users/ban", {userId,status})
          .then((response) => {
            getUsers();
            message(response.message, "accept");
          })
          .catch((error) => {
              message(error.message, "error");  
          });  
        
      };

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