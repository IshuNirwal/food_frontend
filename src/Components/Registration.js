import { useNavigate } from "react-router-dom";
import Blog1 from "../assets/images/blog1.jpeg";
import "../styles/login.css";
import React, { useState } from "react";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let data = {
      email: email,
      name: name,
      password: password,
      password2: password2,
    };

    if (
      data.name &&
      data.email &&
      data.password &&
      data.password2 !== null
    ) {
      if (data.password === data.password2) {
        if (data.email.match(validRegex) && isNaN(data.email[0])) {
          fetch("http://127.0.0.1:8000/api/user/register/", {
            method: "POST",

            headers: {
              Accept: "application/json",

              "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
          })
            .then((result) => {
              result.json().then((resp) => {
                console.log("resp", resp);
              });
            })
            .then(() => {
              // document.getElementById("registration-form").reset();

              setName("");

              setEmail("");

              setPassword("");

              setPassword2("");

              

              setError({
                status: true,
                msg: "Registration Successful",
                type: "success",
              });

               navigate("/login", 3000);
            });
        }
         else {
          setError({ status: true, msg: "Invalid email ", type: "error" });
        }
      } 
      else {
        setError({
          status: true,
          msg: "Password doesn't match",
          type: "error",
        });
      }
    }
     else {
      setError({ status: true, msg: "All field required", type: "error" });
    }
  };
  // const handleCheckboxClick = () => {

  //   setTc(true);

  // };

  return (
    <section className="login" id="login">
      <h1 className="heading">
        <span>Register</span> yourself
      </h1>
      <div className="row">
        <img className="image" src={Blog1} alt="" />
        <form id="reg-form" onSubmit={handleSubmit} action="">
          <h3>register here</h3>
          <div class="inputBox">
            <span class="fas fa-envelope"></span>
            <input value={name} onChange={(e) => { setName(e.target.value) }} name='name' type="text" placeholder="name" />
          </div>
          <div class="inputBox">
            <span class="fas fa-envelope"></span>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} name='email' type="email" placeholder="email" />
          </div>
          <div class="inputBox">
            <span class="fas fa-phone"></span>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} name='password' type="text" placeholder="password" />
          </div>
          <div class="inputBox">
            <span class="fas fa-envelope"></span>
            <input
              value={password2} onChange={(e) => { setPassword2(e.target.value) }} name='password2'
              type="text"
              placeholder="confirm Password"
            />
          </div>
          {/* <div class="inputBox">
             <span class="fas fa-envelope"></span>
             <input onClick={handleCheckboxClick} name='tc'id="tc" type="checkbox" value={"agree"} label='I agree terms and condition.'/><br/><br/><br/>
             </div> */}
          {/* <div class="inputBox">
          <input type="checkbox" checked={tc} onClick={handleCheckboxClick} name="tc" id="tc" label="I agree to term and condition." />
          </div> */}
          <input type="submit" value="signup" class="btn" />
          <br />
          <br />
          <br />
          {error.status ? <alert>{error.msg}</alert> : ""}
        </form>
      </div>
    </section>
  );
};

export default Registration;
