import {movieApi} from "../../models/movieApi"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { DetailsPart } from "../MovieDetails/DetailsPart";

export const BestMovieForYou = () => {

    const {userId} = useContext(AuthContext);
    const {getSimilarMovies} = movieApi();
    const [bestMovie, setBestMovie] = useState(null);

    const getLikedMovies = async () => {
        await axios.get(`/api/users/${userId}`)
            .then((response) => {
                if(response.data.likedMovies){
                    chooseBestMovie(response.data.likedMovies, response.data.dislikedMovies);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const chooseBestMovie = async (likedMovies,dislikedMovies) => {
        
        let potentialMovies = {};
        let sortedMovies = {};
        await Promise.all(likedMovies.map(async (id)=>{
            return await getSimilarMovies(id)
                .then((response)=>{
                    response.forEach(movie => {
                        if(!likedMovies.includes(movie.id.toString()) && !dislikedMovies.includes(movie.id.toString())){
                            potentialMovies[movie.id] ? potentialMovies[movie.id]++ : potentialMovies[movie.id] = 1;
                        }
                    })
                })
        }));

        await Promise.all(dislikedMovies.map(async (id)=>{
            return await getSimilarMovies(id)
                .then((response)=>{
                    response.forEach(movie => {
                        if(!likedMovies.includes(movie.id.toString()) && !dislikedMovies.includes(movie.id.toString())){
                            if(potentialMovies[movie.id]){
                                potentialMovies[movie.id]--
                            }
                        }
                    })
                })
        }));

        sortedMovies = Object.keys(potentialMovies).sort((currentId,nextId) => {
            return  potentialMovies[nextId] - potentialMovies[currentId]
        });
        
        setBestMovie(sortedMovies[0]);
    }

    getLikedMovies();

    if(!bestMovie){
        return(
            <div>
                <h4 className="section-title">Лучший фильм для вас</h4>
                <h6 className="section-info">Для получения рекомендаций необходимо оценивать фильмы</h6>
            </div>
        )
    }
    
    return(
        <div>
            <h4 className="section-title">Лучший фильм для вас</h4>
            <DetailsPart movieId={bestMovie} />
        </div>
    )
}