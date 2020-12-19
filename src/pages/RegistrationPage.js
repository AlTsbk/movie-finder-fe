import React, { useEffect, useState } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";

export const RegistrationPage = () => {
    const history = useHistory();
    const message = useMessage();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    });

    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        surname: ""
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    } 

    const changePasswordHandler = event => {
        setPassword(()=>{
            return {...password, [event.target.name]: event.target.value}
        });

        if(event.target.name === "password" && password.confirmPassword === event.target.value){
            setForm({...form, password: event.target.value});
        }

        if(event.target.name === "confirmPassword" && password.password === event.target.value){
            setForm({...form, password: event.target.value});
        }
    }

    const registerHandler = async () => {
        setLoading(true);
        axios.post("/api/auth/register", {...form})
            .then((response) => {
                message(response.message, "accept");
                history.push("/");
                setLoading(false);
            })
            .catch((e) => {
                if(e.response.data.errors){
                    e.response.data.errors.forEach(error => {
                        message(error.msg, "error");
                    });
                }else{
                    message(e.response.data.message, "error");
                }
                
                setLoading(false);
            });
    }

    return (
        <div className="log-in-page">
            <div className="center-align log-in-form">
                <h3>REGISTER</h3>
                <div className="input-field">
                    <input id="email_inline" type="email" name="email" className="validate" onChange={changeHandler}/>
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input id="password_inline" type="password" name="password" className="validate" onChange={changePasswordHandler}/>
                    <label>Password</label>
                </div>
                <div className="input-field">
                    <input id="confirm_password_inline" type="password" name="confirmPassword" className="validate" onChange={changePasswordHandler}/>
                    <label>Confirm password</label>
                </div>
                <div className="input-field">
                    <input id="name_inline" type="text" name="name" className="validate" onChange={changeHandler}/>
                    <label>Name</label>
                </div>
                <div className="input-field">
                    <input id="surname_inline" type="text" name="surname" className="validate" onChange={changeHandler}/>
                    <label>Surname</label>
                </div>
                <a className="waves-effect waves-light btn-large yellow darken-4" onClick={registerHandler} disabled={loading}>Submit</a>
                <a className="waves-effect waves-light btn-large grey darken-4" href="/login">Log In</a>
            </div>
        </div>
    ) 
}