import React, { useContext } from "react"
import formatter from "../../models/formatter"
import { BlockUserButtons } from "./BlockUserButtons"
import { DeleteUserButton } from "./DeleteUserButton"
import { RoleSwitcher } from "./RoleSwitcher"
import { AuthContext } from "../../context/AuthContext";

export const UserTable = ({users, getUsers}) => {

    const {userId} = useContext(AuthContext);

    if(!users.length){
        return (
            <h1>Нет данных</h1>
        )
    }
    return (
        <div>
        <h1>Пользователи</h1>
        <table className="responsive-table">
            <thead>
            <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Роль</th>
                <th>Админ</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            { users.map((user, index) => {
                return (
                <tr key={user._id}>
                    <td>{index+1}</td>
                    <td>{user.name} {user.surname}</td>
                    <td>{formatter.statusFormatter(user.status)}</td>
                    <td>{user.role}</td>
                    <td>
                        <RoleSwitcher user={user} getUsers={getUsers}/>
                    </td>
                    <td className={user._id === userId ? "actions hidden" : "actions"}>
                        <DeleteUserButton user={user} getUsers={getUsers}/>
                        <BlockUserButtons user={user} getUsers={getUsers}/>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
}