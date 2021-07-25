import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MovieDetails() {

const dispatch = useDispatch();
const history = useHistory();

const mvDetails = useSelector(store => store.MovieDetails);

    return (
        <div>
            <h1>{mvDetails && mvDetails[0].title}</h1>
            <img src={mvDetails && mvDetails[0].poster}></img>
            <p>{mvDetails && mvDetails[0].description}</p>
        </div>
    )
}

export default MovieDetails;
