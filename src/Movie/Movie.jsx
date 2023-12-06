import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './MovieList';
import './movie.css'

const Movie = () => {
	// State to store movies from the API
    const [movies, setMovies] = useState([]);

	const getMovieRequest = async () => {
		// Fetching API from OMDB API
		const url = `https://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

        if (responseJson.Search && responseJson.Search.length >= 3) {
            const selectedMovies = responseJson.Search.slice(0, 3); // Extract the first three movies
            setMovies(selectedMovies);
        } else {
            setMovies([]); // Handle if there are no search results or less than three movies
        }
	};

	useEffect(() => {
		// Fetch url in first render 
		getMovieRequest();
	}, []);

	return (
		<div className='container-fluid movie-app'>
			<div className='row_01'>
				<MovieList movies={movies} />
			</div>
		</div>
	);
}

export default Movie