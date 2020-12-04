import { useEffect, useState } from "react";
import {movieApi} from "../../models/movieApi"
import { Loader } from "../Loader";

export const DetailsPart = ({movieId}) => {
    
    const {getMovieDetails} = movieApi();
    const [movie, setMovie] = useState(null);
    
    useEffect( async () => {
        if(!movie){
            const data = await getMovieDetails(movieId);
            setMovie(data);
        }
        
    });

    if(!movie){
        return (
            <Loader />
        )
    }

    return (
        <div className="container movie-details-page">
            <img className="details-page-poster" src={movie.poster_path} />
            <div className="">
                <div className="movie-header">
                    <p className="movie-title">{movie.title}</p>
                    <p className="movie-tagline">{movie.tagline}</p>
                    {movie.genres.map(genr=>{
                        return (<div class="chip">{genr.name}</div>)
                    })}
                </div>
                <div class="rate-container">
                    <a className="btn-floating waves-effect waves-light green btn-small like-button"><i className="material-icons">thumb_up</i></a>
                    <a className="btn-floating waves-effect waves-light red btn-small dislike-button"><i className="material-icons">thumb_down</i></a>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Budget:</p>
                    <p className="movie-detail">
                        {movie.budget} $
                    </p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Production companies: </p>
                    <p className="movie-detail">
                         {movie.production_companies.map(company => company.name).join(", ")}
                    </p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Production countries: </p>
                    <p className="movie-detail">
                         {movie.production_countries.map(country => country.name).join(", ")}
                    </p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Release: </p>
                    <p className="movie-detail">{movie.release_date}</p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Duration: </p>
                    <p className="movie-detail">{movie.runtime} min</p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Overview: </p>
                    <p className="movie-detail">{movie.overview} min</p>
                </div>
                <div class="movie-detail-container">
                    <p className="movie-detail-title grey-text text-darken-1">Revenue: </p>
                    <p className="movie-detail">{movie.revenue} $</p>
                </div>
            </div>
        </div>
        
    )
}