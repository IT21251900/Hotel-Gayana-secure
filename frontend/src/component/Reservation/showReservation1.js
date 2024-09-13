import React from "react";
import "jspdf-autotable";

export default function ShowReserevation() {
  return (
    <div className="container">
      <br />
      <img
        src="../Images/GayanaRoom.jpg"
        alt="Hotel Transport Services"
        style={{ height: '500px' , width: '100%',paddingLeft:"0%"}} 
      /><br></br>
      <br></br>
      <div style={{ textAlign: "left" }}>
      <div >
        <br></br>
      <h1  id="hotel-heading">Efficient and Comfortable Hotel Transport Services for a Hassle-free Stay</h1>
        <p className="paragraph-content">
        showcases the hotel's commitment to providing top-notch transportation services. With a focus on efficiency and comfort, guests can expect a seamless and enjoyable experience during their stay. Whether it's airport transfers, 
        shuttle services to local attractions, or transportation arrangements for group events, the hotel's transport management system aims to ensure that guests have convenient options at their fingertips. By taking care of transportation 
        logistics, the hotel allows guests to relax and make the most of their stay, knowing that their travel needs are well taken care of.
        </p>
        <br />
        <br></br>
        <h5  id="hotel-heading">Rooms we have</h5>
      </div>
    </div>

          <div class="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
  <div className="card">
    <a href="/Reservation/add">
      <img src="../Images/Standered.jpg" className="card-img-top" alt="Hollywood Sign on The Hill" style={{ height: '270px', width: '100%' }} />
    </a>
    <div className="card-body">
      <h5 className="card-title">Standard Room</h5>
      <p className="card-text">
      The standard room is a basic accommodation option offered
               by hotels. It usually includes a comfortable bed, a private bathroom, and essential amenities. 
               Standard rooms are suitable for solo travelers or couples looking for a comfortable and affordable 
               stay.</p>
    </div>
  </div>
</div>
<div className="col">
  <div className="card">
    <a href="/Reservation/add">
      <img src="../Images/Delux.jpg" className="card-img-top" alt="Palm Springs Road" style={{ height: '270px', width: '100%' }} />
    </a>
    <div className="card-body">
      <h5 className="card-title">Deluxe</h5>
      <p className="card-text">
      The deluxe room is a step up from the standard room, offering additional space and enhanced amenities. 
              It often includes a larger bed, a seating area, a work desk, and more luxurious furnishings. 
              Deluxe rooms are ideal for guests seeking a more spacious and comfortable stay.</p>
    </div>
  </div>
</div>
<div className="col">
  <div className="card">
    <a href="/Reservation/add">
      <img src="../Images/Suite.jpg" className="card-img-top" alt="Los Angeles Skyscrapers" style={{ height: '270px', width: '100%' }} />
    </a>
    <div className="card-body">
      <h5 className="card-title">Suite</h5>
      <p className="card-text">A suite is a larger and more luxurious accommodation option. It typically comprises a separate bedroom 
              and living area, providing ample space 
              for relaxation and entertainment.Suites often feature upscale amenities such as a 
              kitchenette or full kitchen, a dining area, and sometimes even a private balcony or terrace.</p>
    </div>
  </div>
</div>
<div className="col">
  <div className="card">
    <a href="/Reservation/add">
      <img src="../Images/FamilyRoom.jpg" className="card-img-top" alt="Skyscrapers" style={{ height: '270px', width: '100%' }} />
    </a>
    <div className="card-body">
      <h5 className="card-title">Family Room</h5>
      <p className="card-text">
      Our Family Hotel Room offers ample space to accommodate the whole family. With multiple beds, including double beds, twin beds, 
      or bunk beds, everyone can sleep comfortably. We also provide additional 
      sleeping options such as sofa beds or rollaway beds, ensuring that there's enough room for everyone to rest and relax.</p>
    </div>
  </div>
</div>






</div>
    </div>
  );
}
