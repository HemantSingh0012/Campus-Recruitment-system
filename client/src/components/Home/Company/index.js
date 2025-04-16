import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';
import { 
  FaUsers, FaBriefcase, FaUserTie, FaChartLine, 
  FaBell, FaSearch, FaCheckCircle, FaClock,
  FaGraduationCap, FaBuilding, FaChartBar
} from 'react-icons/fa';
import * as ROUTES from '../../../constants/routes';

const Company = ({ user, stats }) => {
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);

  // Calculate percentages for progress bars
  const applicationRate = stats.totalJobs > 0 
    ? Math.round((stats.totalApplications / stats.totalJobs) * 100)
    : 0;
  const activeJobsRate = stats.totalJobs > 0 
    ? Math.round((stats.activeJobs / stats.totalJobs) * 100)
    : 0;

  // Mock recent activities (you can replace this with real data)
  const recentActivities = [
    { id: 1, type: 'application', message: 'New application received for Software Engineer position', time: '2 hours ago' },
    { id: 2, type: 'job', message: 'Your job post "Frontend Developer" is trending', time: '5 hours ago' },
    { id: 3, type: 'profile', message: '15 new profile views in the last 24 hours', time: '1 day ago' }
  ];

  return (
    <Container fluid className="py-4">
      {/* Welcome Alert */}
      {showWelcomeAlert && (
        <Alert 
          variant="info" 
          onClose={() => setShowWelcomeAlert(false)} 
          dismissible
          className="mb-4"
        >
          <Alert.Heading>👋 Welcome back, {user?.companyName || user?.firstName}!</Alert.Heading>
          <p className="mb-0">
            You have {stats.recentApplications} new applications this week. 
            Click here to <Alert.Link as={Link} to={ROUTES.JOBS}>review them</Alert.Link>.
          </p>
        </Alert>
      )}

      {/* Quick Actions Row */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-3">
            <Link to={ROUTES.JOBS_NEW}>
              <Button variant="primary" size="lg" className="d-flex align-items-center">
                <FaBriefcase className="me-2" />
                Post New Job
              </Button>
            </Link>
            <Link to={ROUTES.STUDENTS}>
              <Button variant="outline-primary" size="lg" className="d-flex align-items-center">
                <FaSearch className="me-2" />
                Search Candidates
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Statistics Cards Row */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="shadow-sm h-100 border-primary border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-2">Total Jobs</h6>
                  <h3 className="mb-0">{stats.totalJobs}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FaBriefcase className="text-primary" size={24} />
                </div>
              </div>
              <ProgressBar now={100} variant="primary" className="mb-2" style={{height: "4px"}} />
              <small className="text-muted">All time posted jobs</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 border-success border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-2">Active Jobs</h6>
                  <h3 className="mb-0">{stats.activeJobs}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FaChartLine className="text-success" size={24} />
                </div>
              </div>
              <ProgressBar now={activeJobsRate} variant="success" className="mb-2" style={{height: "4px"}} />
              <small className="text-muted">{activeJobsRate}% of total jobs</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 border-info border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-2">Applications</h6>
                  <h3 className="mb-0">{stats.totalApplications}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FaUsers className="text-info" size={24} />
                </div>
              </div>
              <ProgressBar now={applicationRate} variant="info" className="mb-2" style={{height: "4px"}} />
              <small className="text-muted">{applicationRate}% application rate</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 border-warning border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-2">New Applications</h6>
                  <h3 className="mb-0">{stats.recentApplications}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FaBell className="text-warning" size={24} />
                </div>
              </div>
              <ProgressBar now={100} variant="warning" className="mb-2" style={{height: "4px"}} />
              <small className="text-muted">In the last 7 days</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity and Quick Links */}
      <Row className="g-3">
        <Col md={8}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {recentActivities.map(activity => (
                <div key={activity.id} className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                  <div className="me-3">
                    {activity.type === 'application' && <FaUserTie size={24} className="text-primary" />}
                    {activity.type === 'job' && <FaBriefcase size={24} className="text-success" />}
                    {activity.type === 'profile' && <FaChartBar size={24} className="text-info" />}
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0">{activity.message}</p>
                    <small className="text-muted">
                      <FaClock className="me-1" />
                      {activity.time}
                    </small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Links</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-3">
                <Link to={ROUTES.PROFILE} className="text-decoration-none">
                  <Button variant="outline-primary" className="w-100 d-flex align-items-center justify-content-start p-3">
                    <FaBuilding className="me-3" size={24} />
                    <span>Company Profile</span>
                  </Button>
                </Link>
                <Link to={ROUTES.STUDENTS} className="text-decoration-none">
                  <Button variant="outline-success" className="w-100 d-flex align-items-center justify-content-start p-3">
                    <FaGraduationCap className="me-3" size={24} />
                    <span>Browse Students</span>
                  </Button>
                </Link>
                <Link to={ROUTES.ANALYTICS} className="text-decoration-none">
                  <Button variant="outline-info" className="w-100 d-flex align-items-center justify-content-start p-3">
                    <FaChartBar className="me-3" size={24} />
                    <span>Analytics Dashboard</span>
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Company Profile Preview */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Company Profile Preview</h5>
              <Link to={ROUTES.PROFILE}>
                <Button variant="outline-primary" size="sm">Edit Profile</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Company Name:</strong> {user?.companyName || 'Not set'}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Phone:</strong> {user?.companyPhone || 'Not set'}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Profile Completion:</strong></p>
                  <ProgressBar now={75} variant="success" className="mb-2" />
                  <p className="text-muted small">Complete your profile to attract more candidates</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Company;
