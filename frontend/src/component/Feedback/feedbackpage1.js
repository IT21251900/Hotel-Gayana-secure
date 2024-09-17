import React, { useEffect } from "react";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ShowFeedbackPage() {
  useEffect(() => {
    // Initialize the carousel manually
    const carousel = document.getElementById("carouselDarkVariant");
    const carouselInstance = new window.bootstrap.Carousel(carousel, {
      interval: 5000, // Set the interval as desired
    });

    // Start the carousel autoplay
    carouselInstance.cycle();

    return () => {
      // Stop the carousel autoplay when the component is unmounted
      carouselInstance.pause();
    };
  }, []);

  return (
    <section className="gradient-custom">
      <div className="container my-5 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="text-center mb-4 pb-2">
              <i className="fas fa-quote-left fa-3x text-white"></i>

              <h2 style={{fontSize:50}}><center>Testimonials</center></h2><br/>
              <h5><center><i>"Exceptional Hotel System: A Seamless Experience from Start to Finish"</i></center></h5>


            </div>

            <div className="card">
              <div className="card-body px-4 py-5">
                {/* Carousel wrapper */}
                <div id="carouselDarkVariant" className="carousel slide carousel-dark">
                  {/* Indicators */}
                  <div className="carousel-indicators mb-0">
                    <button
                      data-bs-target="#carouselDarkVariant"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      data-bs-target="#carouselDarkVariant"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      data-bs-target="#carouselDarkVariant"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>

                  {/* Carousel inner */}
                  <div className="carousel-inner pb-5">
                    {/* Single item */}
                    <div className="carousel-item active">
                      <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center">
                              <img
                                src="../Images/3.jpg"
                                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                alt="woman avatar"
                                width="150"
                                height="150"
                              />
                            </div>
                            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                              <h4 className="mb-4">Samantha Fernando</h4>
                              <p className="mb-0 pb-3">
                                "I recently stayed at Hotel Gayana and their system exceeded my expectations. From the moment I booked online to the smooth check-in process, everything was well-organized and user-friendly."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single item */}
                    <div className="carousel-item">
                      <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center">
                              <img
                                src="../Images/1.jpg"
                                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                alt="woman avatar"
                                width="150"
                                height="150"
                              />
                            </div>
                            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                              <h4 className="mb-4">Himaya Perera</h4>
                              <p className="mb-0 pb-3">
                              "The hotel's restaurant exceeded my expectations. The attentive staff, cozy ambiance, and delectable dishes created a memorable dining experience."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single item */}
                    <div className="carousel-item">
                      <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center">
                              <img
                                src="../Images/2.jpg"
                                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                alt="man avatar"
                                width="150"
                                height="150"
                              />
                            </div>
                            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                              <h4 className="mb-4">Rahal Dias</h4>
                              <p className="mb-0 pb-3">
                              "Checking out was a breeze thanks to the efficient billing system at Hotel Gayana. The process was quick, accurate, and hassle-free, leaving me with a positive impression of the hotel's overall organization."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselDarkVariant"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselDarkVariant"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                {/* Carousel wrapper */}
              </div>
            </div>

            <div className="text-center mt-4 pt-2">
              <i className="fas fa-quote-right fa-3x text-white"></i>
            </div>
            <div style={{ justifycontent:' center'}}>
            <a href="/home1/">
  <button
    style={{
      borderColor: '#443ea2',
      color: '#443ea2',
      borderRadius: '10rem',
      width: '200px',
      height: '50px'
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#443ea2';
      e.target.style.color = 'white';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '';
      e.target.style.color = '#443ea2';
    }}
  >
    Add Your Feedback
  </button>
</a>
</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
