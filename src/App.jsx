import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import NavBar from "./NavBar/navBar"
import Movie from "./Movie/Movie"
import MovieDetails from './Movie/MovieDetails'
import OrderForm from './Confirmation/OrderForm';

const App = () => {
  return (
    <Router>
      <>
        <NavBar/>
        <Routes>
          <Route exact path = '/' element = {<Movie/>} />
          <Route path = '/movie/:id' element = {<MovieDetails/>} />
          <Route path = '/orderForm' element = {<OrderForm/>} />
        </Routes>
      </>
    </Router>
  )
}

export default App