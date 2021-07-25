import React from 'react';
import { useSelector } from 'react-redux';

function MovieDetails() {

const movie = useSelector(store => store.movies);
const mvDetails = useSelector(store => store.genres);

    return (
        <div>
            <p>This should show details, page to be deleted</p>
            <p>{mvDetails.title}</p>
            <p>{mvDetails.description}</p>
            <p>{mvDetails.genres.name}</p>
        </div>
    )
}

export default MovieDetails;
