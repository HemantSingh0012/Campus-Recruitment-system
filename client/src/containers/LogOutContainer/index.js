import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../../actions';
import { persistor } from '../../store';
import PropTypes from 'prop-types';

import LogOut from '../../components/LogOut';

class LogOutContainer extends Component {
  state = { isProcessing: false };

  handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      this.setState({ isProcessing: true });
      // Clear all auth-related storage
      localStorage.clear();
      sessionStorage.clear();
      // Remove user from Redux state
      this.props.removeUser();
      // Force a page reload to clear any remaining state
      window.location.href = '/';
    }
  };

  render() {
    return (
      <LogOut
        handleLogOut={this.handleLogOut}
        isProcessing={this.state.isProcessing}
        variant={this.props.variant}
      />
    );
  }
}

LogOutContainer.propTypes = {
  removeUser: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

LogOutContainer.defaultProps = {
  variant: 'outline-light',
};

export default connect(null, { removeUser })(LogOutContainer);
