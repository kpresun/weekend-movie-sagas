import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allMovies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleDetailClick = (movieId) => {
        console.log(movieId);
        dispatch({type: 'GET_MV_DETAILS', payload: movieId})
        history.push(`/details/${movieId}`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {allMovies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <h3>{movie.id}</h3>
                            <h3>{movie.description}</h3>
                            <img src={movie.poster} alt={movie.title}
                            onClick={() => {handleDetailClick(movie.id)}}/>
                            {/* <p><button onClick={() =>handleDetailClick(movie)}>
                                More Detail
                            </button></p> */}
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;