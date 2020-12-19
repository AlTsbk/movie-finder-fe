import { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import Slider from "react-slick";
import { MovieCard } from "../MovieCard";
import {Loader} from "../../components/Loader"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

export const RecomendationSection = () => {

    const {getSimilarMovies, getMovieDetails} = movieApi();
    const [movies, setMovies] = useState(null);
    const [movieTitle, setMovieTitle] = useState(null);
    const {userId} = useContext(AuthContext);

    const getUser = async () => {
        let indexOfRandomMovie = 0;
        if(userId){
            await axios.get(`api/users/${userId}`)
            .then(async (response)=>{
                if(response.data.likedMovies.length){
                    indexOfRandomMovie = Math.floor((Math.random() * response.data.likedMovies.length));
                    getMovies(response.data.likedMovies[indexOfRandomMovie]);
                    getMovie(response.data.likedMovies[indexOfRandomMovie]);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    const getMovie = async (movieId) => {
        const data = await getMovieDetails(movieId);
        setMovieTitle(data.title);
    }

    const getMovies = async (movieId) => {
        const data = await getSimilarMovies(movieId);
        setMovies(data);
    }

    useEffect( async () => {
        if(userId){
            getUser();
        }
        
        
    }, [userId]);

    const renderSlides = () =>
        movies.map(movie => (
            <MovieCard movie={movie}/>
    ));

    if(!userId || !movies){
        return(
            <div></div>
        )
    }

    return(
        <div>
            <h4 class="section-title">Because you liked "{movieTitle}"</h4>
            <Slider autoplay={true} autoplaySpeed={3000} slidesToShow={5} slidesToScroll={5}>
                {renderSlides()}
            </Slider>
        </div>
    );
}