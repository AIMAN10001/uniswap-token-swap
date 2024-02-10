import React from "react";

const Platfrom = () => {
  return (
    <div className="platfrom" id="about">
      <div className="bg">
        <img src="assets/img/platform.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="row justify-content-center">
                <div
                  className="col-lg-9 text-center wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="section-head">
                    <h4 className="lasthead">About Us</h4>
                    <h2 className="title">
                      {" "}
                      The Online Cryptocurrency Exchange Platform
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ratione, cupiditate? Blanditiis nihil placeat obcaecati
                      laudantium inventore tenetur sint voluptatum voluptates
                      nostrum neque nesciunt sunt cumque commodi, repellendus
                      sit aperiam ducimus!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platfrom;
