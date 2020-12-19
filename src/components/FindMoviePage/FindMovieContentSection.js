import {MovieCard} from "../MovieCard"

export const FindMovieContentSection = ({movies}) => {

    if(!movies) {
        return (<div></div>)
    }

    return (
        <div className="found-movies" >
            {movies.map((movie)=>{
                return (<MovieCard movie={movie}/>)
            })}
        </div>
        
    )
}