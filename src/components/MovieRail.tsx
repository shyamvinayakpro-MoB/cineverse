import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRailProps {
  id?: string;
  title: string;
  subtitle?: string;
  movies: Movie[];
  icon?: React.ReactNode;
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  watchlistIds: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const MovieRail: React.FC<MovieRailProps> = ({
  id,
  title,
  subtitle,
  movies,
  icon,
  onSelectMovie,
  onWatchTrailer,
  watchlistIds,
  onToggleWatchlist
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(checkScrollLimits, 350);
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div id={id} className="relative py-6 sm:py-8 group/rail">
      
      {/* Header with Title and Scroll Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {icon && <span className="text-amber-400">{icon}</span>}
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover/rail:text-amber-200 transition-colors">
                {title}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-medium">
                {movies.length}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${title} left`}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? 'bg-[#181818] hover:bg-white/20 text-white border-white/15 hover:scale-105 active:scale-95'
                  : 'bg-transparent text-gray-600 border-white/5 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label={`Scroll ${title} right`}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollRight
                  ? 'bg-[#181818] hover:bg-white/20 text-white border-white/15 hover:scale-105 active:scale-95'
                  : 'bg-transparent text-gray-600 border-white/5 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Rail */}
      <div
        ref={scrollRef}
        onScroll={checkScrollLimits}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {movies.map((movie) => (
          <div key={movie.id} style={{ scrollSnapAlign: 'start' }}>
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
    </div>
  );
};
