import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Search, 
  Bookmark, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown
} from 'lucide-react';
import { MovieLanguage } from '../types/movie';

interface NavbarProps {
  selectedLanguage: MovieLanguage;
  onSelectLanguage: (lang: MovieLanguage) => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  activeNav,
  setActiveNav
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'home' },
    { label: 'Trending', href: '#trending-section', id: 'trending' },
    { label: 'Languages', href: '#languages-section', id: 'languages' },
    { label: 'Upcoming', href: '#upcoming-section', id: 'upcoming' },
    { label: 'Top Rated', href: '#toprated-section', id: 'toprated' },
    { label: 'Collections', href: '#universes-section', id: 'universes' },
  ];

  const languageOptions: { label: string; sub: string; value: MovieLanguage }[] = [
    { label: 'All Indian (PAN)', sub: 'Pan-India Cinema', value: 'All' },
    { label: 'Malayalam', sub: 'മലയാളം', value: 'Malayalam' },
    { label: 'Hindi', sub: 'हिंदी', value: 'Hindi' },
    { label: 'Tamil', sub: 'தமிழ்', value: 'Tamil' },
    { label: 'Telugu', sub: 'తెలుగు', value: 'Telugu' },
    { label: 'Kannada', sub: 'ಕನ್ನಡ', value: 'Kannada' }
  ];

  const scrollToSection = (href: string, id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangObj = languageOptions.find(l => l.value === selectedLanguage) || languageOptions[0];

  return (
    <header
      id="mainNav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/95 via-black/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => scrollToSection('#hero', 'home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E50914] via-[#F59E0B] to-[#F97316] p-0.5 shadow-lg shadow-red-950/50 group-hover:shadow-amber-500/30 transition-all">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                <span>CINE</span>
                <span className="text-[#F59E0B]">VERSE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block ml-0.5" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#F59E0B] font-semibold -mt-1">
                Indian Cinema Elite
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all ${
                  activeNav === item.id
                    ? 'text-[#F59E0B] bg-white/5 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {activeNav === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#F59E0B] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Search Bar (Pill with '/' shortcut) */}
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-[#16161a]/90 hover:bg-[#1f1f24] border border-white/10 text-gray-400 hover:text-white transition-all text-xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="truncate">Search titles, actors, directors...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 text-gray-400 rounded font-mono">
                /
              </kbd>
            </button>
          </div>

          {/* Right Actions: Language Switcher, Watchlist, Avatar Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Icon button for mobile */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 md:hidden"
            >
              <Search className="w-4 h-4 text-amber-400" />
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16161a] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-gray-200 hover:text-amber-300 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[85px] sm:max-w-none truncate">{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {languageDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLanguageDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#141418] border border-white/10 shadow-2xl py-2 z-50">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b border-white/5">
                      Select Regional Industry
                    </div>
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          onSelectLanguage(opt.value);
                          setLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                          selectedLanguage === opt.value
                            ? 'text-amber-400 bg-amber-500/10 font-bold'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <p className="font-medium">{opt.label}</p>
                          <p className="text-[10px] text-gray-500">{opt.sub}</p>
                        </div>
                        {selectedLanguage === opt.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Watchlist Drawer Trigger */}
            <button
              onClick={onOpenWatchlist}
              aria-label="View Watchlist"
              className="relative p-2 rounded-xl bg-[#16161a] hover:bg-[#202026] border border-white/10 text-gray-200 hover:text-amber-400 transition-all"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-[#E50914] text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-md shadow-red-900/60">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-red-600 hidden sm:block shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 lg:hidden text-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111114]/95 border-b border-white/10 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activeNav === item.id
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {languageOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onSelectLanguage(opt.value);
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-full text-xs border ${
                  selectedLanguage === opt.value
                    ? 'bg-amber-500 text-black border-amber-500 font-bold'
                    : 'bg-white/5 text-gray-300 border-white/10'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
