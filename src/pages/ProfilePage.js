import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import formatter from '../models/formatter';
import { useMessage } from "../hooks/message.hook";
import {movieApi} from "../models/movieApi"

export const ProfilePage = () => {
    
    const message = useMessage();
    const {getMovieDetails, getMovieCredits} = movieApi();
    const [user, setUser] = useState(null);
    const [genresDataSet, setGenresDataSet] = useState(null);
    const [actorsDataSet, setActorsDataSet] = useState(null);
    const [directorsDataSet, setDirectorsDataSet] = useState(null);
    const userId = useParams().id;

    const getUser = async () => {
        await axios.get(`/api/users/${userId}`)
            .then((response) => {
                setUser(response.data);
                fillGenresDataSets(response.data.likedMovies);
                fillActorsDataSets(response.data.likedMovies);
            })
            .catch((error) => {
                message(error.message, "error");
            });
    };

    useEffect(()=>{
        getUser();
    }, []);

    const fillGenresDataSets = async (likedMovies) => {
        let movies = await Promise.all(likedMovies.map(async movieId => {
            return await getMovieDetails(movieId);
        }));

        let genresLabels = [];
        let genresData = [];
        let genresColors = [];
        let genres = {};

        movies.map(movie => {
            return movie.genres;
        }).flat().forEach(genre => {
            genres[genre.name] ? genres[genre.name]++ : genres[genre.name] = 1;
        })

        Object.keys(genres).sort((curGenre,nextGenre) => {
            return genres[nextGenre] - genres[curGenre];
        }).slice(0,5).forEach(item => {
            genresLabels.push(item);
            genresData.push(genres[item]);
            genresColors.push(randomColor())
        });
        
        setGenresDataSet({labels: genresLabels, datasets:[{data:genresData, backgroundColor: genresColors}]});
    }

    const fillActorsDataSets = async (likedMovies) => {
        let credits = await Promise.all(likedMovies.map(async movieId => {
            return await getMovieCredits(movieId);
        }));

        debugger;

        let actorsLabels = [];
        let actorsData = [];
        let actorsColors = [];
        let actors = {};
        let directorsLabels = [];
        let directorsData = [];
        let directorsColors = [];
        let directors = {};

        credits.map(credit => credit.cast).flat().forEach(actor => {
            if(actor.known_for_department === "Acting"){
                actors[actor.name] ? actors[actor.name]++ : actors[actor.name] = 1;
            }

            if(actor.known_for_department === "Directing"){
                directors[actor.name] ? directors[actor.name]++ : directors[actor.name] = 1;
            }
        });

        Object.keys(actors).sort((curActor,nextActor) => {
            return actors[nextActor] - actors[curActor];
        }).slice(0,10).forEach(item => {
            actorsLabels.push(item);
            actorsData.push(actors[item]);
            actorsColors.push(randomColor())
        });

        debugger;

        Object.keys(directors).sort((curDirector,nextDirector) => {
            return directors[nextDirector] - directors[curDirector];
        }).slice(0,5).forEach(item => {
            directorsLabels.push(item);
            directorsData.push(directors[item]);
            directorsColors.push(randomColor())
        });

        setActorsDataSet({labels: actorsLabels, datasets:[{label: "films You've watched with this actor", data:actorsData, backgroundColor: actorsColors}]});
        setDirectorsDataSet({labels: directorsLabels, datasets:[{data:directorsData, backgroundColor: directorsColors}]});

    }

    let randomColor = () => {
        return `rgba(${Math.floor(Math.random()*200 + 25)}, ${Math.floor(Math.random()*200 + 25)}, ${Math.floor(Math.random()*200 + 25)}, 1)`
    }

    if(!user){
        return(
            <Loader/>
        )
    }

    return(
        <div className="profile-container">
            <h2>{user.name} {user.surname}</h2>
            <div className="profile-info">
                <div>
                    <h6 className="grey-text text-darken-2">Email: {user.email}</h6>
                    <h6 className="grey-text text-darken-2">Role: {user.role}</h6>
                    <h6 className="grey-text text-darken-2">Status: {formatter.statusFormatter(user.status)}</h6>
                </div>
                <div>
                    <h6 className="grey-text text-darken-2">Noted: {user.likedMovies.length + user.dislikedMovies.length}</h6>
                    <h6 className="grey-text text-darken-2">Liked: {user.likedMovies.length}</h6>
                    <h6 className="grey-text text-darken-2">Disliked: {user.dislikedMovies.length}</h6>
                </div>
            </div>
            <div className="profile-charts">
                <div className="genres-chart">
                    <h4 className="grey-text text-darken-2 chart-title">Favorite Genres</h4>
                    <Doughnut data={genresDataSet}/>
                </div>
                <div className="directors-chart">
                    <h4 className="grey-text text-darken-2 chart-title">Favorite Directors</h4>
                    <Doughnut data={directorsDataSet}/>
                </div>
            </div>
            <div className="actors-chart">
                <h4 className="grey-text text-darken-2 chart-title">Favorite Actors</h4>
                <Bar data={actorsDataSet}/>
            </div>
        </div>
    )
}