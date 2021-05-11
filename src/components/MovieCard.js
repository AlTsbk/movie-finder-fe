import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader"
import {LoadingCard} from "./LoadingCard"
import axios from "axios"
import formatter from "../models/formatter"

export const MovieCard = ({movie}) => {

    const [movieRating, setMovieRating] = useState(0);
    const [busy, setBusy] = useState("true");

    const getMovieRating = (movieId) => {
        setBusy(true);
        axios.get(`/api/movies/${movieId}`)
            .then((response) => {
                setBusy(false);
                if(response.data){
                    setMovieRating(response.data.positiveNotes.length - response.data.negativeNotes.length)
                }else{
                    setMovieRating(0) 
                }
                
            })
            .catch((error) => {
                
            });
    }

    useEffect(()=>{
        getMovieRating(movie.id);
    }, [movie]);

    if(busy){
        return (<LoadingCard />)
    }

    return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={movie.poster_path}/>
                            {formatter.ratingInCardFormatter(movieRating)}
                        </div>
                        <Link to={`/movie/${movie.id}`}>
                            <div className="card-content">
                                <p className="movie-card-title">{movie.title}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        
    );
}