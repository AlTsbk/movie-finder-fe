import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import {Loader} from "../../components/Loader"
import Slider from "react-slick";
import { MovieCard } from "../MovieCard";
import { Link } from "react-router-dom";

export const TopRatedSection = () => {

    const {getTopRatedMovies} = movieApi();
    const [movies, setMovies] = useState(null);

    useEffect( async () => {
        if(!movies){
            const data = await getTopRatedMovies();
            setMovies(data);
        }
        
    });

   
    const renderSlides = () =>
        movies.map(movie => (
                <MovieCard movie={movie}/>
    ));
    
    if(!movies){
        return(
            <Loader/>
        )
    }

    return (
        <div className="container">
            <Link><h3 class="section-title">Top Rated Movies</h3></Link>
            <Slider autoplay={true} autoplaySpeed={3000} slidesToShow={3} slidesToScroll={3}>
                {renderSlides()}
            </Slider>
        </div>
    );
}