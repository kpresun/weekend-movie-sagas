import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router> 
        <ul>
          <li><Link to='/'>Home</Link></li>
        </ul>
        <ul>
          <li><Link to='/AddMovie'>Add New Movie</Link></li>
        </ul>        
        <Route path='/' exact>
          <MovieList />
        </Route>
        <Route path='/AddMovie'>
          <MovieForm />
        </Route>
        <Route path='/details/:id'>
          <MovieDetails />
        </Route>
        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;


{/* <li><Link to='/details'>Movie Details</Link></li>
          Link to movies to details page to be deleted */}