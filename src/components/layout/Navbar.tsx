import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Globe, Moon, Sun, Menu, X, RotateCcw } from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useProgressStore } from '../../stores/useProgressStore';

export default function Navbar() {
  const { t, i18n } = useTranslation(['common', 'soc']);
  const location = useLocation();
  const { darkMode, language, toggleDarkMode, setLanguage } = useSettingsStore();
  const { totalScore, streak, resetProgress } = useProgressStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors">
                <ShieldAlert className="h-6 w-6 text-emerald-400 group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Open-SOC
                </span>
                <span className="text-[10px] text-slate-400 font-mono -mt-1 tracking-wider uppercase">
                  SOC Shift Simulator
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOC Live Shift
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-emerald-400 bg-slate-800 border border-emerald-500/30'
                  : 'text-slate-300 hover:text-emerald-300 hover:bg-slate-800/50'
              }`}
            >
              Scénarios ({7})
            </Link>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-l border-slate-800 pl-4">
              <div>
                <span className="text-slate-500">Score: </span>
                <span className="text-emerald-400 font-bold">{totalScore} pts</span>
              </div>
              <div>
                <span className="text-slate-500">Série: </span>
                <span className="text-cyan-400 font-bold">{streak}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-l border-slate-800 pl-4">
              <button 
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-md text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                title="Changer la langue"
              >
                <Globe className="h-4 w-4 text-slate-400" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-md text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Basculer le thème"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => {
                  if (confirm(t('common:progress.resetConfirm', { defaultValue: 'Réinitialiser votre progression ?' }))) {
                    resetProgress();
                  }
                }}
                className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Réinitialiser la progression"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={toggleLanguage}
              className="px-2 py-1 text-slate-300 text-xs font-mono"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-400"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 bg-slate-800"
          >
            Scénarios Open-SOC
          </Link>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
            <span>Score: {totalScore} pts</span>
            <span>Série: {streak}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
