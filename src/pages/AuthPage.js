import React, { useState, useContext } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const changeHandler = event => {
        setForm({...form, [event.target.type]: event.target.value});
    }

    const loginHandler = async () => {
        setLoading(true);
        axios.post("/api/auth/login", {...form})
            .then((response) => {
                auth.login(response.data.token, response.data.userId);
                history.push("/");
                setLoading(false);
            })
            .catch((e) => {
              message(e.response.data.message, "error");
              setLoading(false);
            });
    }

    return (
        <div className="log-in-page">
            <div className="center-align log-in-form">
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