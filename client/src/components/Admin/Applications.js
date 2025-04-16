import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { 
  FaSearch, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaFileAlt,
  FaDownload
} from 'react-icons/fa';

const Applications = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - In a real app, this would come from an API
  const [applications] = useState([
    {
      id: 1,
      applicant: 'John Doe',
      job: 'Software Engineer',
      company: 'Tech Corp',
      appliedDate: '2024-01-15',
      status: 'pending',
      resume: 'john_doe_resume.pdf',
      coverLetter: 'john_doe_cover.pdf',
      experience: '3 years',
      education: 'Bachelor in Computer Science'
    },
    {
      id: 2,
      applicant: 'Jane Smith',
      job: 'Marketing Manager',
      company: 'Innovate Inc.',
      appliedDate: '2024-01-20',
      status: 'shortlisted',
      resume: 'jane_smith_resume.pdf',
      coverLetter: 'jane_smith_cover.pdf',
      experience: '5 years',
      education: 'Master in Marketing'
    },
    {
      id: 3,
      applicant: 'Bob Wilson',
      job: 'Data Analyst',
      company: 'Global Solutions',
      appliedDate: '2024-01-10',
      status: 'rejected',
      resume: 'bob_wilson_resume.pdf',
      coverLetter: 'bob_wilson_cover.pdf',
      experience: '2 years',
      education: 'Bachelor in Statistics'
    }
  ]);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setShowModal(false);
  };

  const handleUpdateStatus = (applicationId, newStatus) => {
    // Handle status update logic here
    console.log(`Updating application ${applicationId} to ${newStatus}`);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'shortlisted':
        return 'info';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && application.status === filterStatus;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Application Management</h1>
        <div className="d-flex gap-2">
          <Form.Select 
            style={{ width: '150px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Job Position</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(application => (
              <tr key={application.id}>
                <td>{application.applicant}</td>
                <td>{application.job}</td>
                <td>{application.company}</td>
                <td>{application.appliedDate}</td>
                <td>
                  <Badge bg={getStatusBadgeVariant(application.status)}>
                    {application.status}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      title="Download Resume"
                    >
                      <FaFileAlt />
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      title="Download Cover Letter"
                    >
                      <FaDownload />
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleViewApplication(application)}
                    >
                      <FaEye />
                    </Button>
                    {application.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleUpdateStatus(application.id, 'shortlisted')}
                        >
                          <FaCheck />
                        </Button>
                        <Button 
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleUpdateStatus(application.id, 'rejected')}
                        >
                          <FaTimes />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* View Application Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <Row>
              <Col md={6}>
                <h5 className="mb-4">Applicant Information</h5>
                <p><strong>Name:</strong> {selectedApplication.applicant}</p>
                <p><strong>Experience:</strong> {selectedApplication.experience}</p>
                <p><strong>Education:</strong> {selectedApplication.education}</p>
                <p><strong>Applied Date:</strong> {selectedApplication.appliedDate}</p>
              </Col>
              <Col md={6}>
                <h5 className="mb-4">Job Information</h5>
                <p><strong>Position:</strong> {selectedApplication.job}</p>
                <p><strong>Company:</strong> {selectedApplication.company}</p>
                <p><strong>Status:</strong> 
                  <Badge 
                    bg={getStatusBadgeVariant(selectedApplication.status)}
                    className="ms-2"
                  >
                    {selectedApplication.status}
                  </Badge>
                </p>
              </Col>
              <Col xs={12} className="mt-4">
                <h5 className="mb-3">Application Status</h5>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-warning"
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'pending')}
                  >
                    Mark as Pending
                  </Button>
                  <Button 
                    variant="outline-info"
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'shortlisted')}
                  >
                    Shortlist
                  </Button>
                  <Button 
                    variant="outline-success"
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'accepted')}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="outline-danger"
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </Col>
              <Col xs={12} className="mt-4">
                <h5 className="mb-3">Documents</h5>
                <div className="d-flex gap-3">
                  <Button variant="primary">
                    <FaFileAlt className="me-2" />
                    View Resume
                  </Button>
                  <Button variant="primary">
                    <FaFileAlt className="me-2" />
                    View Cover Letter
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Applications; 