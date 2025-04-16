import React, { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from '../../../../components/Spinner';
import Analytics from '../../../../components/Home/Admin/Analytics/Lazy';

const AnalyticsContainer = () => {
  return (
    <Suspense fallback={
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner />
      </Container>
    }>
      <Analytics />
    </Suspense>
  );
};

export default AnalyticsContainer; 