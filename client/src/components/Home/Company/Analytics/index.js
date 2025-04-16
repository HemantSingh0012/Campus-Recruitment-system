import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  FaUsers, 
  FaBriefcase, 
  FaUserGraduate, 
  FaChartLine 
} from 'react-icons/fa';

const Analytics = ({ analyticsData }) => {
  const { 
    monthlyApplications, 
    jobCategories, 
    applicantSkills, 
    applicationStatus 
  } = analyticsData;

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <h2 className="mb-4">Analytics Dashboard</h2>

      {/* Summary Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="shadow-sm border-primary border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Applications</h6>
                  <h3>{analyticsData.totalApplications}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FaUsers className="text-primary" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-success border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Active Jobs</h6>
                  <h3>{analyticsData.activeJobs}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FaBriefcase className="text-success" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-info border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Hired Candidates</h6>
                  <h3>{analyticsData.hiredCandidates}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FaUserGraduate className="text-info" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-warning border-top border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Conversion Rate</h6>
                  <h3>{analyticsData.conversionRate}%</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FaChartLine className="text-warning" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-3">
        {/* Monthly Applications Trend */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Monthly Applications Trend</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyApplications}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#0d6efd" 
                    name="Applications"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Application Status Distribution */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Application Status</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatus}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#0d6efd"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Job Categories Distribution */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Job Categories</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jobs" fill="#198754" name="Number of Jobs" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Applicant Skills */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Top Applicant Skills</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicantSkills}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0dcaf0" name="Number of Applicants" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Analytics.propTypes = {
  analyticsData: PropTypes.shape({
    totalApplications: PropTypes.number.isRequired,
    activeJobs: PropTypes.number.isRequired,
    hiredCandidates: PropTypes.number.isRequired,
    conversionRate: PropTypes.number.isRequired,
    monthlyApplications: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        applications: PropTypes.number.isRequired,
      })
    ).isRequired,
    jobCategories: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        jobs: PropTypes.number.isRequired,
      })
    ).isRequired,
    applicantSkills: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
    applicationStatus: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Analytics; 