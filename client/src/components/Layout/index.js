import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/HeaderContainer';

const Layout = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
