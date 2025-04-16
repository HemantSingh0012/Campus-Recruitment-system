import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAPI } from '../../../services/api';

import Company from '../../../components/Home/Company';
import StudentsContainer from './StudentsContainer/Lazy';
import JobsContainer from './JobsContainer/Lazy';
import NewContainer from './JobsContainer/NewContainer/Lazy';
import ProfileContainer from './ProfileContainer/Lazy';
import EditContainer from './ProfileContainer/EditContainer/Lazy';
import AnalyticsContainer from '../../../components/Home/Company/Analytics/Lazy';
import NotFound from '../../../components/NotFound/Lazy';
import * as ROUTES from '../../../constants/routes';

class CompanyContainer extends Component {
  state = {
    stats: {
      totalJobs: 0,
      activeJobs: 0,
      totalApplications: 0,
      recentApplications: 0
    },
    isLoading: true
  };

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats = () => {
    const { api } = this.props;

    if (!api) {
      console.error('API service not available');
      this.setState({ isLoading: false });
      return;
    }

    // Fetch jobs statistics
    api.getJobs()
      .then(response => {
        const jobs = response.data || [];
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter(job => !job.isClosed).length;
        const totalApplications = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);
        const recentApplications = jobs.reduce((sum, job) => {
          const recentApplicants = (job.applicants || []).filter(applicant => {
            const applicationDate = new Date(applicant.appliedAt);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return applicationDate >= oneWeekAgo;
          });
          return sum + recentApplicants.length;
        }, 0);

        this.setState({
          stats: {
            totalJobs,
            activeJobs,
            totalApplications,
            recentApplications
          },
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { user } = this.props;
    const { stats, isLoading } = this.state;

    if (!user) {
      return null;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Routes>
        <Route index element={<Company user={user} stats={stats} />} />
        <Route path={ROUTES.STUDENTS.replace(`${ROUTES.HOME}/`, '')} element={<StudentsContainer />} />
        <Route path={ROUTES.JOBS.replace(`${ROUTES.HOME}/`, '')} element={<JobsContainer />} />
        <Route path={ROUTES.JOBS_NEW.replace(`${ROUTES.HOME}/`, '')} element={<NewContainer />} />
        <Route path={ROUTES.PROFILE.replace(`${ROUTES.HOME}/`, '')} element={<ProfileContainer />} />
        <Route path={ROUTES.PROFILE_EDIT.replace(`${ROUTES.HOME}/`, '')} element={<EditContainer />} />
        <Route path={ROUTES.ANALYTICS.replace(`${ROUTES.HOME}/`, '')} element={<AnalyticsContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  connect(mapStateToProps),
  withAPI
)(CompanyContainer);
