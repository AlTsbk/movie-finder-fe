import { useParams } from 'react-router-dom';
import { CommentsPart } from '../components/MovieDetails/CommentsPart';
import { DetailsPart } from '../components/MovieDetails/DetailsPart';

export const MovieDetails = () => {

    const movieId = useParams().id;

    return (
        <div>
            <DetailsPart movieId={movieId} />
            <CommentsPart movieId={movieId} />
        </div>
        
    )
}