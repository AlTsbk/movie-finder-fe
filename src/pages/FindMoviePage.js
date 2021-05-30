import { FindMovieContentSection } from "../components/FindMoviePage/FindMovieContentSection";
import {movieApi} from "../models/movieApi"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

export const FindMoviePage = () => {

    const {searchMovies} = movieApi();
    const [movies, setMovies] = useState(null);

    const searchText = useParams().searchText;

    const search = async () => {
        const data = await searchMovies(searchText);
        setMovies(data);
    }

    useEffect(()=>{
        search();
    },[searchText]);

    return (
        <div>
            <FindMovieContentSection movies={movies}/>
        </div>
    );
}