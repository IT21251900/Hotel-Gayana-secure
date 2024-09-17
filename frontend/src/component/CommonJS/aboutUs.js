import React from 'react';

function AboutUs() {
  return (
    <div className="container">
        <br></br>
      <h1 className="text-center-1">About Us</h1>
      <div className="row">
        <div className="col-md-6">
          <img src="../Images/lotus.webp" alt="Company Logo" className="img-fluid" />
        </div>
        <div className="col-md-6">
            <br></br>
            <br></br>
          <h2>Welcome to Our Website</h2>
          <br></br>
          <p>Hotel Gayana is a premier hotel located in the beautiful coastal town of Tangalle, Sri Lanka. Our hotel offers a range of exceptional services and amenities to make your stay truly memorable.</p>
          <p>At Hotel Gayana, we take pride in providing luxurious accommodations, exquisite wedding halls, a delightful restaurant serving delectable cuisine, and convenient transportation services.</p>
          <p>Whether you're looking for a relaxing getaway, planning a dream wedding, or seeking an unforgettable dining experience, Hotel Gayana has it all. Our dedicated staff is committed to ensuring your utmost comfort and satisfaction throughout your stay.</p>
          <p>Experience the breathtaking beauty of Tangalle and indulge in our world-class facilities. We invite you to immerse yourself in the warm hospitality and impeccable service that Hotel Gayana is renowned for.</p>

          
       </div>
      </div>
      <h2 className="text-center mt-5">Contact Us</h2>
        <div className="row">
        <div className="col-md-6 offset-md-3 text-start">
            <p>For inquiries, reservations, or any assistance, please feel free to contact our friendly staff:</p>
            <ul>
            <li>Phone: 0112968415</li>
            <li>Email: info@gayana.com</li>
            <li>Address: 123 Main Street, Tangalle, Sri Lanka</li>
            </ul>
            <p>We look forward to hearing from you and assisting you with your needs.</p>
        </div>
</div>

    </div>
  );
}

export default AboutUs;