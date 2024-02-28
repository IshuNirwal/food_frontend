import React from 'react'
import AboutImg from '../assets/images/about-img'
import '../styles/about.css';

const About = () => {
  return (
    <>
    <section className='about'id='about'>
        <h1 className='heading'>
            <span>about</span>us
        </h1>
        <div className='row'>
            <div className='image'>
                <img src={AboutImg} alt=''/>
            </div>
            <div className='content'>
                <h3>What Makes Our Food Special?</h3>
                <p>It’s not dishes served in sheep skulls or any manufactured ‘wow factor’. It’s much more subtle and emotional than that</p>
                <p>The modern Indian food can come from a traditional Indian only. The heart and soul of the traditional food should be there in modern Indian dishes. While eating, you should feel that you are eating Indian cuisine rather than seeing it as an alien dish. It should be relatable yet different.</p>
            </div>
        </div>
    </section>
    </>
  )
}

export default About