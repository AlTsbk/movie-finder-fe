import { useContext, useEffect, useState } from "react";
import {movieApi} from "../../models/movieApi"
import { Loader } from "../Loader";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import formatter from "../../models/formatter"
import { RatingButtons } from "./RatingButtons";

export const DetailsPart = ({movieId}) => {
    
    const {getMovieDetails} = movieApi();
    const [movie, setMovie] = useState(null);
    const [ratedMovie, setRatedMovie] = useState(null);
    const [movieRating, setMovieRating] = useState(0);
    const {userId} = useContext(AuthContext);

    const getMovie = async () => {
        const data = await getMovieDetails(movieId);
        setMovie(data);
    }

    const getMovieRating = async () => {
        axios.get(`/api/movies/${movieId}`)
            .then((response) => {
                if(response.data){
                    setRatedMovie(response.data);
                    setMovieRating(response.data.positiveNotes.length - response.data.negativeNotes.length)
                }else{
                    setRatedMovie(null);
                    setMovieRating(0)
                }
                
            })
            .catch((error) => {
                
            });
    }
    
    useEffect(  () => {
        getMovie();
        getMovieRating();
    }, [movieId]);

    

    if(!movie){
        return (
            <Loader />
        )
    }

    return (
        <div className="movie-details-page">
            <img className="details-page-poster" src={movie.poster_path} />
            <div className="">
                <div className="movie-header">
                    <div className="movie-title-container">
                        <p className="movie-title">{movie.title}</p>
                        {formatter.ratingFormatter(movieRating)}
                    </div>
                    <p className="movie-tagline">{movie.tagline}</p>
                    {movie.genres.map(genr=>{
                        return (<div key={genr.id} className="chip">{genr.name}</div>)
                    })}
                </div>
                <RatingButtons movieId={movieId} ratedMovie={ratedMovie} userId={userId} getMovieRating={getMovieRating} />
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Бюджет:</p>
                    <p className="movie-detail">
                        {movie.budget} $
                    </p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Компании производители: </p>
                    <p className="movie-detail">
                         {movie.production_companies.map(company => company.name).join(", ")}
                    </p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Страны производители: </p>
                    <p className="movie-detail">
                         {movie.production_countries.map(country => country.name).join(", ")}
                    </p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Выход: </p>
                    <p className="movie-detail">{movie.release_date}</p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Длительность: </p>
                    <p className="movie-detail">{movie.runtime} min</p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Описание: </p>
                    <p className="movie-detail">{movie.overview}</p>
                </div>
                <div className="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Бюджет: </p>
                    <p className="movie-detail">{movie.revenue} $</p>
                </div>
            </div>
        </div>
        
    )
}