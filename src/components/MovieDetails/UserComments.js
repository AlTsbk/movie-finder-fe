export const UserComments = ({comments}) => {
    
    if(!comments.length){
        return (
            <div className="center-align">
                <p className="no-comments-message">Пока что ревью нет!</p>
            </div>
        )
    }

    

    return(
        comments.map(commnet => {
            return (
                <div className="comment">
                    <div>
                        <p className="commentator">{commnet.userName}</p>
                        <p className="comment-text">{commnet.text}</p>
                    </div>
                    <div>
                        <p className="comment-date">{commnet.date}</p>
                        <p className="comment-date">{commnet.time}</p>
                    </div>
                </div>
            )
        })
    )
}