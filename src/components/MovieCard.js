import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import formatter from "../models/formatter"

export const MovieCard = ({movie}) => {

    const [ratedMovie, setRatedMovie] = useState(null);
    const [movieRating, setMovieRating] = useState(0);

    const getMovieRating = (movieId) => {
        axios.get(`/api/movies/${movieId}`)
            .then((response) => {
                setRatedMovie(response.data);
                setMovieRating(response.data.positiveNotes.length - response.data.negativeNotes.length)
            })
            .catch((error) => {
                
            });
    }

    useEffect(()=>{
        getMovieRating(movie.id);
    }, []);

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