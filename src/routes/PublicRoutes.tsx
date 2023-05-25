import {Route, Routes} from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import LoginEmailView from '../pages/LoginEmailView';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginEmailView />} />
      <Route path="/auth" element={<LoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;
