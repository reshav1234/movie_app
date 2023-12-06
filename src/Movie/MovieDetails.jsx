
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './movieDetails.css'
import OrderForm from '../Confirmation/OrderForm';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const ticketPrice = 200
  const totalPrice = ticketPrice * ticketCount;

  const handleIncrement = () =>{
    setTicketCount((prevCount) => prevCount+1)
  }

  const handleDecrement = () =>{
    setTicketCount((prevCount) => prevCount-1)
  }


  useEffect(() => {

    const fetchMovieDetails = async () => {
      const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;
      const response = await fetch(url);
      const data = await response.json();
      setMovieDetails(data);
    };

    fetchMovieDetails();
  }, [id]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <>
        <div className = "ticket">
            {movieDetails && (
                <div className = "movie-details">
                    <img src = {movieDetails.Poster}/>
                    <p>{movieDetails.Title}</p>
                </div>
            )}
            <div className = "event-details">
                <h3>Event Details</h3>
                
                <p>Data and Time</p>
                <h3>{formattedDate}{formattedTime}</h3>
                <p>Location</p>
                <div className= "select-ticket">
                    <h2>Select ticket</h2>
                    <p>{ticketCount}x ticket(s)</p>
                    <button onClick = {handleDecrement}>-</button>
                    <button onClick = {handleIncrement}>+</button><br /><br/>
                    <Link to = "/orderForm" className = "redirect">CheckOut for {totalPrice}</Link>
                </div>
            </div>
        </div>
        
    </>
  );
};

export default MovieDetails;
