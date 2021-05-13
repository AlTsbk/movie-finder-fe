import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {movieApi} from "../../models/movieApi"
import Slider from "react-slick";
import { MovieCard } from "../MovieCard";
import {configValues} from "../configValues"

export const SimilarMovies = ({ movieId }) => {

    const {getSimilarMovies} = movieApi();
    const [movies, setMovies] = useState(null);
    const aRespValForSlider = [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

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
            <Slider autoplay={true} autoplaySpeed={3000} slidesToShow={4} slidesToScroll={4} responsive={configValues.respValForSlider}>
                {renderSlides()}
            </Slider>
        </div>
    )
}