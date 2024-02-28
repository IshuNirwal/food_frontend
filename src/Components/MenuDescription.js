import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from './AuthContext';
import '../styles/menudes.css';
import { BsCartFill } from 'react-icons/bs';

const MenuDescription = () => {
  const [foodItem, setFoodItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { handleAddToCart } = useContext(AuthContext);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/menuitem/${id}/`);
        const data = await response.json();
        setFoodItem(data);
      } catch (error) {
        console.error('Error fetching food item:', error);
      }
    };

    fetchFoodItem();
  }, [id]);

  if (!foodItem) {
    return <div>Loading...</div>;
  }

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const addToCart = async () => {
    try {
      await handleAddToCart(foodItem, quantity);
      setAddedToCart(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
      <section className='menudesc' id='menudesc'>
        <h1 className='heading'>
          <span>det</span>ails
        </h1>
        <div className='row'>
          <div className='image'>
            <img src={`http://127.0.0.1:8000/${foodItem.image}`} alt="Food Item" /><br /><br />
            <h3>{foodItem.title}</h3><br />
            <p> {foodItem.description}</p><br />
            Price <span>{foodItem.price}</span><br /><br />
          </div>

          <div className='content'>

            <div className='price'>
              Energy <span>{foodItem.energy}</span><br /><br />
              Carbs <span>{foodItem.carbs}</span><br /><br />
              Protein <span>{foodItem.protein}</span><br /><br />
              Fibre <span>{foodItem.fibre}</span><br /><br />
              Fat <span>{foodItem.fat}</span><br /><br />
              <div className="quantity">
                <button onClick={decrement} className="quantity-btn minus">-</button>
                <input type='text' className="quantity-input" value={quantity} />
                <button onClick={increment} className="quantity-btn plus">+</button>
              </div>

              <button onClick={addToCart} className='btn'>Add To Cart  <BsCartFill/></button>
              {addedToCart && <p style={{ color: '#ffc107', fontSize: '30px', marginTop: '33px'}}>Item added to cart successfully!</p>}
            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default MenuDescription;
