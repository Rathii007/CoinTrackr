import React from "react";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import "./Header.css"; // Import your CSS file for styling

const Header = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>CoinTrackr</h1>
        <FaEthereum color="white" size={30} />
        <ul>
          <li>
            <Link className="url" to="/">
              <button className="nav-button">Home</button>
            </Link>
          </li>
          <li>
            <Link className="url" to="/coins">
              <button className="nav-button">Coins</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
