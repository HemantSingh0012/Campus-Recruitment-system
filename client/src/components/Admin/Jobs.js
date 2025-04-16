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
  FaEdit, 
  FaBan, 
  FaCheck, 
  FaBriefcase,
  FaEye
} from 'react-icons/fa';

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - In a real app, this would come from an API
  const [jobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'New York, USA',
      type: 'Full-time',
      experience: '2-4 years',
      status: 'active',
      applications: 12,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      salary: '$80,000 - $120,000'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Innovate Inc.',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: '5+ years',
      status: 'active',
      applications: 8,
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      salary: '$90,000 - $130,000'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Global Solutions',
      location: 'Remote',
      type: 'Contract',
      experience: '1-3 years',
      status: 'closed',
      applications: 15,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      salary: '$60,000 - $80,000'
    }
  ]);

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    // Handle job update logic here
    handleCloseModal();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && job.status === filterStatus;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Job Management</h1>
        <div className="d-flex gap-2">
          <Form.Select 
            style={{ width: '150px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </Form.Select>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary">
            <FaBriefcase className="me-2" />
            Add Job
          </Button>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Applications</th>
              <th>Posted Date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  <Badge bg="info">{job.type}</Badge>
                </td>
                <td>
                  <Badge bg="secondary">{job.applications}</Badge>
                </td>
                <td>{job.postedDate}</td>
                <td>{job.deadline}</td>
                <td>
                  <Badge bg={job.status === 'active' ? 'success' : 'danger'}>
                    {job.status}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleEditJob(job)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="outline-info"
                      size="sm"
                    >
                      <FaEye />
                    </Button>
                    <Button 
                      variant={job.status === 'active' ? 'outline-danger' : 'outline-success'}
                      size="sm"
                    >
                      {job.status === 'active' ? <FaBan /> : <FaCheck />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Job Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateJob}>
          <Modal.Body>
            {selectedJob && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedJob.title}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedJob.company}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedJob.location}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Salary Range</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedJob.salary}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Select defaultValue={selectedJob.type}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience Required</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedJob.experience}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Application Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={selectedJob.deadline}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select defaultValue={selectedJob.status}>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      defaultValue={selectedJob.description}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      defaultValue={selectedJob.requirements}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Jobs; 