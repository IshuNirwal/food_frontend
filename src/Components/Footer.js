import React from "react";
import { BsFacebook } from "react-icons/bs";
import {FaInstagram} from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import {BiLogoPinterest} from "react-icons/bi";

const Footer = () => {
  return (
    <>
      <section class="footer">
        <div class="share">
          <a href="facebook"><BsFacebook/></a>
          <a href="twitter" class="fab fa-twitter"><AiOutlineTwitter/></a>
          <a href="instagram" class="fab fa-instagram"><FaInstagram/></a>
          <a href="linkedin" class="fab fa-linkedin"><BsLinkedin/></a>
          <a href="pinterest" class="fab fa-pinterest"><BiLogoPinterest/></a>
        </div>
        <div class="links">
          <a href="/">home</a>
          <a href="/about">about</a>
          <a href="/menu">menu</a>
          <a href="/contact">contact</a>
          <a href="/login">Login</a>
          <a href="/reg">Registration</a>
        </div>
        <div class="credit">
          created by <span>Coding circulate</span> | all rights reserved
        </div>
      </section>
    </>
  );
};

export default Footer;
