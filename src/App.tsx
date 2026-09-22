import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './utils/i18n';
import Layout from './components/layout/Layout';

const SOCDashboard = lazy(() => import('./pages/soc/SOCDashboard'));
const SOCScenario = lazy(() => import('./pages/soc/SOCScenario'));
const SOCResults = lazy(() => import('./pages/soc/SOCResults'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-mono text-sm tracking-wider">CHARGEMENT DU POSTE SOC...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SOCDashboard />} />
            <Route path="/scenario/:id" element={<SOCScenario />} />
            <Route path="/results/:id" element={<SOCResults />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
