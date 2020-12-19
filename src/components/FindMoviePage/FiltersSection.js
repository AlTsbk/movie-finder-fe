import { useState } from "react"
import {movieApi} from "../../models/movieApi"
import { FindMovieContentSection } from "./FindMovieContentSection";

export const FiltersSection = () => {

    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState(null);
    const {searchMovies} = movieApi();

    const onSearchChange = Event => {
        setSearchText(Event.target.value);
    }

    const search = async () => {
        const data = await searchMovies(searchText);
        setMovies(data);
    }

    return (
        <div>
            <div className="filters">
                <div className="input-field">
                    <input value={searchText} onChange={onSearchChange} id="search-input" type="text"/>
                    <label htmlFor="search-input">Search</label>
                </div>
                <a className="waves-effect waves-light btn-large yellow darken-4" onClick={search}>Search</a>
            </div>
            <FindMovieContentSection movies={movies}/>
        </div>
       
        
    )
}