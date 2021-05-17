import { CommentForm } from "./CommentFrom"
import { UserComments } from "./UserComments"
import axios from "axios"
import { useEffect, useState } from "react"
import { Loader } from "../Loader"

export const CommentsPart = ({movieId}) => {
    
    const [comments, setComments] = useState();

    const getComments = async (sMovieId) => {

        await axios.get(`/api/comments/${sMovieId}`)
            .then((response) => {
                setComments(response.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(()=>{
        getComments(movieId);
    }, []);

    if(!comments){
        return (
            <Loader />
        )
    }
    
    return (
        <div className="comments-section">
            <h3>Reviews</h3>
            <CommentForm movieId={movieId} getComments={getComments}/>
            <UserComments comments={comments}/>
        </div>
        
    )
}