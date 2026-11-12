import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Sparkles, 
  Star, 
  Clock, 
  Globe, 
  Film, 
  Trophy, 
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Movie, MovieLanguage } from './types/movie';
import { INDIAN_MOVIES_DATA } from './data/indianMoviesData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsGenreBar } from './components/StatsGenreBar';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { TrailerModal } from './components/TrailerModal';
import { SearchFilterModal } from './components/SearchFilterModal';
import { CinematicUniverses } from './components/CinematicUniverses';
import { WatchlistModal } from './components/WatchlistModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Navigation & Filter State
  const [activeNav, setActiveNav] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState<MovieLanguage>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Active Full-Page Details View
  const [viewingMovie, setViewingMovie] = useState<Movie | null>(null);

  // Modals State
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist stored in LocalStorage
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cineverse_watchlist');
      return saved ? JSON.parse(saved) : ['manjummel-boys', 'kalki-2898-ad', 'aavesham'];
    } catch {
      return ['manjummel-boys', 'kalki-2898-ad', 'aavesham'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cineverse_watchlist', JSON.stringify(watchlistIds));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlistIds]);

  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlistIds((prev) => 
      prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
    );
  };

  const handleClearWatchlist = () => {
    setWatchlistIds([]);
  };

  const watchlistMovies = useMemo(() => {
    return INDIAN_MOVIES_DATA.filter((m) => watchlistIds.includes(m.id));
  }, [watchlistIds]);

  // Global Keyboard Shortcuts (Cmd+K or / for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered dataset based on language & genre
  const filteredDataset = useMemo(() => {
    return INDIAN_MOVIES_DATA.filter((m) => {
      const matchLang = selectedLanguage === 'All' || m.language === selectedLanguage;
      const matchGenre = selectedGenre === 'All' || m.genres.includes(selectedGenre);
      return matchLang && matchGenre;
    });
  }, [selectedLanguage, selectedGenre]);

  // Section 1: Trending Indian Cinema
  const trendingMovies = useMemo(() => {
    return filteredDataset.filter((m) => m.isTrending && !m.isUpcoming);
  }, [filteredDataset]);

  // Section 2: Explore by Indian Language
  const languageRailMovies = useMemo(() => {
    if (selectedLanguage !== 'All') {
      return INDIAN_MOVIES_DATA.filter((m) => m.language === selectedLanguage && !m.isUpcoming);
    }
    return INDIAN_MOVIES_DATA.filter((m) => !m.isUpcoming);
  }, [selectedLanguage]);

  // Section 3: Upcoming Most Wanted
  const upcomingMovies = useMemo(() => {
    return INDIAN_MOVIES_DATA.filter((m) => m.isUpcoming);
  }, []);

  // Section 4: Top Rated Masterpieces
  const topRatedMovies = useMemo(() => {
    return [...filteredDataset].filter((m) => !m.isUpcoming).sort((a, b) => b.rating - a.rating);
  }, [filteredDataset]);

  const handleExploreScroll = () => {
    setViewingMovie(null);
    setTimeout(() => {
      const target = document.querySelector('#trending-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectUniverse = (universeId: string, lang?: MovieLanguage) => {
    setViewingMovie(null);
    if (lang) setSelectedLanguage(lang);
    setTimeout(() => {
      const target = document.querySelector('#languages-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenMovie = (movie: Movie) => {
    setViewingMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#F59E0B] selection:text-black">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistIds.length}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* CONDITIONAL RENDER: Full Details Page or Catalog Homepage */}
      {viewingMovie ? (
        <MovieDetailsPage
          movie={viewingMovie}
          onBack={() => setViewingMovie(null)}
          onWatchTrailer={(movie) => setTrailerMovie(movie)}
          isWatchlisted={watchlistIds.includes(viewingMovie.id)}
          onToggleWatchlist={handleToggleWatchlist}
          onSelectMovie={handleOpenMovie}
          watchlistIds={watchlistIds}
        />
      ) : (
        <>
          {/* Main Attraction: Hero Section */}
          <HeroSection
            onWatchTrailer={(movie) => setTrailerMovie(movie)}
            onExploreMovies={handleExploreScroll}
            onSelectMovie={handleOpenMovie}
            isWatchlisted={watchlistIds.includes(INDIAN_MOVIES_DATA[0].id)}
            onToggleWatchlist={handleToggleWatchlist}
          />

          {/* Ticker / Live Stats & Genre Pill Bar */}
          <StatsGenreBar
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
            totalMoviesCount={INDIAN_MOVIES_DATA.length}
          />

          {/* Active Language Notice Banner (if filtered) */}
          {selectedLanguage !== 'All' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <p className="text-xs sm:text-sm text-amber-200">
                    Filtered by: <strong>{selectedLanguage} Cinema</strong>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLanguage('All')}
                  className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-all font-mono"
                >
                  Reset to All (PAN)
                </button>
              </div>
            </div>
          )}

          {/* Main Content Sections */}
          <div className="space-y-12 py-10">
            
            {/* SECTION 1: Trending Indian Cinema */}
            <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#F97316] font-mono">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    High Demand
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    Trending Indian Cinema
                  </h2>
                </div>
                <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                  Scroll horizontally →
                </span>
              </div>

              <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2">
                {trendingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={handleOpenMovie}
                    onWatchTrailer={setTrailerMovie}
                    isWatchlisted={watchlistIds.includes(movie.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 2: Explore by Indian Language */}
            <section id="languages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-emerald-400 font-mono">
                    <Globe className="w-3.5 h-3.5" />
                    Regional Gems & Blockbusters
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    Explore by Indian Language
                  </h2>
                </div>

                {/* Sub-filter tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { label: 'All', val: 'All' },
                    { label: 'Malayalam (മലയാളം)', val: 'Malayalam' },
                    { label: 'Tamil (தமிழ்)', val: 'Tamil' },
                    { label: 'Telugu (తెలుగు)', val: 'Telugu' },
                    { label: 'Hindi (बॉलीवुड)', val: 'Hindi' },
                    { label: 'Kannada (ಕನ್ನಡ)', val: 'Kannada' }
                  ].map((tab) => (
                    <button
                      key={tab.val}
                      onClick={() => setSelectedLanguage(tab.val as MovieLanguage)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                        selectedLanguage === tab.val
                          ? 'bg-white text-black border-white font-bold'
                          : 'glass-badge text-gray-300 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2">
                {languageRailMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={handleOpenMovie}
                    onWatchTrailer={setTrailerMovie}
                    isWatchlisted={watchlistIds.includes(movie.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 3: Upcoming Most Wanted */}
            <section id="upcoming-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#F59E0B] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    Anticipated Releases
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    Upcoming Most Wanted
                  </h2>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  Theatrical Premieres
                </span>
              </div>

              <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2">
                {upcomingMovies.map((movie, idx) => {
                  const countdowns = ['In 22 Days', 'In 135 Days', 'In 170 Days', 'In 320 Days', 'In 148 Days'];
                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={handleOpenMovie}
                      onWatchTrailer={setTrailerMovie}
                      isWatchlisted={watchlistIds.includes(movie.id)}
                      onToggleWatchlist={handleToggleWatchlist}
                      countdownBadge={countdowns[idx % countdowns.length]}
                    />
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: Top Rated Masterpieces */}
            <section id="toprated-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-amber-300 font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Critically Acclaimed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    Top Rated Masterpieces
                  </h2>
                </div>
                <span className="text-xs font-mono text-gray-400">
                  Sorted by Global IMDb Score
                </span>
              </div>

              <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2">
                {topRatedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={handleOpenMovie}
                    onWatchTrailer={setTrailerMovie}
                    isWatchlisted={watchlistIds.includes(movie.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 5: Iconic Indian Cinematic Universes */}
            <CinematicUniverses onSelectUniverse={handleSelectUniverse} />

          </div>
        </>
      )}

      {/* Footer */}
      <Footer
        onSelectLanguage={setSelectedLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
      />

      {/* Trailer Video Player Modal */}
      <TrailerModal
        movie={trailerMovie}
        onClose={() => setTrailerMovie(null)}
      />

      {/* Dynamic Search Modal */}
      <SearchFilterModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMovie={(movie) => {
          setIsSearchOpen(false);
          handleOpenMovie(movie);
        }}
        onWatchTrailer={(movie) => {
          setIsSearchOpen(false);
          setTrailerMovie(movie);
        }}
        watchlistIds={watchlistIds}
        onToggleWatchlist={handleToggleWatchlist}
        initialLanguage={selectedLanguage}
      />

      {/* Slide-over Watchlist Drawer */}
      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        movies={watchlistMovies}
        onSelectMovie={(movie) => {
          setIsWatchlistOpen(false);
          handleOpenMovie(movie);
        }}
        onWatchTrailer={(movie) => setTrailerMovie(movie)}
        onRemoveFromWatchlist={handleToggleWatchlist}
        onClearWatchlist={handleClearWatchlist}
        onExploreMovies={handleExploreScroll}
      />

    </div>
  );
};

export default App;
