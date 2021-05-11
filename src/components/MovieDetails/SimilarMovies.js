import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import Slider from "react-slick";
import { MovieCard } from "../MovieCard";

export const SimilarMovies = ({ movieId }) => {

    const {getSimilarMovies} = movieApi();
    const [movies, setMovies] = useState(null);

    const getMovies = async (movieId) => {
        if(movieId){
            const data = await getSimilarMovies(movieId);
            setMovies(data);
        }
    }

   

    useEffect( async () => {
        getMovies(movieId);
    }, [movieId]);

    const renderSlides = () =>
    movies.map(movie => (
        <MovieCard movie={movie}/>
    ));

    if(!movies){
        return(
            <div></div>
        )
    }

    return(
        <div>
            <h4 class="section-title">Similar Movies</h4>
            <Slider autoplay={true} autoplaySpeed={3000} slidesToShow={5} slidesToScroll={5}>
                {renderSlides()}
            </Slider>
        </div>
    )
}