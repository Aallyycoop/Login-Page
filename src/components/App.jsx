import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import NotFoundPage from './NotFoundPage';
import useAuth from '../hooks/index.jsx';
import AuthProvider from '../contexts/AuthProvider';
import routes from '../routes.js';

const LogOutButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const ProfileRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <div className="container">
            <Navbar.Brand>Login Form</Navbar.Brand>
            <LogOutButton />
          </div>
        </Navbar>
        <Routes>
          <Route path={routes.notFoundPagePath()} element={<NotFoundPage />} />
          <Route
            path={routes.profilePagePath()}
            element={(
              <ProfileRoute>
                <ProfilePage />
              </ProfileRoute>
            )}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
