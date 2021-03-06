import React from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { PageNotFound } from "./pages/PageNotFound";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { AdminPanel } from "./pages/AdminPanel"
import { MovieDetails } from "./pages/MovieDetails";
import { FindMoviePage } from "./pages/FindMoviePage";

export const useRoutes = isAuth => {
    
    if(isAuth){
        return (
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/adminPanel" exact component={AdminPanel} />
                <Route path="/user/:id" exact component={ProfilePage} />
                <Route path="/movie/:id" exact component={MovieDetails} />
                <Route path="/findMovie/:searchText" exact component={FindMoviePage} />
                <Redirect to="/" />
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
            <Route path="/movie/:id" exact component={MovieDetails} />
            <Route path="/findMovie/:searchText" exact component={FindMoviePage} />
            <Redirect to="/login" />
        </Switch>
    )
};
