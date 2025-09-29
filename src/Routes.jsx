import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GamifiedPredictionArena from './pages/gamified-prediction-arena';
import ImmersiveExplorer from './pages/3d-immersive-explorer';
import ApiDocumentation from './pages/api-documentation';
import InteractiveGlobeDashboard from './pages/interactive-globe-dashboard';
import ScientificMethodologyHub from './pages/scientific-methodology-hub';
import BangladeshAgriculturalFocus from './pages/bangladesh-agricultural-focus';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ImmersiveExplorer />} />
        <Route path="/gamified-prediction-arena" element={<GamifiedPredictionArena />} />
        <Route path="/3d-immersive-explorer" element={<ImmersiveExplorer />} />
        <Route path="/api-documentation" element={<ApiDocumentation />} />
        <Route path="/interactive-globe-dashboard" element={<InteractiveGlobeDashboard />} />
        <Route path="/scientific-methodology-hub" element={<ScientificMethodologyHub />} />
        <Route path="/bangladesh-agricultural-focus" element={<BangladeshAgriculturalFocus />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
