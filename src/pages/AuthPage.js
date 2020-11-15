import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error]);

    const changeHandler = event => {
        setForm({...form, [event.target.type]: event.target.value});
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
            history.push("/");
        } catch (error) {
            
        }
    }

    return (
        <div className="log-in-page">
            <div className="card center-align log-in-form">
                <h3>LOG IN</h3>
                <div className="input-field">
                    <input id="email_inline" type="email" className="validate" onChange={changeHandler}/>
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input id="password_inline" type="password" className="validate" onChange={changeHandler}/>
                    <label>Password</label>
                </div>
                <a className="waves-effect waves-light btn-large yellow darken-4" onClick={loginHandler} disabled={loading}>Submit</a>
                <a className="waves-effect waves-light btn-large yellow darken-4 grey darken-4" href="/register">Register</a>
            </div>
        </div>
    );
}