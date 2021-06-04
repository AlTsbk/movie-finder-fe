import axios from "axios";

const apiKey = "7c0a21a68c63731e394cfadb5260dbc6";
const url = "https://api.themoviedb.org/3"
const urlToImage = "https://image.tmdb.org/t/p/original"
const nowPlaying = `${url}/movie/now_playing`
const topRated = `${url}/movie/top_rated`
const movieDetails = `${url}/movie/`
const search = `${url}/search/movie`

export const movieApi = ()=> {
    const getNowPlayingMovies = async () => {
        const {data} = await axios.get(nowPlaying, {
            params: {
                api_key: apiKey,
                language: "ru",
                page: 1
            }
        });

        return data.results.map(movie => {
            movie.poster_path = urlToImage + movie.poster_path;
            movie.backdrop_path = urlToImage + movie.backdrop_path;
            return movie;
        });
    }

    const getTopRatedMovies = async () => {
        const {data} = await axios.get(topRated, {
            params: {
                api_key: apiKey,
                language: "ru",
                page: 1
            }
        });

        return data.results.map(movie => {
            movie.poster_path = urlToImage + movie.poster_path;
            movie.backdrop_path = urlToImage + movie.backdrop_path;
            return movie;
        });
    }

    const getMovieDetails = async (id) => {
        const {data} = await axios.get(movieDetails + id, {
            params: {
                api_key: apiKey,
                language: "ru"
            }
        });

        data.poster_path = urlToImage + data.poster_path;
        data.backdrop_path = urlToImage + data.backdrop_path;

        return data;
    }

    const getSimilarMovies = async (id) => {
        const {data} = await axios.get(movieDetails + id + "/recommendations", {
            params: {
                api_key: apiKey,
                language: "ru"
            }
        });


        return data.results.map(movie => {
            movie.poster_path = urlToImage + movie.poster_path;
            movie.backdrop_path = urlToImage + movie.backdrop_path;
            return movie;
        });
    }

    const getMovieCredits = async (id) => {
        const {data} = await axios.get(movieDetails + id + "/credits", {
            params: {
                api_key: apiKey,
                language: "ru"
            }
        });

        return data;
    }

    const searchMovies = async (searchText) => {
        const {data} = await axios.get(search, {
            params: {
                api_key: apiKey,
                language: "ru",
                query: searchText
            }
        });


        return data.results.map(movie => {
            movie.poster_path = urlToImage + movie.poster_path;
            movie.backdrop_path = urlToImage + movie.backdrop_path;
            return movie;
        });
    }

    return ({getNowPlayingMovies, getTopRatedMovies, getMovieDetails, getSimilarMovies, searchMovies, getMovieCredits});
}