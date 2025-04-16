import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { withAPI } from '../../../services/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaBriefcase,
  FaUserTie,
  FaGraduationCap,
  FaChartBar,
  FaCog
} from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';

const Admin = ({ api }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    activeJobs: 0,
    pendingApprovals: 0,
    placedStudents: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Only fetch from existing endpoints
        const [studentsRes, companiesRes, jobsRes] = await Promise.all([
          api.getStudents(),
          api.getCompanies(),
          api.getJobs()
        ]);

        // Calculate stats from available data
        const students = studentsRes.data || [];
        const companies = companiesRes.data || [];
        const jobs = jobsRes.data || [];

        const activeJobs = jobs.filter(job => job.status === 'ACTIVE').length;
        const placedStudents = students.filter(student => student.status === 'PLACED').length;
        const pendingApprovals = jobs.filter(job => job.status === 'PENDING').length;

        setStats({
          totalStudents: students.length,
          totalCompanies: companies.length,
          activeJobs,
          pendingApprovals,
          placedStudents
        });

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'dashboard') {
      fetchDashboardData();
    }
  }, [api, activeTab]);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    switch(selectedTab) {
      case 'students':
        navigate('students');
        break;
      case 'companies':
        navigate('companies');
        break;
      case 'jobs':
        navigate('jobs');
        break;
      case 'analytics':
        navigate('analytics');
        break;
      case 'settings':
        navigate('settings');
        break;
      default:
        navigate('.');
    }
  };

  return (
    <div className="admin-dashboard">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="sidebar">
          <Card className="shadow-sm border-0 rounded-0 h-100">
            <Card.Body className="p-0">
              <Nav className="flex-column" activeKey={activeTab} onSelect={handleTabSelect}>
                <Nav.Item>
                  <Nav.Link eventKey="dashboard" className="d-flex align-items-center px-4 py-3">
                    <FaTachometerAlt className="me-3" />
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="students" className="d-flex align-items-center px-4 py-3">
                    <FaGraduationCap className="me-3" />
                    Students
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="companies" className="d-flex align-items-center px-4 py-3">
                    <FaBuilding className="me-3" />
                    Companies
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="jobs" className="d-flex align-items-center px-4 py-3">
                    <FaBriefcase className="me-3" />
                    Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="analytics" className="d-flex align-items-center px-4 py-3">
                    <FaChartBar className="me-3" />
                    Analytics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings" className="d-flex align-items-center px-4 py-3">
                    <FaCog className="me-3" />
                    Settings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="main-content">
          <Container fluid className="px-4 py-4">
            {activeTab === 'dashboard' && (
              <>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : error ? (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                ) : (
                  <>
                    {/* Stats Cards */}
                    <Row className="g-4 mb-4">
                      <Col sm={6} md={4}>
                        <Card className="shadow-sm border-0 h-100 bg-primary bg-gradient text-white">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-normal mb-2">Total Students</h6>
                                <h3 className="mb-0">{stats.totalStudents}</h3>
                              </div>
                              <div className="p-2 bg-white bg-opacity-25 rounded">
                                <FaGraduationCap size={24} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} md={4}>
                        <Card className="shadow-sm border-0 h-100 bg-success bg-gradient text-white">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-normal mb-2">Companies</h6>
                                <h3 className="mb-0">{stats.totalCompanies}</h3>
                              </div>
                              <div className="p-2 bg-white bg-opacity-25 rounded">
                                <FaBuilding size={24} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} md={4}>
                        <Card className="shadow-sm border-0 h-100 bg-info bg-gradient text-white">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-normal mb-2">Active Jobs</h6>
                                <h3 className="mb-0">{stats.activeJobs}</h3>
                              </div>
                              <div className="p-2 bg-white bg-opacity-25 rounded">
                                <FaBriefcase size={24} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} md={4}>
                        <Card className="shadow-sm border-0 h-100 bg-warning bg-gradient text-white">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-normal mb-2">Pending Jobs</h6>
                                <h3 className="mb-0">{stats.pendingApprovals}</h3>
                              </div>
                              <div className="p-2 bg-white bg-opacity-25 rounded">
                                <FaBriefcase size={24} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} md={4}>
                        <Card className="shadow-sm border-0 h-100 bg-secondary bg-gradient text-white">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-normal mb-2">Placed Students</h6>
                                <h3 className="mb-0">{stats.placedStudents}</h3>
                              </div>
                              <div className="p-2 bg-white bg-opacity-25 rounded">
                                <FaUserTie size={24} />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    {/* Welcome Card */}
                    <Card className="shadow-sm border-0">
                      <Card.Body className="p-4">
                        <h4 className="mb-3">Welcome to Admin Dashboard</h4>
                        <p className="text-muted mb-0">
                          Manage students, companies, and job postings from this central dashboard. 
                          Use the navigation menu on the left to access different sections of the admin panel.
                        </p>
                      </Card.Body>
                    </Card>
                  </>
                )}
              </>
            )}
          </Container>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style>
        {`
          :root {
            --header-height: 64px;
            --navbar-height: 56px;
            --total-top: calc(var(--header-height) + var(--navbar-height));
          }

          .admin-dashboard {
            min-height: calc(100vh - var(--total-top));
            background-color: #f8f9fa;
            margin-top: var(--total-top);
            position: relative;
          }

          .sidebar {
            position: fixed;
            top: var(--total-top);
            left: 0;
            bottom: 0;
            width: 240px;
            background-color: white;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            overflow-y: auto;
          }

          .main-content {
            margin-left: 240px;
            min-height: calc(100vh - var(--total-top));
            background-color: #f8f9fa;
            padding-bottom: 2rem;
          }

          @media (max-width: 991.98px) {
            .sidebar {
              position: static;
              width: 100%;
              top: 0;
              height: auto;
            }
            .main-content {
              margin-left: 0;
            }
            .admin-dashboard {
              margin-top: var(--navbar-height);
            }
          }

          .nav-link {
            color: #4a5568;
            border-radius: 0;
            transition: all 0.2s ease;
          }
          
          .nav-link:hover, .nav-link.active {
            color: #2b6cb0;
            background-color: #ebf8ff;
          }
          
          .card {
            transition: transform 0.2s ease;
          }
          
          .card:hover {
            transform: translateY(-2px);
          }
        `}
      </style>
    </div>
  );
};

export default compose(
  withAPI,
  connect(null)
)(Admin);
