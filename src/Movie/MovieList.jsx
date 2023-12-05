import { Link } from "react-router-dom";

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<Link to={`/movie/${movie.imdbID}`} key={index}>
					<div className='image-container d-flex justify-content-start m-3'>
            			<img src={movie.Poster} alt='movie' />
            			<p>{movie.Title}</p>
          			</div>
				</Link>
			))}
		</>
	);
};

export default MovieList;