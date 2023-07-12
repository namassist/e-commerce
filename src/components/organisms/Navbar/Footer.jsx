import React from "react";
import { Link } from "react-router-dom";
import instagram from "../../../assets/images/ci_instagram.png";
import github from "../../../assets/images/ci_github.png";
import discord from "../../../assets/images/ci_discord.png";
import twitter from "../../../assets/images/ci_twitter.png";

const Footer = () => {
  return (
    <footer
      className="footer footer-center pt-7 pb-3 bg-primary text-white"
      id="contact"
    >
      <div>
        <h1 className="font-bold text-xl">React me out</h1>
        <div className="flex flex-rows space-x-4 mt-5 mb-7">
          <Link to="https://www.instagram.com/" target="_blank">
            <img src={instagram}></img>
          </Link>
          <Link
            to="https://github.com/hacktiv8-fp2-team2/FP02-Ecommerce-Team2"
            target="_blank"
          >
            <img src={github}></img>
          </Link>
          <Link
            to="https://discord.com/channels/1074976329658802206/1074976329658802211"
            target="_blank"
          >
            <img src={discord}></img>
          </Link>
          <Link to="https://twitter.com/" target="_blank">
            <img src={twitter}></img>
          </Link>
        </div>
        <p className="font-extralight tracking-wider">
          &copy; @Copyright 2023 &bull; Got any feedback?
        </p>
      </div>
    </footer>
  );
};

export default Footer;
