import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
    return (
        
            <div className="row">
                <div className="col s12 m6">
                <div className="card">
                    <div className="card-image">
                        <img src={movie.poster_path}/>
                        {/* <a className="btn-floating halfway-fab waves-effect waves-light green like-button"><i className="material-icons">thumb_up</i></a>
                        <a className="btn-floating halfway-fab waves-effect waves-light red dislike-button"><i className="material-icons">thumb_down</i></a> */}
                    </div>
                    <Link to={`/movie/${movie.id}`}>
                        <div className="card-content">
                            <h6>{movie.title}</h6>
                        </div>
                    </Link>
                </div>
                </div>
            </div>
        
    );
}