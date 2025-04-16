import React, { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from '../../../../components/Spinner';
import Settings from '../../../../components/Home/Admin/Settings/Lazy';

const SettingsContainer = () => {
  return (
    <Suspense fallback={
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner />
      </Container>
    }>
      <Settings />
    </Suspense>
  );
};

export default SettingsContainer; 