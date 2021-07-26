import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genresCategories);
  const history = useHistory();
  const [newMovie, setNewMovie] = useState([]);

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

  return (
    <div>
      <form>
        <input type="text" placeholder="Add Movie title"></input>
        <input type="text" placeholder="URL Image"></input>
        <input type="text" placeholder="Description"></input>
        <select name="genre" id="genreNames">
            {genres.map((genre, index) => {
                return (
                        <option key={index} value={genre.name}>{genre.id}</option>
                )
            })}
        </select>
        <div>
            <button>Add Movie</button>
            <button onClick={cancelAddClick}>cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
