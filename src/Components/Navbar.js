import React, { useContext, useRef} from 'react';
import Logo from '../assets/images/logo.png';
import { FiSearch } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import { AiOutlineBars } from 'react-icons/ai';
import Cart from './Cartitem';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const Navbar = () => {
    const { user, logoutUser, cartCount } = useContext(AuthContext);
    const navigate = useNavigate();
    const searchRef = useRef();
    const cartRef = useRef();
    const navbarRef = useRef();
    const { cartItems, cartSubTotal } = useContext(AuthContext);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
          navigate(`/search?query=${encodeURIComponent(event.target.value)}`);
          event.target.value = '';
        }
      };

    const searchHandler = () => {
        searchRef.current.classList.toggle('active');
        cartRef.current.classList.remove('active');
        navbarRef.current.classList.remove('active');
    };

    const cartHandler = () => {
        cartRef.current.classList.toggle('active');
        navbarRef.current.classList.remove('active');
        searchRef.current.classList.remove('active');
    };

    const navbarHandler = () => {
        navbarRef.current.classList.toggle('active');
        searchRef.current.classList.remove('active');
        cartRef.current.classList.remove('active');
    };
    

    return (
        <>
            <header className='header'>
                <a href="/" className='logo'>
                    <img src={Logo} alt='' />
                </a>
                <nav className='navbar' ref={navbarRef}>
                    <a href='/'>home</a>
                    <a href='/about'>About</a>
                    <a href='/menu'>Menu</a>
                    <a href='/contact'>Contact</a>
                    {user ? (
                        <a href="login" onClick={logoutUser}>Logout</a>
                    ) : (
                        <a href='/login'>Login</a>
                    )}
                    <a href='/reg'>Registration</a>
                </nav>
                <div className='icons'>
                    {user && <div onClick={searchHandler}><FiSearch /></div>}
                    <div style={{display:'flex'}}>
                    <div onClick={cartHandler} className='cart-icon'>
                    <BsCart /> </div>
                    <div style={{color:'#ffc107',fontSize:'15px'}}> {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}</div>
                    </div>
                    <div onClick={navbarHandler} id='menu-btn'><AiOutlineBars /></div>
                </div>
                <div className='search-form' ref={searchRef}>
            <input
                type='text'
                placeholder='Search here...'
                onKeyDown={handleSearch}
            />
            <label className='fas fa-search' htmlFor='search-box'></label>
        </div>
        <div className='cart-items-container'ref={cartRef}>
                 <h1 style={{marginTop:"20px"}}>Shopping Cart</h1>
        
            
            {!cartItems?.length &&  <div className='empty-cart'style={{marginTop: "35rem",}}>
               
               <span style={{color:"black",fontSize:"20px",fontWeight:"700",textTransform:"uppercase"}}>No product in the cart.</span><br/><br/>
               <BsCart style={{height:'10%',width:'10%'}}/><br/><br/>
               <a className='btn' href="/menu">Return to shop</a>
            </div>}
            
            <Cart/>
            {!!cartItems?.length && <><div className='cart-footer'>
                <div className='subtotal'>
                    <span style={{color:"black",fontSize:"20px",fontWeight:"700",textTransform:"uppercase"}} className='text'>Subtotal</span>
                    <span style={{ color: "black", marginLeft:"150px"}} className='text total'>&#8377;{cartSubTotal}</span>

                </div>
                </div>
                <div>
                <a className='btn' href="/saveaddress">checkout now</a>
                </div>
                </>}
            </div>
           
            </header>
        </>
    );
};

export default Navbar;