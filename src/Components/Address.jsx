import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/address.css';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const [address, setAddress] = useState({
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { authTokens } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };


  const navigate = useNavigate();


 const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setError('');
      setIsSubmitting(true);
      axios.post('http://127.0.0.1:8000/api/user/api/save_address/', address, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`,
        },
      })
        .then((response) => {
          console.log('Address saved successfully:', response.data);
          setIsSubmitting(false);
          setIsSuccess(true);

          // Navigate to the "Order Now" page after successful address save
          navigate('/order'); // Replace '/order' with the actual URL of your "Order Now" page
        })
        .catch((error) => {
          console.error('Error saving address:', error);
          setError('Failed to save address. Please try again.');
          setIsSubmitting(false);
        });
    } else {
      setError('Please fill in all the required fields.');
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return Object.values(address).every((value) => value.trim() !== '');
  };

  return (
    <div className="address-container">
      <section className="order" id="order">
        <h1 className="heading">
          <span>Save</span> address
        </h1>
        {error && <p className="error-message">{error}</p>}
        {isSuccess}
        <form onSubmit={handleSubmit} className="address-form">
          <input type="text" name="full_name" placeholder="Full Name" value={address.full_name} onChange={handleChange}  />
          <input type="text" name="address_line_1" placeholder="Address Line 1" value={address.address_line_1} onChange={handleChange}  />
          <input type="text" name="address_line_2" placeholder="Address Line 2" value={address.address_line_2} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange}  />
          <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange}  />
          <input type="text" name="postal_code" placeholder="Postal Code" value={address.postal_code} onChange={handleChange}  />
          <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange}  />
          <button type="submit" disabled={isSubmitting || isSuccess}>
            {isSubmitting ? 'Saving...' : 'Order Now'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Address;
