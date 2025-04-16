import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './styles.css';

const LogOut = ({ handleLogOut, isProcessing, variant = 'outline-light' }) => (
  <Button
    onClick={handleLogOut}
    disabled={isProcessing}
    variant={variant}
    className="logout-btn"
  >
    {isProcessing ? 'Logging out...' : 'Log Out'}
  </Button>
);

LogOut.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  variant: PropTypes.string,
};

export default LogOut;
