import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MovieDetails() {

const history = useHistory();
const mvDetails = useSelector(store => store.movieDetails);

const backToListClick = (event) => {
    event.preventDefault();
    history.push('/');
}

    return (
        <div>
            <h1>{mvDetails && mvDetails[0].title}</h1>
            <img src={mvDetails && mvDetails[0].poster}></img>
            <p>{mvDetails && mvDetails[0].description}</p>
            {mvDetails && 
            mvDetails.map((details, index) => {
                return (
                    <p key={index}>{details.name}</p>
                )
            })}
            <button onClick={backToListClick}>Back to Movie List</button>
        </div>
    )
}

export default MovieDetails;
