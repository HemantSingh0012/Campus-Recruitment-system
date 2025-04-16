import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaBuilding, FaUser, FaFileUpload } from 'react-icons/fa';
import { withAPI } from '../../../services/api';
import * as ROUTES from '../../../constants/routes';
import './styles.css';

const Student = ({ api }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [dashboardData, setDashboardData] = useState({
    recentJobs: [],
    applications: [],
    profile: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all required data
        const [jobsRes, applicationsRes, profileRes] = await Promise.all([
          api.getJobs(),
          api.getApplications(),
          api.getProfile()
        ]);

        setDashboardData({
          recentJobs: jobsRes.data || [],
          applications: applicationsRes.data || [],
          profile: profileRes.data
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('pdf')) {
      setUploadStatus('Please upload a PDF file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('File size should be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      setUploadStatus('Uploading...');
      await api.uploadResume(formData);
      setUploadStatus('Resume uploaded successfully!');
      
      // Refresh profile data
      const profileRes = await api.getProfile();
      setDashboardData(prev => ({
        ...prev,
        profile: profileRes.data
      }));
    } catch (err) {
      console.error('Error uploading resume:', err);
      setUploadStatus('Failed to upload resume. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Recent Jobs */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h3 className="h5 mb-0">Recent Job Postings</h3>
        </Card.Header>
        <Card.Body>
          {dashboardData.recentJobs.slice(0, 2).map(job => (
            <div key={job._id} className="mb-3 pb-3 border-bottom">
              <h4 className="h6 mb-1">{job.title}</h4>
              <p className="text-muted small mb-2">
                {job.company?.name || 'Unknown Company'} • Posted {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <Link to={`${ROUTES.JOBS}/${job._id}`}>
                <Button variant="outline-primary" size="sm">View Details</Button>
              </Link>
            </div>
          ))}
          {dashboardData.recentJobs.length === 0 && (
            <p className="text-muted text-center mb-0">No jobs available at the moment</p>
          )}
        </Card.Body>
      </Card>

      {/* Your Applications */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h3 className="h5 mb-0">Your Applications</h3>
          <Link to={ROUTES.JOBS}>
            <Button variant="outline-primary" size="sm">View All Applications</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {dashboardData.applications.length === 0 ? (
            <p className="text-muted text-center mb-0">No applications yet</p>
          ) : (
            <div className="text-end">
              <Link to={ROUTES.JOBS}>
                <Button variant="link" className="text-decoration-none">View All Applications</Button>
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>

      <Row>
        {/* Quick Actions */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h3 className="h5 mb-0">Quick Actions</h3>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to={ROUTES.JOBS}>
                  <Button variant="primary" className="w-100 d-flex align-items-center">
                    <FaBriefcase className="me-2" /> Browse Jobs
                  </Button>
                </Link>
                <Link to={ROUTES.COMPANIES}>
                  <Button variant="outline-primary" className="w-100 d-flex align-items-center">
                    <FaBuilding className="me-2" /> View Companies
                  </Button>
                </Link>
                <Link to={ROUTES.PROFILE}>
                  <Button variant="outline-primary" className="w-100 d-flex align-items-center">
                    <FaUser className="me-2" /> Update Profile
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Completion */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h3 className="h5 mb-0">Profile Completion</h3>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6 className="mb-2">Basic Information</h6>
                {dashboardData.profile ? (
                  <>
                    <p className="mb-1">{dashboardData.profile.firstName} {dashboardData.profile.lastName}</p>
                    <p className="text-muted mb-3">{dashboardData.profile.email}</p>
                    
                    {/* Resume Upload Section */}
                    <div className="resume-section mb-3">
                      <h6 className="mb-2">Resume</h6>
                      {dashboardData.profile.resume ? (
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            href={dashboardData.profile.resume}
                            target="_blank"
                          >
                            View Resume
                          </Button>
                          <Form.Group controlId="resumeUpload" className="mb-0">
                            <Form.Label className="btn btn-outline-primary btn-sm mb-0">
                              <FaFileUpload className="me-1" /> Update Resume
                              <Form.Control
                                type="file"
                                accept=".pdf"
                                className="d-none"
                                onChange={handleResumeUpload}
                              />
                            </Form.Label>
                          </Form.Group>
                        </div>
                      ) : (
                        <Form.Group controlId="resumeUpload" className="mb-3">
                          <Form.Label className="btn btn-primary mb-0">
                            <FaFileUpload className="me-1" /> Upload Resume
                            <Form.Control
                              type="file"
                              accept=".pdf"
                              className="d-none"
                              onChange={handleResumeUpload}
                            />
                          </Form.Label>
                          <Form.Text className="text-muted d-block">
                            Upload your resume in PDF format (max 5MB)
                          </Form.Text>
                        </Form.Group>
                      )}
                      {uploadStatus && (
                        <div className={`alert alert-${uploadStatus.includes('success') ? 'success' : 'info'} py-2 px-3 mb-3`}>
                          {uploadStatus}
                        </div>
                      )}
                    </div>

                    <Link to={ROUTES.PROFILE}>
                      <Button variant="primary">Update Profile</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-muted mb-3">Complete your profile to increase your chances of getting hired</p>
                    <Link to={ROUTES.PROFILE}>
                      <Button variant="primary">Complete Profile</Button>
                    </Link>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withAPI(Student);
