import React from 'react';
import './navbar1.css';

function Sidenavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
      <a className="navbar-brand" href="/">
          <img
            src="../Images/lotus1.png"
            height="55"
            alt=""
            loading="lazy"
          />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li id="Nave-bar-compo"className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            
            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/aboutUs">About Us</a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Client/">Transport </a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Reservation/">Reservation </a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/wedding/">Weddings </a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Food/">Restaurant </a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/navbar1/">Feedback </a>
            </li>

            <li id="Nave-bar-compo" className="nav-item">
              <a className="nav-link active" aria-current="page" href="/link1/">Support </a>
            </li>
          </ul>
         
        </div>
      </div>
    </nav>
  );
}

export default Sidenavbar;