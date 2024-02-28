import React, { useRef } from 'react';
import axios from 'axios'; // Import the axios library
import emailjs from 'emailjs-com'; // Import the EmailJS library

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Use EmailJS to send an email
    emailjs.sendForm('service_yyd9lgb', 'template_911sdju', form.current, 'lvHzuWr6p3sxSkUfp')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.text);
      });

    // Get the form data
    const formData = new FormData(form.current);

    // Make an API request to your Django endpoint
    axios.post('http://127.0.0.1:8000/api/user/contact/', formData)
      .then((response) => {
        console.log(response.data.message);
        console.log("message sent");
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <section className='contact' id='contact'>
        <h1 className='heading'><span>Contact</span>us</h1>
        <div className='row'>
          <iframe className="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11993.267641772954!2d-72.8480109!3d41.2802068!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36c6fa619c4f5603!2sMcDonald&#39;s!5e0!3m2!1sen!2s!4v1633364807635!5m2!1sen!2s"
            allowFullScreen="" loading="lazy" ></iframe>
          <form ref={form} onSubmit={sendEmail}>
            <h3>get in touch</h3>
            <div className="inputBox">
              <span className="fas fa-user"></span>
              <input type="text" name='name' placeholder="name" />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope"></span>
              <input type="email" name='email' placeholder="email" />
            </div>
            <div className="inputBox">
              <span className="fas fa-phone"></span>
              <input type="text" name='message' placeholder="message" />
            </div>
            <input type="submit" value="contact now" className="btn" />
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
