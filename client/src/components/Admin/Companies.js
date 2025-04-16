import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { FaSearch, FaEdit, FaBan, FaCheck, FaBuilding } from 'react-icons/fa';

const Companies = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - In a real app, this would come from an API
  const [companies] = useState([
    {
      id: 1,
      name: 'Tech Corp',
      industry: 'Technology',
      location: 'New York, USA',
      size: '1000+',
      status: 'active',
      joinDate: '2024-01-15',
      openPositions: 5
    },
    {
      id: 2,
      name: 'Innovate Inc.',
      industry: 'Software',
      location: 'San Francisco, USA',
      size: '500-1000',
      status: 'active',
      joinDate: '2024-01-20',
      openPositions: 3
    },
    {
      id: 3,
      name: 'Global Solutions',
      industry: 'Consulting',
      location: 'London, UK',
      size: '100-500',
      status: 'inactive',
      joinDate: '2024-02-01',
      openPositions: 0
    }
  ]);

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
    setShowModal(false);
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    // Handle company update logic here
    handleCloseModal();
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Company Management</h1>
        <div className="d-flex gap-2">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary">
            <FaBuilding className="me-2" />
            Add Company
          </Button>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Size</th>
              <th>Open Positions</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map(company => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.industry}</td>
                <td>{company.location}</td>
                <td>{company.size}</td>
                <td>
                  <Badge bg={company.openPositions > 0 ? 'info' : 'secondary'}>
                    {company.openPositions}
                  </Badge>
                </td>
                <td>
                  <Badge bg={company.status === 'active' ? 'success' : 'danger'}>
                    {company.status}
                  </Badge>
                </td>
                <td>{company.joinDate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleEditCompany(company)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant={company.status === 'active' ? 'outline-danger' : 'outline-success'}
                      size="sm"
                    >
                      {company.status === 'active' ? <FaBan /> : <FaCheck />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Company Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateCompany}>
          <Modal.Body>
            {selectedCompany && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedCompany.name}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedCompany.industry}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedCompany.location}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Size</Form.Label>
                    <Form.Select defaultValue={selectedCompany.size}>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-100">51-100 employees</option>
                      <option value="100-500">100-500 employees</option>
                      <option value="500-1000">500-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select defaultValue={selectedCompany.status}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      defaultValue={selectedCompany.description}
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

export default Companies; 