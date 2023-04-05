import {Route, Routes} from 'react-router-dom';
import React from 'react';
import {MainPage} from '../pages/MainPage';
import {LearningPage} from '../pages/LearningPage';
import {AboutPage} from '../pages/AboutPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* <Route path="*" element={<NotFound />} />*/}
    </Routes>
  );
};

export default AppRoutes;
