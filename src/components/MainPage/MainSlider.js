import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import {Loader} from "../../components/Loader"
import Slider from "react-slick";

export const MainSlider = () => {

    const {getNowPlayingMovies} = movieApi();
    const [movies, setMovies] = useState(null)

    useEffect( async () => {
        if(!movies){
            const data = await getNowPlayingMovies();
            setMovies(data);
        }
        
    });

   
    const renderSlides = () =>
        movies.map(movie => (
                <div className="main-slider-item">
                    <h3 className="main-slider-title">{movie.title}</h3>
                    <div class="main-slider-shadow"></div>
                    <img className="responsive-img main-slider-image" src={movie.backdrop_path} />
                </div>
    ));
    
    if(!movies){
        return(
            <Loader/>
        )
    }

    return (
        <Slider autoplay={true} autoplaySpeed={3000}>
            {renderSlides()}
        </Slider>
    );
}