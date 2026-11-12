import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  Film, 
  Check,
  ArrowUpDown
} from 'lucide-react';
import { Movie, MovieLanguage, SortOption } from '../types/movie';
import { MovieApiService } from '../services/tmdbApi';
import { MovieCard } from './MovieCard';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  watchlistIds: string[];
  onToggleWatchlist: (movie: Movie) => void;
  initialLanguage?: MovieLanguage;
}

export const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isOpen,
  onClose,
  onSelectMovie,
  onWatchTrailer,
  watchlistIds,
  onToggleWatchlist,
  initialLanguage = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<MovieLanguage>(initialLanguage);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const languages: MovieLanguage[] = ['All', 'Malayalam', 'Tamil', 'Telugu', 'Hindi', 'Kannada'];
  
  const genres = [
    'All',
    'Action',
    'Thriller',
    'Drama',
    'Comedy',
    'Crime',
    'Sci-Fi',
    'Horror',
    'Mythological',
    'Period',
    'Adventure',
    'Romance',
    'Classic'
  ];

  const eras = [
    { label: 'All Years', value: 'All' },
    { label: '2024 - 2025 (Latest)', value: '2024' },
    { label: '2022 - 2023', value: '2022' },
    { label: '2010s Blockbusters', value: '2010s' },
    { label: 'Vintage Classics', value: '1970s' }
  ];

  // Sync initial language if passed
  useEffect(() => {
    if (initialLanguage) setSelectedLanguage(initialLanguage);
  }, [initialLanguage]);

  // Execute Search & Filter
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(async () => {
      const res = await MovieApiService.searchMovies(searchQuery, {
        language: selectedLanguage,
        genre: selectedGenre,
        year: selectedEra
      });

      if (!isMounted) return;

      let sorted = [...res.movies];
      if (sortBy === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'releaseDate') {
        sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      } else if (sortBy === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'popularity') {
        sorted.sort((a, b) => b.voteCount - a.voteCount);
      }

      setResults(sorted);
      setIsLoading(false);
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedLanguage, selectedGenre, selectedEra, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('All');
    setSelectedGenre('All');
    setSelectedEra('All');
    setSortBy('rating');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex flex-col p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      
      {/* Top Bar with Title and Close */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Discover Indian Cinema
            </h2>
            <p className="text-xs text-gray-400">
              Search by title, star cast, director, or filter by language and genre
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Discovery"
          className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-7xl w-full mx-auto py-6 space-y-6">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie name, actor (e.g. Fahadh Faasil, Rajini), director (e.g. Lokesh, Rajamouli)..."
            autoFocus
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#141414] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm sm:text-base shadow-2xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills & Controls */}
        <div className="space-y-4 p-4 rounded-2xl bg-[#121212] border border-white/10">
          
          {/* Languages */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">
              Language:
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                    selectedLanguage === lang
                      ? 'bg-amber-500 text-black border-amber-500 shadow-md font-bold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {lang === 'All' ? 'All Languages' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">
              Genre:
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                    selectedGenre === g
                      ? 'bg-red-600 text-white border-red-600 shadow-md font-bold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Era / Release Year & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">
                Era:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {eras.map((era) => (
                  <button
                    key={era.value}
                    onClick={() => setSelectedEra(era.value)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      selectedEra === era.value
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-400"
                >
                  <option value="rating">IMDb Rating (Highest)</option>
                  <option value="popularity">Popularity / Votes</option>
                  <option value="releaseDate">Release Date (Newest)</option>
                  <option value="title">Movie Title (A-Z)</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-all"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

          </div>

        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            Showing <strong className="text-white font-bold">{results.length}</strong> Indian movies
          </span>
          {isLoading && <span className="text-amber-400 animate-pulse">Searching catalog...</span>}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {results.map((movie) => (
              <div key={movie.id} className="w-full flex justify-center">
                <MovieCard
                  movie={movie}
                  onSelect={onSelectMovie}
                  onWatchTrailer={onWatchTrailer}
                  isWatchlisted={watchlistIds.includes(movie.id)}
                  onToggleWatchlist={onToggleWatchlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <Film className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Indian movies matched your search</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Try adjusting your query, switching languages (Malayalam, Tamil, Telugu, Hindi, Kannada), or resetting the genre filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
