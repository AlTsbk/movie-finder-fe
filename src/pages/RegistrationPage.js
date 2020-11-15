import React, { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook";

export const RegistrationPage = () => {
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
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

    useEffect(() => {
        message(error);
        clearError();
    }, [error]);

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
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            message(data.message, "rounded green accent-4");
        } catch (error) {
            
        }
    }

    return (
        <div className="log-in-page">
            <div className="card center-align log-in-form">
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