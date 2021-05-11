import axios from "axios"
import { useEffect, useState } from "react";
export const RatingButtons = ({movieId, ratedMovie, userId, getMovieRating}) => {

    const [usersNote, setUsersNote] = useState(0);
    
    const rateMovie = async (note) => {
        await axios.put("/api/movies/rate", {movieId, userId, note})
            .then(() => {
                getMovieRating();
                findUserNote();
            })
            .catch((error) => {
                console.error(error.message);
            })
    }

    const findUserNote = () => {
        if(ratedMovie){
            if(ratedMovie.negativeNotes.includes(userId)){
                setUsersNote(-1)
            }

            if(ratedMovie.positiveNotes.includes(userId)){
                setUsersNote(1)
            }
        }else{
            setUsersNote(0)
        }
        
    }

    useEffect(()=>{
        findUserNote();
    }, [ratedMovie]);

    if(!userId){
        return (<div></div>)
    }
    
    return (
        <div className="rate-container">
            <div class={usersNote === 0 ? "hide" : ""}>
                <i class={`material-icons green-text ${usersNote < 0 ? "hide" : ""}` }>thumb_up</i>
                <i class={`material-icons red-text ${usersNote > 0 ? "hide" : ""}` }>thumb_down</i>
            </div>
            <div class={usersNote === 0 ? "" : "hide"}>
                <a className={"btn-floating waves-effect waves-light green btn-small like-button"}
                    onClick={rateMovie.bind(Event, true)}>
                    <i className="material-icons">thumb_up</i>
                </a>
                <a className={"btn-floating waves-effect waves-light red btn-small dislike-button"} onClick={rateMovie.bind(Event, false)}>
                    <i className="material-icons">thumb_down</i>
                </a>
            </div>
            
        </div>
    )
}