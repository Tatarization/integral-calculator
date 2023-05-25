import {Route, Routes} from 'react-router-dom';
import React from 'react';
import {MainPage} from '../pages/MainPage';
import {LearningPage} from '../pages/LearningPage';
import {LearningCard} from '../pages/LearningCard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/learning/card/:id" element={<LearningCard />} />
    </Routes>
  );
};

export default AppRoutes;
