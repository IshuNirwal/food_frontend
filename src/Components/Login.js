import React, {  useState, useContext } from 'react'
import Blog2 from '../assets/images/blog2.jpeg';
import '../styles/login.css';
import AuthContext from './AuthContext';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loginUser} = useContext(AuthContext)
  return (
    <section className='login' id='login'>
        
        <h1 className='heading'><span>Login</span> here</h1>
          <div className='row'>
          <img className="image"src={Blog2} alt=''/>
          <form id='login-form' onSubmit={loginUser} >
            <h3>login here</h3>
            <div class="inputBox">
              <span class="fas fa-envelope"></span>
              <input  value={email} onChange={(e) => { setEmail(e.target.value) }} name='email'type="email" placeholder="email" />
            </div>
            <div class="inputBox">
              <span class="fas fa-phone"></span>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} name='password' type="text" placeholder="password" />
            </div>
            <a href='/'>Forgot password</a>
            <input type="submit" value="login" class="btn" /><br/><br/><br/>
          </form>
          </div>
        </section>
        
  );
};

export default Login;