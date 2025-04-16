import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { FaSearch, FaEdit, FaBan, FaCheck } from 'react-icons/fa';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - In a real app, this would come from an API
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'company',
      status: 'active',
      joinDate: '2024-01-20'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@student.edu',
      role: 'student',
      status: 'inactive',
      joinDate: '2024-02-01'
    }
  ]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    // Handle user update logic here
    handleCloseModal();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'student':
        return 'primary';
      case 'company':
        return 'success';
      case 'admin':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">User Management</h1>
        <div className="d-flex gap-2">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search users..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                    {user.status}
                  </Badge>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant={user.status === 'active' ? 'outline-danger' : 'outline-success'}
                      size="sm"
                    >
                      {user.status === 'active' ? <FaBan /> : <FaCheck />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateUser}>
          <Modal.Body>
            {selectedUser && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedUser.name}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={selectedUser.email}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select defaultValue={selectedUser.role}>
                    <option value="student">Student</option>
                    <option value="company">Company</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select defaultValue={selectedUser.status}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </>
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

export default Users; 