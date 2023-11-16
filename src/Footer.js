import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

            <div className="col-md-6 text-center name-footer" >
                <p>© 2023 Santiago Cadavid.</p>

            </div>
            <div className="col-md-6 text-center">

            <div className="social-icons">
                <a href="https://github.com/santiagocadavid" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/santiago-cadavid-37080781/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </a>
                </div>
            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
