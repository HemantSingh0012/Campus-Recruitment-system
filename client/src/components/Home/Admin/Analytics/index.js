import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { withAPI } from '../../../../services/api';
import LogOutContainer from '../../../../containers/LogOutContainer';
import { FaSignOutAlt } from 'react-icons/fa';
import './styles.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ api }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    placements: [],
    applications: [],
    companies: [],
    students: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from existing endpoints using specific API methods
        const [studentsRes, companiesRes, jobsRes] = await Promise.all([
          api.getStudents(),
          api.getCompanies(),
          api.getJobs()
        ]);

        // Process data for charts
        const students = studentsRes.data || [];
        const companies = companiesRes.data || [];
        const jobs = jobsRes.data || [];

        // Create safe data for charts
        const safeAnalyticsData = {
          placements: processPlacementsData(jobs),
          applications: processApplicationsData(jobs),
          companies: processCompaniesData(companies),
          students: processStudentsData(students)
        };

        setAnalyticsData(safeAnalyticsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [api]);

  // Helper functions to safely process data for charts
  const processPlacementsData = (jobs) => {
    if (!Array.isArray(jobs)) return [];
    // Since the Job model doesn't have a status field, we'll consider all jobs as placements
    return jobs.map(job => ({
      id: job._id,
      title: job.title || 'Unknown Job',
      company: job._companyId || 'Unknown Company',
      date: job.createdAt || new Date().toISOString()
    }));
  };

  const processApplicationsData = (jobs) => {
    if (!Array.isArray(jobs)) return [];
    return jobs.map(job => ({
      id: job._id,
      title: job.title || 'Unknown Job',
      applications: job.applicants?.length || 0,
      // Since the Job model doesn't have interviews or offers fields, we'll use 0
      interviews: 0,
      offers: 0
    }));
  };

  const processCompaniesData = (companies) => {
    if (!Array.isArray(companies)) return [];
    return companies.map(company => ({
      id: company._id,
      name: company.companyName || `${company.firstName} ${company.lastName}`,
      // Since the Company model doesn't have a jobs field, we'll use 0
      jobsPosted: 0,
      activeJobs: 0
    }));
  };

  const processStudentsData = (students) => {
    if (!Array.isArray(students)) return [];
    return students.map(student => ({
      id: student._id,
      name: `${student.firstName} ${student.lastName}`,
      // Since the Student model doesn't have applications, interviews, or offers fields, we'll use 0
      applications: 0,
      interviews: 0,
      offers: 0
    }));
  };

  // Chart data preparation with safety checks
  const getChartData = (data, type) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'No Data Available',
          data: [0],
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }]
      };
    }

    // Return appropriate chart data based on type
    switch (type) {
      case 'placements':
        return {
          labels: data.map(item => item.company),
          datasets: [{
            label: 'Placements by Company',
            data: data.map(item => 1),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        };
      case 'applications':
        return {
          labels: data.map(item => item.title),
          datasets: [{
            label: 'Applications per Job',
            data: data.map(item => item.applications),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        };
      case 'companies':
        return {
          labels: data.map(item => item.name),
          datasets: [{
            label: 'Jobs Posted per Company',
            data: data.map(item => item.jobsPosted),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        };
      case 'students':
        return {
          labels: data.map(item => item.name),
          datasets: [{
            label: 'Applications per Student',
            data: data.map(item => item.applications),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        };
      default:
        return {
          labels: ['No Data'],
          datasets: [{
            label: 'No Data Available',
            data: [0],
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }]
        };
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Data'
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading analytics data...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Analytics Dashboard</h2>
        <div className="analytics-logout">
          <Button
            variant="outline-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/';
              }
            }}
            className="d-flex align-items-center gap-2"
          >
            <FaSignOutAlt /> Sign Out
          </Button>
        </div>
      </div>
      
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>Placements</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              {analyticsData.placements.length > 0 ? (
                <Bar 
                  data={getChartData(analyticsData.placements, 'placements')} 
                  options={chartOptions} 
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted">No placement data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>Applications</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              {analyticsData.applications.length > 0 ? (
                <Line 
                  data={getChartData(analyticsData.applications, 'applications')} 
                  options={chartOptions} 
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted">No application data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>Companies</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              {analyticsData.companies.length > 0 ? (
                <Pie 
                  data={getChartData(analyticsData.companies, 'companies')} 
                  options={chartOptions} 
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted">No company data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>Students</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              {analyticsData.students.length > 0 ? (
                <Bar 
                  data={getChartData(analyticsData.students, 'students')} 
                  options={chartOptions} 
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted">No student data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withAPI(Analytics); 