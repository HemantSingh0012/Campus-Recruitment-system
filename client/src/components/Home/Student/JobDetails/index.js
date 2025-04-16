import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaClock, FaMapMarkerAlt, FaDollarSign, FaUserGraduate, FaBriefcase } from 'react-icons/fa';
import { withAPI } from '../../../../services/api';
import './styles.css';

const JobDetails = ({ api }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data for demonstration
  const sampleJob = {
    _id: id,
    title: "Senior Software Engineer",
    company: {
      name: "Tech Innovations Inc.",
      logo: "https://via.placeholder.com/150",
      location: "San Francisco, CA"
    },
    description: `We are looking for a Senior Software Engineer to join our dynamic team. 
    The ideal candidate will have:
    • 5+ years of experience in full-stack development
    • Strong expertise in React, Node.js, and MongoDB
    • Experience with cloud platforms (AWS/Azure/GCP)
    • Excellent problem-solving and communication skills
    
    Responsibilities:
    • Design and implement scalable software solutions
    • Lead technical projects and mentor junior developers
    • Collaborate with cross-functional teams
    • Participate in code reviews and architectural decisions`,
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of professional software development experience",
      "Strong proficiency in JavaScript/TypeScript",
      "Experience with modern frontend frameworks (React, Angular, Vue)",
      "Knowledge of backend technologies and databases"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote options",
      "Professional development budget",
      "401(k) matching"
    ],
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        // For now, we'll use sample data
        setJob(sampleJob);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplicationStatus('submitting');
      await api.applyToJob(id);
      setApplicationStatus('success');
      setTimeout(() => setApplicationStatus(''), 3000);
    } catch (err) {
      console.error('Error applying to job:', err);
      setApplicationStatus('error');
      setTimeout(() => setApplicationStatus(''), 3000);
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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button variant="outline-primary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </Button>

      <Card className="job-details-card shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="h3 mb-2">{job.title}</h1>
              <div className="company-info d-flex align-items-center">
                <FaBuilding className="text-muted me-2" />
                <span className="company-name">{job.company.name}</span>
                <span className="mx-2">•</span>
                <FaMapMarkerAlt className="text-muted me-2" />
                <span className="location">{job.company.location}</span>
              </div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleApply}
                disabled={applicationStatus === 'submitting'}
              >
                {applicationStatus === 'submitting' ? 'Applying...' : 'Apply Now'}
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {applicationStatus === 'success' && (
            <Alert variant="success" className="mb-4">
              Application submitted successfully!
            </Alert>
          )}
          {applicationStatus === 'error' && (
            <Alert variant="danger" className="mb-4">
              Failed to submit application. Please try again.
            </Alert>
          )}

          <Row>
            <Col md={8}>
              <section className="mb-4">
                <h2 className="h5 mb-3">Job Description</h2>
                <p className="text-muted">{job.description}</p>
              </section>

              <section className="mb-4">
                <h2 className="h5 mb-3">Requirements</h2>
                <ul className="requirements-list">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="mb-2">{req}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h5 mb-3">Benefits</h2>
                <ul className="benefits-list">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="mb-2">{benefit}</li>
                  ))}
                </ul>
              </section>
            </Col>

            <Col md={4}>
              <Card className="job-summary shadow-sm">
                <Card.Body>
                  <h3 className="h5 mb-4">Job Summary</h3>
                  
                  <div className="summary-item mb-3">
                    <FaDollarSign className="text-primary me-2" />
                    <strong>Salary Range:</strong>
                    <div className="text-muted">{job.salary}</div>
                  </div>

                  <div className="summary-item mb-3">
                    <FaBriefcase className="text-primary me-2" />
                    <strong>Job Type:</strong>
                    <div className="text-muted">{job.type}</div>
                  </div>

                  <div className="summary-item mb-3">
                    <FaUserGraduate className="text-primary me-2" />
                    <strong>Experience:</strong>
                    <div className="text-muted">{job.experience}</div>
                  </div>

                  <div className="summary-item mb-3">
                    <FaClock className="text-primary me-2" />
                    <strong>Posted:</strong>
                    <div className="text-muted">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="summary-item">
                    <FaClock className="text-primary me-2" />
                    <strong>Apply Before:</strong>
                    <div className="text-muted">
                      {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default withAPI(JobDetails); 