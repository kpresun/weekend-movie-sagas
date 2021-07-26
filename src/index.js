import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_MV_DETAILS', fetchMvDetails);
    yield takeEvery('GET_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addNewMovie);
}

const startingMovie = [
    {
        title: 'movie',
        poster: 'https://ctl.s6img.com/society6/img/OuV9pQpP2aNiZMyN7Rl9TEYXL8c/w_700/prints/~artwork/s6-0010/a/2834749_12116983/~~/2001-a-space-odyssey-movie-poster-prints.jpg',
        name: 'sci-fi',
        description: 'space traveling'
    }
]

// this will retrieve all movies from the database
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// this will retrieve and set dat from the database
function* fetchMvDetails(action) {
    try {
        const movieDetails = yield axios.get(`/api/movie/details/${action.payload}`);
        console.log(movieDetails.data);
        yield put ({type: 'SET_MOVIE_DETAIL', payload: movieDetails.data});
    } catch (error) {
        console.log('Unable to retrieve movie details:', error);
    }
}

function* fetchGenres(action) {
    try {
        const genres = yield axios.get('/api/genre');
        console.log('inside fetchGenres', genres.data);
        yield put({ type: 'SET_GENRE', payload: genres.data});
    } catch {
        console.log('unable to retrieve genres');
    }
}

function* addNewMovie(movie) {
    try {
        yield call(axios.post, '/api.movie', movie.payload);
        yield put({ type: SET_NEW_MOVIE});
    } catch (error) {
        console.log('unable to post new movie,', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const movieDetails = (state = startingMovie, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genresCategories = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieDetails,
        genresCategories,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
