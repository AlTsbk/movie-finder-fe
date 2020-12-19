import { useParams } from 'react-router-dom';
import { CommentsPart } from '../components/MovieDetails/CommentsPart';
import { DetailsPart } from '../components/MovieDetails/DetailsPart';
import { SimilarMovies } from '../components/MovieDetails/SimilarMovies';

export const MovieDetails = () => {

    const movieId = useParams().id;

    return (
        <div>
            <DetailsPart movieId={movieId} />
            <SimilarMovies movieId={movieId} />
            <CommentsPart movieId={movieId} />
        </div>
        
    )
}