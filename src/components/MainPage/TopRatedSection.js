import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import {Loader} from "../../components/Loader"
import Slider from "react-slick";
import { MovieCard } from "../MovieCard";
import { Link } from "react-router-dom";
import {configValues} from "../configValues"


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
        <div>
            <Link><h4 class="section-title">Top Rated Movies</h4></Link>
            <Slider autoplay={true} autoplaySpeed={3000} slidesToShow={4} slidesToScroll={4} responsive={configValues.respValForSlider}>
                {renderSlides()}
            </Slider>
        </div>
    );
}