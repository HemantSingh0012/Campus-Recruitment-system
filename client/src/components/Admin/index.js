import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaBriefcase, 
  FaFileAlt,
  FaChartBar,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import * as ROUTES from '../../constants/routes';

// Admin Dashboard Components
import Dashboard from './Dashboard';
import Users from './Users';
import Companies from './Companies';
import Jobs from './Jobs';
import Applications from './Applications';
import Reports from './Reports';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: ROUTES.ADMIN_DASHBOARD, icon: <FaTachometerAlt />, text: 'Dashboard' },
    { path: ROUTES.ADMIN_USERS, icon: <FaUsers />, text: 'Users' },
    { path: ROUTES.ADMIN_COMPANIES, icon: <FaBuilding />, text: 'Companies' },
    { path: ROUTES.ADMIN_JOBS, icon: <FaBriefcase />, text: 'Jobs' },
    { path: ROUTES.ADMIN_APPLICATIONS, icon: <FaFileAlt />, text: 'Applications' },
    { path: ROUTES.ADMIN_REPORTS, icon: <FaChartBar />, text: 'Reports' },
  ];

  return (
    <div className="admin-wrapper">
      {/* Sidebar Toggle Button (Mobile) */}
      <button 
        className="sidebar-toggle d-lg-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="mb-0">Admin Panel</h3>
        </div>
        <Nav className="flex-column">
          {navItems.map((item, index) => (
            <Nav.Item key={index}>
              <Link 
                to={item.path} 
                className="nav-link d-flex align-items-center"
                onClick={() => window.innerWidth < 992 && setSidebarOpen(false)}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.text}</span>
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <Container fluid className="py-4">
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Container>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .admin-wrapper {
            display: flex;
            min-height: 100vh;
            padding-top: 56px;
          }

          .admin-sidebar {
            width: 250px;
            background: #2c3e50;
            color: white;
            position: fixed;
            left: 0;
            top: 56px;
            bottom: 0;
            z-index: 1000;
            transition: all 0.3s ease;
          }

          .sidebar-header {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .admin-sidebar .nav-link {
            color: rgba(255,255,255,0.8);
            padding: 0.8rem 1rem;
            transition: all 0.3s ease;
          }

          .admin-sidebar .nav-link:hover {
            color: white;
            background: rgba(255,255,255,0.1);
          }

          .admin-sidebar .nav-link .icon {
            margin-right: 0.75rem;
            width: 20px;
            text-align: center;
          }

          .admin-content {
            flex: 1;
            margin-left: 250px;
            transition: all 0.3s ease;
          }

          .sidebar-toggle {
            position: fixed;
            top: 70px;
            left: 10px;
            z-index: 1001;
            background: #2c3e50;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 4px;
            display: none;
          }

          @media (max-width: 991.98px) {
            .admin-sidebar {
              transform: translateX(-100%);
            }

            .admin-sidebar.open {
              transform: translateX(0);
            }

            .admin-content {
              margin-left: 0;
            }

            .sidebar-toggle {
              display: block;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Admin; 