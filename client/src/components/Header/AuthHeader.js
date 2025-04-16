import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './styles.css';

const AuthHeader = ({ userRole }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    }
  };

  const renderNavLinks = () => {
    switch (userRole) {
      case 'admin':
        return (
          <>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/companies">Companies</Nav.Link>
            <Nav.Link as={Link} to="/admin/students">Students</Nav.Link>
            <Nav.Link as={Link} to="/admin/analytics">Analytics</Nav.Link>
          </>
        );
      case 'student':
        return (
          <>
            <Nav.Link as={Link} to="/student/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/student/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/student/applications">Applications</Nav.Link>
            <Nav.Link as={Link} to="/student/profile">Profile</Nav.Link>
          </>
        );
      case 'company':
        return (
          <>
            <Nav.Link as={Link} to="/company/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/company/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/company/applications">Applications</Nav.Link>
            <Nav.Link as={Link} to="/company/profile">Profile</Nav.Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Campus Recruitment</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {renderNavLinks()}
          </Nav>
          <Button 
            variant="outline-danger" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthHeader; 