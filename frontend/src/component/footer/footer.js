import React from "react";


function Footer() {
  return (
    <div >
      <footer className="footer" style={{ backgroundColor: "#deded5" }}>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <h5 className="mb-3" style={{ letterSpacing: "2px", color: "#818963" }}>footer content</h5>
              <p>Experience luxury and comfort at our hotel management system. We strive to provide exceptional hospitality services, ensuring a memorable stay for our guests. With our state-of-the-art facilities and dedicated staff, we guarantee an unparalleled experience.</p>

            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3" style={{ letterSpacing: "2px", color: "#818963" }}>links</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="/" style={{ color: "#4f4f4f" }}>Home</a>
                </li>
                <li className="mb-1">
                  <a href="/aboutUs" style={{ color: "#4f4f4f" }}>About Us</a>
                </li>
                <li className="mb-1">
                  <a href="/Reservation/" style={{ color: "#4f4f4f" }}>Rooms</a>
                </li>
                <li>
                  <a href="/Client/" style={{ color: "#4f4f4f" }}>Transport</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-1" style={{ letterSpacing: "2px", color: "#818963" }}>opening hours</h5>
              <table className="table" style={{ color: "#4f4f4f", borderColor: "#666" }}>
                <tbody>
                  <tr>
                    <td>Mon - Fri:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Sat - Sun:</td>
                    <td>8am - 1am</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;