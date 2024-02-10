import React from "react";
import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialGithubCircular,
  TiSocialPinterestCircular,
} from "react-icons/ti";

const Footer = () => {
  return (
    <div className="footer">
      style={{ backgroundImage: "url('assets/img/footer/-bg.png')" }}
      <div className="container">
        <div className="row">
          <div
            className="col-12 wow fadeInUp"
            data-wow-duration="03s"
            data-wow-delay="0.2s"
          >
            <div className="top-footer">
              <div className="logo">
                <img src="assets/img/logo.png" alt="" />
              </div>
              <a href="/" className="button-1">
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        <div className="row justify-content-betwen">
          <div
            className="col-lg-2 col-md-6 wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div className="footer-box">
              <h4 className="lasthead"> Company</h4>
              <ul className="footer-link">
                {["About Us", "Contact Us", "Blog", "Affiliate"].map(
                  (item, index) => (
                    <li key={index}>
                      <a href="#">{item}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div
            className="col-lg-2 col-md-6 wow fadeInUp"
            data-wow-duration="0.4s"
            data-wow-delay="0.4s"
          >
            <div className="footer-box">
              <h4 className="lasthead">Support</h4>
              <ul className="footer-link">
                {["FAQ", "Contact Time", "How It Works", "Details"].map(
                  (item, index) => (
                    <li key={index}>
                      <a href="#">{item}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div
            className="col-lg-2 col-md-6 wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.5s"
          >
            <div className="footer-box">
              <h4 className="lasthead">Policy</h4>
              <ul className="footer-link">
                {[
                  "Terms Of Use",
                  "Privacy Policy",
                  "Refunds Policy",
                  "Money Type",
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="col-lg-5 col-md-6 wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.5s"
          >
            <div className="footer-box">
              <h4 className="lasthead">NewsLetter</h4>
              <form action="#">
                <div className="form-group">
                  <input type="email" placeholder="Enter email address" />
                  <button type="submit" className="button-1">
                    Join Now
                  </button>
                </div>
              </form>
              <div className="social-style">
                <a href="#">
                  <i className="">
                    <TiSocialGithubCircular />
                  </i>
                </a>
                <a href="#">
                  <i className="">
                    <TiSocialInstagram />
                  </i>
                </a>
                <a href="#">
                  <i className="">
                    <TiSocialLinkedin />
                  </i>
                </a>
                <a href="#">
                  <i className="">
                    <TiSocialPinterestCircular />
                  </i>
                </a>
                <a href="#">
                  <i className="">
                    <TiSocialTwitter />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div
            className="col-12 text-center wow fadeInUp"
            data-wow-duration="0.4s"
            data-wow-delay="0.4s"
          >
            <div className="footer-bottom">
              <p className="text">
                Copyright &copy; <a href="#">@aimanibnubayd</a>
                {""}
                <a href="#">2024</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
