import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <section
      className="bottom-0 relative overflow-hidden py-10 bg-bkg-secondary border-b border-b-secondary"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="5rem" />
              </div>
              <div>
                <p className="text-sm text-text-muted">
                  &copy; Copyright {getCurrentYear()}. All
                  Rights Reserved by etank0.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-text-secondary">
                Navigate
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-text-primary hover:text-text-muted"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-text-primary hover:text-text-muted"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-text-secondary">
                Contact Us
              </h3>
              <ul>
                <li className="flex gap-4 mb-4">
                  <Link
                    className="text-lg font-medium text-text-primary hover:text-text-muted"
                    target="_blank"
                    to="mailto:swetank.690@gmail.com"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Link>
                  <Link
                    className="text-lg font-medium text-text-primary hover:text-text-muted"
                    target="_blank"
                    to="https://linkedin.com/in/etank0"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                  <Link
                    className="text-lg font-medium text-text-primary hover:text-text-muted"
                    target="_blank"
                    to="https://github.com/etank0"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
