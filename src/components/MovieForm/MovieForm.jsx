import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genresCategories);
  const history = useHistory();
  // local storage for movie data
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');

// runs first to make sure we actually have the genres for the form
  useEffect(() => {
    fetchGenres();
    console.log("useEffect to grab genres");
  }, []);

// will fetch genres first so we can set genre in dropdown
  const fetchGenres = () => {
    dispatch({ type: "GET_GENRES" });
  };

// button will not save anything and go back to list
  const cancelAddClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

const addNewMovie = () => {
    const movieToAdd = {
        title,
        poster,
        description
    }
    dispatch({ type:'ADD_MOVIE', payload: movieToAdd});
    setTitle('');
    setPoster('');
    setDescription('');
}

  return (
    <div>
      <form onSubmit={addNewMovie}>
        <input type="text" placeholder="Movie title" value={title} onChange={event => setTitle(event.target.value) } required />
        <input type="text" placeholder="Image URL" value={poster} onChange={event => setPoster(event.target.value) } required/>
        <input type="text" placeholder="Movie Description" value={description} onChange={event => setDescription(event.target.value)} required/>
        <select>
            {genres.map(genre => {
                return (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                )
            })}
        </select>
        <div>
            <button type='submit'>Add Movie</button>
            <button onClick={cancelAddClick}>cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
