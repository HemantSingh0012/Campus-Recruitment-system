import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { 
  FaUsers, 
  FaBuilding, 
  FaBriefcase, 
  FaFileAlt,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => (
  <Card className="h-100 shadow-sm">
    <Card.Body>
      <Row className="align-items-center">
        <Col>
          <h6 className="text-muted mb-1">{title}</h6>
          <h3 className="mb-0">{value}</h3>
        </Col>
        <Col xs="auto">
          <div className={`icon-circle bg-${color} text-white`}>
            {icon}
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const Dashboard = () => {
  // Sample data - In a real app, this would come from an API
  const stats = [
    { 
      title: 'Total Users',
      value: '1,234',
      icon: <FaUsers size={24} />,
      color: 'primary'
    },
    {
      title: 'Companies',
      value: '56',
      icon: <FaBuilding size={24} />,
      color: 'success'
    },
    {
      title: 'Active Jobs',
      value: '89',
      icon: <FaBriefcase size={24} />,
      color: 'info'
    },
    {
      title: 'Applications',
      value: '432',
      icon: <FaFileAlt size={24} />,
      color: 'warning'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'New Application',
      description: 'John Doe applied for Software Engineer position at Tech Corp',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Job Posted',
      description: 'Innovate Inc. posted a new position for Marketing Manager',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'Application Status',
      description: 'Sarah Smith was selected for the interview at Global Solutions',
      time: '1 day ago'
    }
  ];

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0">Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xl={3} md={6}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      {/* Recent Activity */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="timeline-item">
                    <div className="timeline-icon">
                      {activity.type.includes('Application') ? (
                        <FaFileAlt />
                      ) : activity.type.includes('Job') ? (
                        <FaBriefcase />
                      ) : (
                        <FaCheckCircle />
                      )}
                    </div>
                    <div className="timeline-content">
                      <h6 className="mb-1">{activity.type}</h6>
                      <p className="mb-0">{activity.description}</p>
                      <small className="text-muted">
                        <FaClock className="me-1" />
                        {activity.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style>
        {`
          .icon-circle {
            height: 48px;
            width: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .timeline {
            position: relative;
            padding: 0;
            list-style: none;
          }

          .timeline-item {
            position: relative;
            padding-left: 3rem;
            padding-bottom: 1.5rem;
          }

          .timeline-item:not(:last-child):before {
            content: '';
            position: absolute;
            left: 1rem;
            top: 2rem;
            bottom: 0;
            width: 2px;
            background: #e9ecef;
          }

          .timeline-icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
          }

          .timeline-content {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 0.25rem;
          }
        `}
      </style>
    </>
  );
};

export default Dashboard; 