import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { 
  FaDownload, 
  FaChartBar, 
  FaChartLine, 
  FaChartPie,
  FaFileExport
} from 'react-icons/fa';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30');

  // Sample data - In a real app, this would come from an API
  const statistics = {
    totalApplications: 432,
    acceptedApplications: 89,
    rejectedApplications: 156,
    pendingApplications: 187,
    totalJobs: 45,
    activeJobs: 32,
    totalCompanies: 28,
    totalStudents: 350,
    placementRate: 78
  };

  const topCompanies = [
    { name: 'Tech Corp', hires: 15, openPositions: 5 },
    { name: 'Innovate Inc.', hires: 12, openPositions: 3 },
    { name: 'Global Solutions', hires: 8, openPositions: 2 },
  ];

  const popularPositions = [
    { title: 'Software Engineer', applications: 85, openings: 10 },
    { title: 'Data Analyst', applications: 62, openings: 5 },
    { title: 'Marketing Manager', applications: 45, openings: 3 },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Reports & Analytics</h1>
        <div className="d-flex gap-2">
          <Form.Select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
            <option value="all">All Time</option>
          </Form.Select>
          <Button variant="primary">
            <FaFileExport className="me-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Total Applications</div>
                <FaChartBar className="text-primary" size={24} />
              </div>
              <h3 className="mb-0">{statistics.totalApplications}</h3>
              <div className="small text-success mt-2">
                +12% from last month
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Placement Rate</div>
                <FaChartLine className="text-success" size={24} />
              </div>
              <h3 className="mb-0">{statistics.placementRate}%</h3>
              <div className="small text-success mt-2">
                +5% from last month
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Active Jobs</div>
                <FaChartPie className="text-info" size={24} />
              </div>
              <h3 className="mb-0">{statistics.activeJobs}</h3>
              <div className="small text-info mt-2">
                {statistics.totalJobs} total jobs
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Total Companies</div>
                <FaChartBar className="text-warning" size={24} />
              </div>
              <h3 className="mb-0">{statistics.totalCompanies}</h3>
              <div className="small text-warning mt-2">
                +3 new this month
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Application Status */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-white">
              <h5 className="mb-0">Application Status Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <div className="text-center">
                  <div className="h5 mb-0">{statistics.acceptedApplications}</div>
                  <div className="text-success">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="h5 mb-0">{statistics.rejectedApplications}</div>
                  <div className="text-danger">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="h5 mb-0">{statistics.pendingApplications}</div>
                  <div className="text-warning">Pending</div>
                </div>
              </div>
              <div className="progress" style={{ height: '25px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${(statistics.acceptedApplications / statistics.totalApplications) * 100}%` }}
                >
                  {Math.round((statistics.acceptedApplications / statistics.totalApplications) * 100)}%
                </div>
                <div 
                  className="progress-bar bg-danger" 
                  style={{ width: `${(statistics.rejectedApplications / statistics.totalApplications) * 100}%` }}
                >
                  {Math.round((statistics.rejectedApplications / statistics.totalApplications) * 100)}%
                </div>
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: `${(statistics.pendingApplications / statistics.totalApplications) * 100}%` }}
                >
                  {Math.round((statistics.pendingApplications / statistics.totalApplications) * 100)}%
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Companies and Popular Positions */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Top Hiring Companies</h5>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Total Hires</th>
                    <th>Open Positions</th>
                  </tr>
                </thead>
                <tbody>
                  {topCompanies.map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.hires}</td>
                      <td>{company.openPositions}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Most Popular Positions</h5>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Applications</th>
                    <th>Open Positions</th>
                  </tr>
                </thead>
                <tbody>
                  {popularPositions.map((position, index) => (
                    <tr key={index}>
                      <td>{position.title}</td>
                      <td>{position.applications}</td>
                      <td>{position.openings}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Reports; 