import React, { useContext } from 'react';

import AuthContext from './AuthContext';

import '../styles/cart.css';
import { ImCross } from 'react-icons/im';

const AddToCartForm = () => {
  const { cartItems, handleCartItemQuantity, handleRemoveFromCart } = useContext(AuthContext);


  return (
    <div className='cart-products'>
      {cartItems?.map((item) => (
  <div key={item.id} className='cart-product'>
          <div style={{ height: '66%', width: '83%', marginTop: '-12px', marginLeft: '-90px' }} className='img-container'>
            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.title} />
          </div>
          <div style={{ display: 'flex' }} className='Prod-details'>
            <span className='name'>{item.title}</span>
            <ImCross style={{ marginLeft: '70px' }} className='close-btn' onClick={() => handleRemoveFromCart(item)} />
          </div>
          <div style={{ marginLeft: '-201px', display: 'flex', alignItems: 'center' }} className='quantity'>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30px',
                height: '30px',
                border: '1px solid',
                backgroundColor: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              className='quantity-btn'
              onClick={() => handleCartItemQuantity('dec', item)}
            >
              -
            </span>
            <span style={{ alignItems:'center', marginTop: '0px', display: 'flex', width: '40px', height: '30px', border: '1px solid', textAlign: 'center', justifyContent: 'center' }} className='quantity-input'>
              {item.quantity}
            </span>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30px',
                height: '30px',
                border: '1px solid',
                backgroundColor: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              className='quantity-btn'
              onClick={() => handleCartItemQuantity('inc', item)}
            >
              +
            </span>
          </div>
          <div style={{ color: 'black', marginLeft: '-104px' }} className='text'>
            <span>{item.quantity}</span>
            <span>x</span>
            <span>&#8377;</span>
            {item.price}
          </div>
        </div>
      ))}

    </div>
  );
};

export default AddToCartForm;
