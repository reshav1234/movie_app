import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import NavBar from "./NavBar/NavBar"
import Movie from "./Movie/Movie"
import MovieDetails from './Movie/MovieDetails'


const App = () => {
  return (
    <Router>
      <>
        <NavBar/>
        <Routes>
          <Route exact path = '/' element = {<Movie/>} />
          <Route path = '/movie/:id' element = {<MovieDetails/>} />
        </Routes>
      </>
    </Router>
  )
}

export default App