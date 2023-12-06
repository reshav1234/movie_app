import OrderForm from '../Confirmation/OrderForm';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import jsPDF from 'jspdf'

import './movieDetails.css'


const MovieDetails = () => {

  // To calculate ticket count, movie details we define its state
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  // State initialization for user details
  const [formData, setFormData] = useState({
    Name: '',
    email:'',
    address: '',
  });

  useEffect(() => {
    // Fetch movie details after clicking on the poster using params id
    const fetchMovieDetails = async () => {
      const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;
      const response = await fetch(url);
      const data = await response.json();
      setMovieDetails(data);
    };

    fetchMovieDetails();
  }, [id]);

 


  //Calculation of total amount with vat 13%
  const vat = 0.13
  const ticketPrice = 200
  const totalPrice = ticketPrice * ticketCount;
  const totalAmount = totalPrice + totalPrice * vat;

  // Handling increment of ticket
  const handleIncrement = () =>{
    setTicketCount((ticketCount) => ticketCount+1)
  }

  // Handling decrement of ticket
  const handleDecrement = () =>{
    setTicketCount((ticketCount) => ticketCount-1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(formData)
  };

   // To checkout current date
   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleDateString();
   const formattedTime = currentDate.toLocaleTimeString();
 

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF();
  
    const posterUrl = movieDetails?.Poster;
    const numberOfTickets = ticketCount;
    const imgWidth = 50;
    const imgHeight = 50;
    const posterSpacing = 20;
  
    for (let i = 0; i < numberOfTickets; i++) {
      if (posterUrl) {
        doc.addImage(posterUrl, 'JPEG', 10, 10 + i * (imgHeight + posterSpacing), imgWidth, imgHeight);
        doc.text(`Title: ${movieDetails.Title}`, 70, 20 + i * (imgHeight + posterSpacing));
        doc.text(`Ticket Price: $${ticketPrice}`, 70, 30 + i * (imgHeight + posterSpacing));
      }
    }
  
    let userDetailsYPos = 100 + numberOfTickets * (imgHeight + posterSpacing); // Initial Y position for user details
  
    Object.keys(formData).forEach((name) => {
      doc.text(`${name}: ${formData[name]}`, 10, userDetailsYPos);
      userDetailsYPos += 10; // Increment Y position for next line
    });
  
    doc.save('ticket_details.pdf');
  };
  
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
                    <button onClick={handleDecrement} className="btn-decrement"></button>
                    <button onClick={handleIncrement} className="btn-increment"></button><br /><br/>
                    <form onSubmit={handleSubmit} className="user-form">
                      <div className="form-group">
                          <label>
                          Full Name:
                          <input
                              type="text"
                              name="Name"
                              value={formData.fullName}
                              onChange={handleChange}
                              className="form-control"
                          />
                          </label>
                      </div>
                      <div className="flex-group">
                          <div className = "flex-item">
                              <label>
                              Email:
                              <input
                                  type="text"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="form-control"
                              />
                              </label>
                          </div>
                          <div className="flex-item">
                          <label>
                              Address:
                              <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="form-control"
                              />
                          </label>
                          </div>
                      </div>
                      </form>
                      <div className = "checkout">
                        <h2>Checkout Summary</h2>
                        <p>{ticketCount}x: ${ticketPrice}</p>
                        <p>Sub Total {totalPrice}</p>

                        <p>Discount(0 %) $0</p>
                        <p>Total ${totalAmount}</p>
                        <button onClick = {generatePDF}>Proceed to payment</button>
                      </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default MovieDetails;
