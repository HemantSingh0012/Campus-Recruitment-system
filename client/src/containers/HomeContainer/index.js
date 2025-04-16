import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import * as ROLES from '../../constants/roles';
import Spinner from '../../components/Spinner';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const AdminContainer = React.lazy(() => import('./AdminContainer'));
const CompanyContainer = React.lazy(() => import('./CompanyContainer'));
const StudentContainer = React.lazy(() => import('./StudentContainer'));

class HomeContainer extends Component {
  state = {
    hasError: false,
    error: null
  };

  componentDidMount() {
    console.log('HomeContainer mounted', {
      user: this.props.user,
      state: this.state
    });
  }

  componentDidUpdate(prevProps) {
    console.log('HomeContainer updated', {
      prevUser: prevProps.user,
      currentUser: this.props.user,
      state: this.state
    });
  }

  static getDerivedStateFromError(error) {
    console.error('HomeContainer error caught in getDerivedStateFromError:', error);
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('HomeContainer Error in componentDidCatch:', {
      error,
      errorInfo,
      state: this.state,
      user: this.props.user
    });
  }

  render() {
    const { user } = this.props;
    const { hasError, error } = this.state;

    console.log('HomeContainer rendering', {
      user,
      hasError,
      error,
      userRole: user?.role
    });

    if (!user) {
      console.log('HomeContainer: No user found, returning null');
      return null;
    }

    if (hasError) {
      console.error('HomeContainer: Rendering error state', {
        error,
        user
      });
      return (
        <Container className="mt-4">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>We're having trouble loading this page. Please try refreshing or logging in again.</p>
            {error && <pre className="mt-3 p-2 bg-light">{error.message}</pre>}
          </Alert>
        </Container>
      );
    }

    console.log('HomeContainer: Rendering content for role:', user.role);
    return (
      <Suspense fallback={
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Spinner />
        </Container>
      }>
        <div className="home-container">
          {user.role === ROLES.ADMIN && (
            console.log('HomeContainer: Rendering AdminContainer') || 
            <AdminContainer />
          )}
          {user.role === ROLES.COMPANY && (
            console.log('HomeContainer: Rendering CompanyContainer') || 
            <CompanyContainer />
          )}
          {user.role === ROLES.STUDENT && (
            console.log('HomeContainer: Rendering StudentContainer') || 
            <StudentContainer />
          )}
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = state => {
  console.log('HomeContainer mapStateToProps:', {
    user: state.user,
    fullState: state
  });
  return { user: state.user };
};

export default connect(mapStateToProps)(HomeContainer);
