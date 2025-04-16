import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { 
  FaUserGraduate, 
  FaBuilding, 
  FaHandshake,
  FaChartLine,
  FaLightbulb,
  FaRocket
} from 'react-icons/fa';
import * as ROUTES from '../../constants/routes';

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <div 
        className="bg-primary bg-gradient text-white" 
        style={{ 
          marginTop: '-1px',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Connect Talent with Opportunity
              </h1>
              <p className="lead mb-4 opacity-90">
                Welcome to the Campus Recruitment System - where talented students meet great companies. 
                Start your journey towards a successful career or find your next star employee.
              </p>
              <div className="d-grid gap-3 d-sm-flex">
                <Link to={ROUTES.SIGN_UP}>
                  <Button variant="light" size="lg" className="px-4 gap-3">
                    Get Started
                    <FaRocket className="ms-2" />
                  </Button>
                </Link>
                <Link to={ROUTES.LOG_IN}>
                  <Button variant="outline-light" size="lg" className="px-4">
                    Sign In
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://img.freepik.com/free-vector/recruitment-process-concept-illustration_114360-5146.jpg" 
                alt="Campus Recruitment" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Statistics Section */}
      <div className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-primary">500+</h2>
              <p className="text-muted mb-0">Companies</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-success">10k+</h2>
              <p className="text-muted mb-0">Students</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-info">2k+</h2>
              <p className="text-muted mb-0">Jobs Posted</p>
            </Col>
            <Col md={3}>
              <h2 className="display-4 fw-bold text-warning">95%</h2>
              <p className="text-muted mb-0">Success Rate</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 text-center hover-lift">
              <Card.Body className="p-4">
                <div className="icon-box mb-4">
                  <FaUserGraduate className="text-primary" size={40} />
                </div>
                <h4 className="mb-3">For Students</h4>
                <p className="text-muted">
                  Access top companies, get interview opportunities, and kickstart your career journey.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 text-center hover-lift">
              <Card.Body className="p-4">
                <div className="icon-box mb-4">
                  <FaBuilding className="text-success" size={40} />
                </div>
                <h4 className="mb-3">For Companies</h4>
                <p className="text-muted">
                  Find talented graduates, streamline recruitment, and build your future workforce.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 text-center hover-lift">
              <Card.Body className="p-4">
                <div className="icon-box mb-4">
                  <FaChartLine className="text-info" size={40} />
                </div>
                <h4 className="mb-3">Analytics</h4>
                <p className="text-muted">
                  Get insights into recruitment trends, application statistics, and hiring metrics.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 text-center hover-lift">
              <Card.Body className="p-4">
                <div className="icon-box mb-4">
                  <FaHandshake className="text-warning" size={40} />
                </div>
                <h4 className="mb-3">Easy Process</h4>
                <p className="text-muted">
                  Simple and efficient recruitment process from job posting to final selection.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-dark text-white text-center py-5">
        <Container className="py-4">
          <h2 className="display-6 mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4 opacity-75">
            Join thousands of students and companies already using our platform
          </p>
          <Link to={ROUTES.SIGN_UP}>
            <Button variant="primary" size="lg" className="px-5">
              Join Now
              <FaLightbulb className="ms-2" />
            </Button>
          </Link>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-light py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0 text-muted">
                © 2025 Campus Recruitment System. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <Button variant="link" className="text-muted text-decoration-none">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-muted text-decoration-none">
                Terms of Service
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Custom CSS */}
      <style>
        {`
          .hover-lift {
            transition: transform 0.2s ease;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
          }
          .icon-box {
            padding: 20px;
            border-radius: 50%;
            background: rgba(var(--bs-primary-rgb), 0.1);
            display: inline-block;
          }
        `}
      </style>
    </>
  );
};

export default Landing;
