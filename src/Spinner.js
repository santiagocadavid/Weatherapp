// Spinner.js

import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <BootstrapSpinner animation="border" role="status" className="spinner">
        <span className="sr-only">Loading...</span>
      </BootstrapSpinner>
      <span className="loading-message">Loading, please wait...</span>
    </div>
  );
};

export default Spinner;
