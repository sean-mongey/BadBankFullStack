import React from "react";

const Footer = () => {
  return (
    <footer className="fixed-bottom bg-dark text-white py-2">
      <div className="d-flex justify-content-evenly">
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <a
            href="http://www.linkedin.com/in/sean-mongey"
            style={{ color: "white" }}
          >
            <img
              src="linkedin.png"
              alt="LinkedIn"
              style={{ maxWidth: "40px", maxHeight: "40px" }}
            />
            Sean Mongey
          </a>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <a
            href="https://github.com/sean-mongey?tab=repositories"
            style={{ color: "white" }}
          >
            <img
              src="github.png"
              alt="GitHub"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
            sean-mongey.github.io
          </a>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <a
            href="https://github.com/sean-mongey/BadBank"
            style={{ color: "white" }}
          >
            <img
              src="bank.png"
              alt="Bank Logo"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                marginLeft: "10px",
              }}
            />
            Bad Bank
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
