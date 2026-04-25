import "./Contact.css";
import { useEffect } from "react";
import * as eva from "eva-icons";

function Contact() {
  useEffect(() => {
    // add this line
    eva.replace();
  }, []);
  return (
    <ul className="shadowed contact-list">
      <li className="contact-item">
        <i data-eva="pin-outline" className="contact-icon" />
        Stockholm, Sweden
      </li>
      <li className="contact-item">
        <i data-eva="at-outline" className="contact-icon" />
        <a href="mailto:dev@noahryden.se">dev@noahryden.se</a>
      </li>
      <li className="contact-item">
        <i data-eva="phone-outline" className="contact-icon" />
        <a href="tel:+46734228673">(+46) 073-422 86 73</a>
      </li>
      <li className="contact-item">
        <i data-eva="github-outline" className="contact-icon" />
        <a href="https://github.com/Nojoponken">Nojoponken</a>
      </li>
      <li className="contact-item">
        <i data-eva="linkedin-outline" className="contact-icon" />
        <a href="https://www.linkedin.com/in/noah-ryd%C3%A9n-bb9210226">
          Noah Rydén
        </a>
      </li>
    </ul>
  );
}

export default Contact;
