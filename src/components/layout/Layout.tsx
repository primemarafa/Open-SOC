import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useSettingsStore } from '../../stores/useSettingsStore';

export default function Layout() {
  const { darkMode } = useSettingsStore();
  const location = useLocation();
  const isScenarioPage = location.pathname.startsWith('/scenario/');

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-[#070a11] text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {isScenarioPage ? (
          <main className="flex-1 w-full overflow-hidden">
            <Outlet />
          </main>
        ) : (
          <>
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </main>
            <footer className={`py-6 text-center text-xs font-mono ${darkMode ? 'text-slate-500 border-slate-800/80 bg-slate-950/40' : 'text-slate-400 border-slate-200'} border-t`}>
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} Open-SOC Shift Simulator • SOC Operations Training</span>
                <span className="text-slate-600">Conçu pour l'excellence opérationnelle en Cyberdéfense</span>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
