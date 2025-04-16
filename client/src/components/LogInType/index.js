import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserShield, FaBuilding, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import * as ROUTES from '../../constants/routes';

const LogInType = () => {
  return (
    <div className="auth-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-3">Welcome Back</h1>
              <p className="text-muted lead">Log in to your account to continue</p>
            </div>
            
            <Card className="shadow-lg border-0 card-hover">
              <Card.Body className="p-4">
                <div className="d-grid gap-4">
                  <LinkContainer to={ROUTES.LOG_IN_ADMIN}>
                    <Button variant="light" size="lg" className="auth-btn admin-btn">
                      <div className="d-flex align-items-center">
                        <div className="btn-icon admin">
                          <FaUserShield size={24} />
                        </div>
                        <div className="flex-grow-1 text-start ms-3">
                          <h5 className="mb-1">Admin</h5>
                          <p className="mb-0 text-muted small">System administration and management</p>
                        </div>
                        <FaArrowRight className="ms-2 btn-arrow" />
                      </div>
                    </Button>
                  </LinkContainer>

                  <LinkContainer to={ROUTES.LOG_IN_COMPANY}>
                    <Button variant="light" size="lg" className="auth-btn company-btn">
                      <div className="d-flex align-items-center">
                        <div className="btn-icon company">
                          <FaBuilding size={24} />
                        </div>
                        <div className="flex-grow-1 text-start ms-3">
                          <h5 className="mb-1">Company</h5>
                          <p className="mb-0 text-muted small">Access your company dashboard</p>
                        </div>
                        <FaArrowRight className="ms-2 btn-arrow" />
                      </div>
                    </Button>
                  </LinkContainer>
                  
                  <LinkContainer to={ROUTES.LOG_IN_STUDENT}>
                    <Button variant="light" size="lg" className="auth-btn student-btn">
                      <div className="d-flex align-items-center">
                        <div className="btn-icon student">
                          <FaUserGraduate size={24} />
                        </div>
                        <div className="flex-grow-1 text-start ms-3">
                          <h5 className="mb-1">Student</h5>
                          <p className="mb-0 text-muted small">Access your student profile</p>
                        </div>
                        <FaArrowRight className="ms-2 btn-arrow" />
                      </div>
                    </Button>
                  </LinkContainer>
                </div>
              </Card.Body>
              <Card.Footer className="text-center border-0 bg-light py-4">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to={ROUTES.SIGN_UP} className="text-decoration-none fw-medium">
                    Create One
                  </Link>
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS */}
      <style>
        {`
          .auth-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 2rem 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }

          .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 1rem;
          }

          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
          }

          .auth-btn {
            background: white;
            border: 1px solid #dee2e6;
            padding: 1.5rem;
            transition: all 0.3s ease;
            border-radius: 0.75rem;
          }

          .admin-btn:hover {
            border-color: #6f42c1;
            background: rgba(111, 66, 193, 0.05);
          }

          .company-btn:hover {
            border-color: #0d6efd;
            background: rgba(13, 110, 253, 0.05);
          }

          .student-btn:hover {
            border-color: #198754;
            background: rgba(25, 135, 84, 0.05);
          }

          .btn-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          .btn-icon.admin {
            background: rgba(111, 66, 193, 0.1);
            color: #6f42c1;
          }

          .btn-icon.company {
            background: rgba(13, 110, 253, 0.1);
            color: #0d6efd;
          }

          .btn-icon.student {
            background: rgba(25, 135, 84, 0.1);
            color: #198754;
          }

          .auth-btn:hover .btn-icon {
            transform: scale(1.1);
          }

          .btn-arrow {
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }

          .auth-btn:hover .btn-arrow {
            opacity: 1;
            transform: translateX(0);
          }

          @media (max-width: 576px) {
            .auth-wrapper {
              padding: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LogInType;
