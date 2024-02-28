import React, { useEffect, useState, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const localStorageAuthTokens = localStorage.getItem('authTokens');
  const [authTokens, setAuthTokens] = useState(localStorageAuthTokens ? JSON.parse(localStorageAuthTokens) : null);
  const [user, setUser] = useState(localStorageAuthTokens ? jwt_decode(JSON.parse(localStorageAuthTokens).token.access) : null);

  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const location = useLocation();

  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/cartitem/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
  
      return response.json();
    } catch (error) {
      throw error;
    }
  };

    // Fetch initial cart items when user is logged in
    useEffect(() => {
      const fetchInitialCartItems = async () => {
        try {
          if (authTokens && user) {
            const data = await fetchCartItems();
            console.log("Fetched cart items:", data); // Log the fetched data
            setCartItems(data);
          }
        } catch (error) {
          console.error('Error fetching initial cart items:', error);
        }
      };
      
  
      fetchInitialCartItems();
    }, [authTokens, user]);
  

  // Function to add item to the backend cart and update the cartItems state
  const addToBackendCart = async (item, quantity) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/cartitem/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify({
          product: item.id,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const responseData = await response.json();
      // Assuming the server returns the newly added cart item in the response
      setCartItems((prevCartItems) => [...prevCartItems, responseData]);

      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const handleAddToCart = async (item, quantity) => {
    try {
      const backendCartItem = await addToBackendCart(item, quantity);
  
      console.log("Backend cart item:", backendCartItem);
      
  
      // Check if the added item already exists in cartItems
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === backendCartItem.id);
      console.log("Existing cart items:", cartItems);
      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedCartItems);
      } else {
        // If the item doesn't exist, add it to cartItems
        setCartItems((prevCartItems) => [...prevCartItems, backendCartItem]);
      }
  
      // Update cart count and clear any previous error messages
      setCartCount((prevCartCount) => prevCartCount + quantity);
      setError({ status: false, msg: '', type: '' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setError({ status: true, msg: 'Failed to add item to cart', type: 'error' });
    }
  };
  
  
  
  
  

  const handleRemoveFromCart = async (item) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/cartitem/${item.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_item_id: item.id }),
      });
  
      if (response.ok) {
        // Filter out the deleted cart item from cartItems
        setCartItems((prevCartItems) => prevCartItems.filter((cartItem) => cartItem.id !== item.id));
        setCartCount((prevCartCount) => prevCartCount - item.quantity); // Update cart count
        console.log("Cart item deleted successfully");
      } else {
        console.log("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleCartItemQuantity = (type, item) => {
    let items = [...cartItems];
    let index = items?.findIndex((i) => i.id === item?.id);
    if (type === 'inc') {
      items[index].quantity += 1;
    } else if (type === 'dec') {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  const Navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      const decodedToken = jwt_decode(data.token.access);
      setUser(decodedToken);
      localStorage.setItem('authTokens', JSON.stringify(data));
      Navigate('/', 3000);
    } else {
      setError({ status: true, msg: 'Check your password or email', type: 'error' });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    Navigate('/login');
  };

  let contextData = {
    user,
    loginUser,
    logoutUser,
    setCartSubTotal,
    cartSubTotal,
    cartCount,
    setCartCount,
    cartItems,
    setCartItems,
    handleAddToCart,
    handleCartItemQuantity,
    handleRemoveFromCart,
    authTokens,
  };

  return (
    <>
      <AuthContext.Provider value={contextData}>
        {children}
        <div style={{ color: 'red', fontSize: '30px', margin: '16px' }}>
          {error.status ? <alert>{error.msg}</alert> : ''}
        </div>
      </AuthContext.Provider>
    </>
  );
};