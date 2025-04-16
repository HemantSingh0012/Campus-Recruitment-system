import React, { useState, useEffect } from 'react';
import Analytics from './index';

const AnalyticsContainer = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalApplications: 0,
    activeJobs: 0,
    hiredCandidates: 0,
    conversionRate: 0,
    monthlyApplications: [],
    jobCategories: [],
    applicantSkills: [],
    applicationStatus: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // TODO: Replace with actual API call
        // For now, using mock data
        const mockData = {
          totalApplications: 150,
          activeJobs: 12,
          hiredCandidates: 25,
          conversionRate: 16.7,
          monthlyApplications: [
            { month: 'Jan', applications: 30 },
            { month: 'Feb', applications: 45 },
            { month: 'Mar', applications: 35 },
            { month: 'Apr', applications: 40 }
          ],
          jobCategories: [
            { category: 'Software Development', jobs: 8 },
            { category: 'Design', jobs: 4 },
            { category: 'Marketing', jobs: 3 },
            { category: 'Sales', jobs: 5 }
          ],
          applicantSkills: [
            { skill: 'JavaScript', count: 45 },
            { skill: 'React', count: 38 },
            { skill: 'Node.js', count: 30 },
            { skill: 'Python', count: 25 }
          ],
          applicationStatus: [
            { status: 'Pending', value: 30 },
            { status: 'Interviewed', value: 15 },
            { status: 'Hired', value: 25 },
            { status: 'Rejected', value: 10 }
          ]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnalyticsData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load analytics data');
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return <Analytics analyticsData={analyticsData} />;
};

export default AnalyticsContainer; 