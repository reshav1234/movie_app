import { useState } from 'react';

import './OrderForm.css'; 

const OrderForm = (props) => {
    const {ticketPrice , totalPrice = 1000, totalCount} = props
  const [formData, setFormData] = useState({
    fullName: '',
    email:'',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
  });




  const [taxAmount, setTaxAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCheckout = () => {
    const calculatedTaxAmount = totalPrice * 0.13;
    const calculatedTotalAmount = totalPrice + calculatedTaxAmount - discount;

    setTaxAmount(calculatedTaxAmount);
    setTotalAmount(calculatedTotalAmount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
        <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
            <label>
            Full Name:
            <input
                type="text"
                name="fullName"
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
                    name="address"
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
            <div className="flex-item">
            <label>
                Country:
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                />
            </label>
            </div>
            <div className="flex-item">
            <label>
                City:
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                />
            </label>
            </div>
            <div className = "flex-item">
                <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                />
                </label>
            </div>
            <div className="flex-item">
            <label>
                Zipcode:
                <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="form-control"
                />
            </label>
            </div>
        </div>
        </form>
        <div className = "checkout">
            <h2>Checkout Summary</h2>
            <p>x{totalCount}: ${ticketPrice}</p>
            <p>Sub Total {totalPrice}</p>
            <p>Tax(13 %)  ${taxAmount}</p>
            <p>Discount(0 %) $0</p>
            <p>Total ${totalAmount}</p>
            <button onClick={handleCheckout}>Proceed to Payment</button>
        </div>
    </>
  );
};

export default OrderForm;
