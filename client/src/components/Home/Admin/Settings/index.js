import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  ListGroup,
  Table
} from 'react-bootstrap';
import { withAPI } from '../../../../services/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FaCog, FaLock, FaBell, FaDatabase, FaUsers } from 'react-icons/fa';

const Settings = ({ api }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Campus Recruitment System',
    adminEmail: 'admin@admin.com',
    allowRegistration: true,
    requireApproval: true,
    maxApplicationsPerStudent: 10
  });

  const [emailSettings, setEmailSettings] = useState({
    emailNotifications: true,
    dailyDigest: true,
    applicationAlerts: true,
    placementAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    minimumPasswordLength: 8
  });

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('General settings updated successfully');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Email notification settings updated successfully');
    } catch (err) {
      setError('Failed to update email settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Security settings updated successfully');
    } catch (err) {
      setError('Failed to update security settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Settings</h2>

      <Row>
        <Col md={3}>
          <Card className="shadow-sm mb-4">
            <ListGroup variant="flush">
              <ListGroup.Item 
                action 
                active={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
                className="d-flex align-items-center"
              >
                <FaCog className="me-2" /> General
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
                className="d-flex align-items-center"
              >
                <FaLock className="me-2" /> Security
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
                className="d-flex align-items-center"
              >
                <FaBell className="me-2" /> Notifications
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'data'}
                onClick={() => setActiveTab('data')}
                className="d-flex align-items-center"
              >
                <FaDatabase className="me-2" /> Data Management
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'roles'}
                onClick={() => setActiveTab('roles')}
                className="d-flex align-items-center"
              >
                <FaUsers className="me-2" /> User Roles
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={9}>
          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Card className="shadow-sm">
            <Card.Body>
              {activeTab === 'general' && (
                <Form onSubmit={handleGeneralSubmit}>
                  <h5 className="mb-4">General Settings</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        siteName: e.target.value
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Admin Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={generalSettings.adminEmail}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        adminEmail: e.target.value
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Allow Student Registration"
                      checked={generalSettings.allowRegistration}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        allowRegistration: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Require Admin Approval for New Accounts"
                      checked={generalSettings.requireApproval}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        requireApproval: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Maximum Applications per Student</Form.Label>
                    <Form.Control
                      type="number"
                      value={generalSettings.maxApplicationsPerStudent}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        maxApplicationsPerStudent: parseInt(e.target.value)
                      })}
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Form>
              )}

              {activeTab === 'security' && (
                <Form onSubmit={handleSecuritySubmit}>
                  <h5 className="mb-4">Security Settings</h5>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Enable Two-Factor Authentication"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Session Timeout (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value)
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password Expiry (days)</Form.Label>
                    <Form.Control
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordExpiry: parseInt(e.target.value)
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Minimum Password Length</Form.Label>
                    <Form.Control
                      type="number"
                      value={securitySettings.minimumPasswordLength}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        minimumPasswordLength: parseInt(e.target.value)
                      })}
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Form>
              )}

              {activeTab === 'notifications' && (
                <Form onSubmit={handleEmailSubmit}>
                  <h5 className="mb-4">Email Notification Settings</h5>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Enable Email Notifications"
                      checked={emailSettings.emailNotifications}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        emailNotifications: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Send Daily Digest"
                      checked={emailSettings.dailyDigest}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        dailyDigest: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Application Status Alerts"
                      checked={emailSettings.applicationAlerts}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        applicationAlerts: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Placement Alerts"
                      checked={emailSettings.placementAlerts}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        placementAlerts: e.target.checked
                      })}
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Form>
              )}

              {activeTab === 'data' && (
                <div>
                  <h5 className="mb-4">Data Management</h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Body>
                          <h6>Database Backup</h6>
                          <p className="text-muted small">Last backup: Never</p>
                          <Button variant="outline-primary" size="sm">
                            Create Backup
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Body>
                          <h6>Clear Cache</h6>
                          <p className="text-muted small">Cache size: 0 MB</p>
                          <Button variant="outline-danger" size="sm">
                            Clear Cache
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={12}>
                      <Card>
                        <Card.Body>
                          <h6>Export Data</h6>
                          <p className="text-muted small">Download system data in CSV format</p>
                          <div className="d-flex gap-2">
                            <Button variant="outline-secondary" size="sm">
                              Export Students
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              Export Companies
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              Export Placements
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}

              {activeTab === 'roles' && (
                <div>
                  <h5 className="mb-4">User Roles & Permissions</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Administrator</td>
                        <td>Full access to all features</td>
                        <td>
                          <Button variant="link" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Company</td>
                        <td>Post jobs, view applications</td>
                        <td>
                          <Button variant="link" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Student</td>
                        <td>View and apply to jobs</td>
                        <td>
                          <Button variant="link" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button variant="outline-primary" size="sm">
                    Add New Role
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default compose(
  withAPI,
  connect(null)
)(Settings); 