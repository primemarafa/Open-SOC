import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useSettingsStore } from '../../stores/useSettingsStore';

export default function Layout() {
  const { darkMode } = useSettingsStore();

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-[#0a0e17] text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <footer className={`py-6 text-center text-sm ${darkMode ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'} border-t`}>
          <p>© {new Date().getFullYear()} CyberTraining Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
