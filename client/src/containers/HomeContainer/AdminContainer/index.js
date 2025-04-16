import React, { Component, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from '../../../components/Spinner';

console.log('AdminContainer module loading');

const Admin = React.lazy(() => {
  console.log('Loading Admin component');
  return import('../../../components/Home/Admin');
});
const CompaniesContainer = React.lazy(() => {
  console.log('Loading CompaniesContainer');
  return import('./CompaniesContainer');
});
const StudentsContainer = React.lazy(() => {
  console.log('Loading StudentsContainer');
  return import('./StudentsContainer');
});
const JobsContainer = React.lazy(() => {
  console.log('Loading JobsContainer');
  return import('./JobsContainer');
});
const InterviewsContainer = React.lazy(() => {
  console.log('Loading InterviewsContainer');
  return import('./InterviewsContainer');
});
const AnalyticsContainer = React.lazy(() => {
  console.log('Loading AnalyticsContainer');
  return import('./AnalyticsContainer');
});
const SettingsContainer = React.lazy(() => {
  console.log('Loading SettingsContainer');
  return import('./SettingsContainer');
});
const NotFound = React.lazy(() => {
  console.log('Loading NotFound component');
  return import('../../../components/NotFound');
});

class AdminContainer extends Component {
  componentDidMount() {
    console.log('AdminContainer mounted', {
      user: this.props.user,
      props: this.props
    });
  }

  componentDidUpdate(prevProps) {
    console.log('AdminContainer updated', {
      prevProps,
      currentProps: this.props
    });
  }

  componentDidCatch(error, errorInfo) {
    console.error('AdminContainer Error:', {
      error,
      errorInfo,
      props: this.props
    });
  }

  render() {
    const { user } = this.props;
    console.log('AdminContainer rendering', {
      user,
      location: window.location.pathname
    });

    if (!user) {
      console.log('AdminContainer: No user found, returning null');
      return null;
    }

    console.log('AdminContainer: Rendering routes');
    return (
      <Suspense fallback={
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Spinner />
        </Container>
      }>
        <Routes>
          <Route index element={
            console.log('AdminContainer: Rendering Admin dashboard') || 
            <Admin />
          } />
          <Route path="students/*" element={
            console.log('AdminContainer: Rendering StudentsContainer') || 
            <StudentsContainer />
          } />
          <Route path="companies/*" element={
            console.log('AdminContainer: Rendering CompaniesContainer') || 
            <CompaniesContainer />
          } />
          <Route path="jobs/*" element={
            console.log('AdminContainer: Rendering JobsContainer') || 
            <JobsContainer />
          } />
          <Route path="interviews/*" element={
            console.log('AdminContainer: Rendering InterviewsContainer') || 
            <InterviewsContainer />
          } />
          <Route path="analytics/*" element={
            console.log('AdminContainer: Rendering AnalyticsContainer') || 
            <AnalyticsContainer />
          } />
          <Route path="settings/*" element={
            console.log('AdminContainer: Rendering SettingsContainer') || 
            <SettingsContainer />
          } />
          <Route path="*" element={
            console.log('AdminContainer: Rendering NotFound') || 
            <NotFound />
          } />
        </Routes>
      </Suspense>
    );
  }
}

const mapStateToProps = state => {
  console.log('AdminContainer mapStateToProps:', {
    user: state.user,
    fullState: state
  });
  return { user: state.user };
};

export default connect(mapStateToProps)(AdminContainer);
