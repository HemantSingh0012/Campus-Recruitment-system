import React from 'react';
import { connect } from 'react-redux';
import * as ROLES from '../../constants/roles';
import * as LINKS from '../../constants/links';

import Header from '../../components/Header';

const HeaderContainer = ({ user }) => {
  // Default to public links if user or user.role is undefined
  let links = LINKS.PUBLIC_LINKS;
  let isAuthenticated = false;

  if (user) {
    isAuthenticated = true;
    switch (user.role) {
      case ROLES.ADMIN:
        links = LINKS.ADMIN_LINKS;
        break;
      case ROLES.COMPANY:
        links = LINKS.COMPANY_LINKS;
        break;
      case ROLES.STUDENT:
        links = LINKS.STUDENT_LINKS;
        break;
      default:
        links = LINKS.PUBLIC_LINKS;
        isAuthenticated = false;
    }
  }

  return <Header links={links} isAuthenticated={isAuthenticated} />;
};

const mapStateToProps = (state) => ({
  user: state.user || null
});

export default connect(mapStateToProps)(HeaderContainer);
