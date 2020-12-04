import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import { useMessage } from "../../hooks/message.hook";

export const CommentForm = ({movieId, getComments}) => {

    const [comment, setComment] = useState("");
    const {userId, isAuthenticated} = useContext(AuthContext);
    const message = useMessage();

    const addComment = async () => {
        const text = comment;
        await axios.post("/api/comments", {movieId, userId, text})
            .then((response)=>{
                message(response.message, "accept");
                setComment("");
                getComments(movieId);
            }).catch((error) => {
                message(error.message, "error");
            })
        
    }

    const onCommentChange = event => {
        setComment(event.target.value);
    }

    if(!isAuthenticated){
        return (
            <div class="center-align">
                <p className="no-comments-message">Login for leave comment</p>
            </div>
            
        )
    }

    return(
        <div className="row">
            <form className="col s12">
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="textarea1" value={comment} onChange={onCommentChange} className="materialize-textarea"></textarea>
                    <label for="textarea1">Your Comment</label>
                </div>
                <a onClick={addComment} class="waves-effect waves-light btn col s10 offset-s1 yellow darken-4"><i class="material-icons right">send</i>send</a>
            </div>
            </form>
        </div>
    )
}