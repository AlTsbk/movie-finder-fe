import React, { useContext } from "react"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/message.hook";

export const RoleSwitcher = ({user, getUsers}) => {

    const { userId } = useContext(AuthContext);
    const message = useMessage();

    const onChangeRole = async (user) => {

      const userId = user._id;
      const role = user.role === "Admin" ? "User" : "Admin";

      await axios.put("/api/users/changeRole", {userId, role})
        .then((response) => {
          getUsers();
          message(response.message, "accept");
        })
        .catch((error) => {
            message(error.message, "error");  
        });

      };

    return (
        <div className="switch">
            <label>
                <input disabled={user._id === userId} type="checkbox" checked={user.role === "Admin"} onChange={onChangeRole.bind(Event,user)}/>
                <span className="lever"></span>
            </label>
        </div>
    )
}