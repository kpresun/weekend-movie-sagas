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

    const handleDetailClick = (movie) => {
        dispatch({type: 'GET_MV_DETAILS', payload: movie})
        history.push(`/details`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {allMovies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}
                            onClick={handleDetailClick}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;