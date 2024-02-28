import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { ImCross } from 'react-icons/im';
import ReceiptPDF from './Receipt';
import { PDFViewer } from '@react-pdf/renderer';



  // Function to fetch receipt data based on transaction ID
  const fetchReceiptData = async (transactionId, accessToken) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/receipt/${transactionId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch receipt data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching receipt data:', error.message);
      return null;
    }
  };
const OrderNow = () => {
  const { cartItems, handleCartItemQuantity, handleRemoveFromCart, cartSubTotal, authTokens, setCartCount, setCartSubTotal } = useContext(AuthContext);

  // State to store the payment status and receipt popup visibility
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [receiptData, setReceiptData] = useState(null);;

  // Function to initiate the payment with Razorpay
  const initiatePayment = async () => {
    try {
      // Fetch the backend endpoint to initiate payment for all items in the cart
      const response = await fetch('http://127.0.0.1:8000/api/user/initiate-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token.access}`, // Include the authentication token here
        },
      });

      const data = await response.json();

      // Open the Razorpay payment window
      const options = {
        key: 'rzp_test_QDhcbvNRJScqgI', // Replace with your Razorpay key ID
        amount: data.payment_amount, // Amount in paise (already in paise)
        currency: 'INR',
        name: 'Foodify',
        description: 'Order Payment',
        image:'' ,
        order_id: data.payment_order_id,
        handler: function (response) {
          // Handle the payment success response here
          setPaymentStatus('success'); // Update the payment status

          // Send the payment response to the backend for updating the payment status and subtotal
          const paymentResponse = {
            transaction_id: response.razorpay_order_id, // Use 'razorpay_order_id' instead of 'razorpay_payment_id'
            status: 'success', // or response.razorpay_status if available from the response
          };
        
          fetch('http://127.0.0.1:8000/api/user/handle-payment-callback/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokens.token.access}`,
            },
            body: JSON.stringify(paymentResponse),
          }).then((response) => {
         // After payment is successful, fetch the receipt data
      fetchReceiptData(paymentResponse.transaction_id, authTokens.token.access).then((receiptData) => {
        console.log('Receipt data:', receiptData);
        if (receiptData) {
          setReceiptData(receiptData);
          setShowReceiptPopup(true);
              }
            });
          });
        },
        prefill: {
          email: 'customer@example.com', 
          contact: 'CUSTOMER_PHONE_NUMBER', 
        },
        notes: {
          address: 'Customer Address', 
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        // Handle the payment failure response here
        setPaymentStatus('failed'); 
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  useEffect(() => {
    // Dynamically add the Razorpay JavaScript SDK script to the DOM
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let count = 0;
    cartItems?.forEach((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.forEach((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  return (
    <div>
      <section className='order' id='order'>
        <h1 style={{ marginLeft: '50px' }} className='heading'>
          <span>order</span>now
        </h1>

        <div style={{ marginLeft: '-40px' }} className='cart-products'>
          {cartItems?.map((item) => (
            <div key={item.id} className='cart-product'>
              <div style={{ height: '66%', width: '83%', marginTop: '-12px', marginLeft: '-90px' }} className='img-container'>
                <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.title} />
                <span style={{ color: '#ffc107', fontSize: '28px', marginBottom: '10px' }} className='name'>
                  {item.title}
                </span>
              </div>
              <div style={{ display: 'flex' }} className='Prod-details'>
                <ImCross style={{ color: 'white', marginLeft: '70px' }} className='close-btn' onClick={() => handleRemoveFromCart(item)} />
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
                <span style={{ marginTop: '0px', display: 'flex', width: '30px', height: '30px', border: '1px solid', textAlign: 'center', justifyContent: 'center', alignItems: 'center', background: '#fff' }} className='quantity-input'>
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
              <div style={{ color: '#ffc107', marginLeft: '-97px' }} className='text'>
                <span>{item.quantity}</span>
                <span>x</span>
                <span>&#8377;</span>
                {item.price}
              </div>
            </div>
          ))}
          <div className='subtotal'>
            <span style={{ color: '#ffc107', fontSize: '30px', fontWeight: '700', textTransform: 'uppercase', marginLeft: '580px' }} className='text'>
              Subtotal
            </span>
            <span style={{ color: 'white', fontSize: '30px', marginLeft: '50px' }} className='text total'>
              &#8377; {cartSubTotal}
            </span>
          </div>
          <div>
            <button style={{ marginTop: '36px', marginLeft: '115px' }} className='btn' onClick={initiatePayment}>
              Make Payment
            </button>
          </div>
        </div>

         {/* Show receipt popup when `showReceiptPopup` is true and receiptData is available */}
      {showReceiptPopup && receiptData && (
        <div className="receipt-popup">
          <PDFViewer width="500" height="500">
            <ReceiptPDF receiptData={receiptData} />
          </PDFViewer>
            </div>
        )};
      </section>
    </div>
  );
};

export default OrderNow;