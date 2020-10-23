import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Content() {
  return (
    <div>
      <section className="first_intro_home">
        <div className="summer_text_div">
          <p className="ice">Ice Ice</p>
          <p className="summer_text">summer</p>
          <p className="summer_text">drink</p>
        </div>
        <div className="social_icons">
          <a
            href="https://www.facebook.com/profile.php?id=100006926419157"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          <a
            href="https://www.instagram.com/armanumroyan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://www.linkedin.com/in/arman-umroyan-5b42bb176/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </section>
    </div>
  );
}
