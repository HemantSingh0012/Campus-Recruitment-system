import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { FaGraduationCap, FaBars } from 'react-icons/fa';
import * as ROUTES from '../../constants/routes';
import LogOutContainer from '../../containers/LogOutContainer';

const Header = ({ links, isAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header>
      <Navbar
        expand="lg"
        fixed="top"
        expanded={expanded}
        className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <LinkContainer to={ROUTES.LANDING}>
            <Navbar.Brand className="brand-animation">
              <FaGraduationCap className="brand-icon" />
              <span className="ms-2">CRS</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FaBars />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {links.map((link, i) => (
                <LinkContainer 
                  key={i} 
                  to={link.path}
                  onClick={() => setExpanded(false)}
                >
                  <Nav.Link className="nav-link-animation">
                    {link.text}
                  </Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
            {isAuthenticated && (
              <div className="nav-btn-animation">
                <LogOutContainer />
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Custom CSS */}
      <style>
        {`
          .navbar-custom {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            padding: 1rem 0;
          }

          .navbar-scrolled {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
          }

          .brand-animation {
            display: flex;
            align-items: center;
            font-weight: 600;
            color: #0d6efd !important;
            transition: transform 0.3s ease;
          }

          .brand-animation:hover {
            transform: scale(1.05);
          }

          .brand-icon {
            font-size: 1.8rem;
            transition: transform 0.3s ease;
          }

          .brand-animation:hover .brand-icon {
            transform: rotate(-10deg);
          }

          .nav-link-animation {
            position: relative;
            color: #333 !important;
            font-weight: 500;
            transition: color 0.3s ease !important;
            padding: 0.5rem 1rem !important;
            margin: 0 0.2rem;
          }

          .nav-link-animation::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background-color: #0d6efd;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .nav-link-animation:hover {
            color: #0d6efd !important;
          }

          .nav-link-animation:hover::after {
            width: 100%;
          }

          .nav-btn-animation {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .navbar-toggler {
            border: none;
            padding: 0.5rem;
            transition: transform 0.3s ease;
          }

          .navbar-toggler:hover {
            transform: scale(1.1);
          }

          .navbar-toggler:focus {
            box-shadow: none;
          }

          @media (max-width: 991.98px) {
            .navbar-collapse {
              background: white;
              padding: 1rem;
              border-radius: 8px;
              margin-top: 1rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .nav-link-animation {
              padding: 0.75rem 1rem !important;
              margin: 0.2rem 0;
            }

            .nav-link-animation::after {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
};

Header.propTypes = {
  links: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
