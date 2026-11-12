import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Flame,
  Check
} from 'lucide-react';
import { Movie } from '../types/movie';
import { HERO_FEATURED_MOVIES } from '../data/indianMoviesData';

interface HeroSectionProps {
  onWatchTrailer: (movie: Movie) => void;
  onExploreMovies: () => void;
  onSelectMovie: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onWatchTrailer,
  onExploreMovies,
  onSelectMovie,
  isWatchlisted,
  onToggleWatchlist
}) => {
  // Use the top 4 featured movies as indicated by Stitch (01/04)
  const featured = HERO_FEATURED_MOVIES.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentMovie = featured[currentIndex] || featured[0];

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [featured.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-end justify-start overflow-hidden bg-[#080808]"
    >
      {/* Background Backdrop with Ken Burns */}
      <div className="absolute inset-0 w-full h-full">
        <img
          key={currentMovie.id}
          src={currentMovie.backdropUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center transform scale-105 animate-kenburns brightness-[0.72]"
        />

        {/* Multi-stop cinematic obsidian gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent max-w-4xl" />
        
        {/* Amber & Crimson ambient mood lighting */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#F59E0B]/12 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left: Main Titles & CTAs */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            
            {/* Spotlight Tag pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="glass-badge px-3 py-1 rounded-full text-xs font-semibold text-gray-200 flex items-center gap-2 shadow-lg">
                <span className="flex items-center gap-1 text-[#F97316] font-bold">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  #1 Spotlight
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-[#F59E0B] font-bold">{currentMovie.language}</span>
                <span className="text-gray-500">•</span>
                <span>{currentMovie.genres.join(' • ')}</span>
                <span className="text-gray-500">•</span>
                <span className="font-mono">{currentMovie.year}</span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {currentMovie.rating.toFixed(1)} / 10
                </span>
              </span>
            </div>

            {/* Giant Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white drop-shadow-2xl">
                {currentMovie.title}
              </h1>
              {currentMovie.tagline && (
                <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#F59E0B] uppercase pt-1">
                  {currentMovie.tagline}
                </p>
              )}
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-2xl">
              {currentMovie.synopsis}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Watch Official Trailer (Filled Amber Button) */}
              <button
                onClick={() => onWatchTrailer(currentMovie)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Watch Official Trailer</span>
              </button>

              {/* Explore Details (Glass Button) */}
              <button
                onClick={() => onSelectMovie(currentMovie)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass-card hover:border-[#F59E0B]/60 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Info className="w-4 h-4 text-amber-400" />
                <span>Explore Details</span>
              </button>

              {/* Bookmark to Watchlist */}
              <button
                onClick={() => onToggleWatchlist(currentMovie)}
                aria-label="Add to Watchlist"
                className={`p-3.5 rounded-xl glass-card transition-all ${
                  isWatchlisted
                    ? 'border-[#E50914] bg-[#E50914]/20 text-[#E50914]'
                    : 'text-gray-300 hover:text-amber-400 hover:border-amber-400/40'
                }`}
                title="Add to Watchlist"
              >
                <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
              </button>

            </div>

          </div>

          {/* Right: Slide Counter & 4 Thumbnail Preview Cards */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            
            {/* Slide Counter & Arrow Controls */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <span className="font-mono text-xs tracking-wider text-gray-400">
                <strong className="text-white text-sm">0{currentIndex + 1}</strong> / 0{featured.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-8 h-8 rounded-full glass-card hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-8 h-8 rounded-full glass-card hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Miniature Preview Cards */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
              {featured.map((movie, idx) => (
                <button
                  key={movie.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[2/3] border transition-all duration-300 ${
                    currentIndex === idx
                      ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/50 shadow-lg shadow-amber-500/30 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-center">
                    {movie.title}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
};
