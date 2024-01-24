import React from "react";
import { Spinner as BootStrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <BootStrapSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </BootStrapSpinner>
  );
};

export default Spinner;
