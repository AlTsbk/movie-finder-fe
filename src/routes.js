import React from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { PageNotFound } from "./pages/PageNotFound";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { AdminPanel } from "./pages/AdminPanel"

export const useRoutes = isAuth => {
    
    if(isAuth){
        return (
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/adminPanel" exact component={AdminPanel} />
                <Route path="/user/:id" exact component={ProfilePage} />
                <Route component={PageNotFound} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/login" exact component={AuthPage}/>
            <Route path="/register" exact component={RegistrationPage} />
            <Route path="/user/:id" exact component={ProfilePage} />
            <Redirect to="/login" />
        </Switch>
    )
};
