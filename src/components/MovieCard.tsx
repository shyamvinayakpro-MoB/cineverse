import React, { useState } from 'react';
import { 
  Star, 
  Play, 
  Info, 
  Bookmark, 
  Check
} from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (movie: Movie) => void;
  countdownBadge?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  onWatchTrailer,
  isWatchlisted = false,
  onToggleWatchlist,
  countdownBadge
}) => {
  const [imageError, setImageError] = useState(false);
  const fallbackPoster = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80';

  return (
    <div className="group relative flex-none w-[190px] sm:w-[220px] md:w-[240px] rounded-2xl overflow-hidden bg-[#16161a] border border-white/10 shadow-xl transition-all duration-300 hover:border-[#F59E0B]/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/80">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#121215]">
        <img
          src={imageError ? fallbackPoster : movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent pointer-events-none" />

        {/* Top Badges: Language & Bookmark */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="glass-badge px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow">
            {movie.language}
          </span>

          {onToggleWatchlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist(movie);
              }}
              aria-label={isWatchlisted ? 'Remove bookmark' : 'Bookmark movie'}
              className={`p-1.5 rounded-full glass-badge transition-transform hover:scale-110 ${
                isWatchlisted
                  ? 'bg-[#E50914] text-white border-transparent'
                  : 'text-gray-300 hover:text-amber-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Release Countdown Pill (for Upcoming) */}
        {countdownBadge && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md font-mono">
              {countdownBadge}
            </span>
          </div>
        )}

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
          <button
            onClick={() => onWatchTrailer(movie)}
            className="w-10 h-10 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
            title="Watch Trailer"
          >
            <Play className="w-4 h-4 fill-black ml-0.5" />
          </button>
          <button
            onClick={() => onSelect(movie)}
            className="w-10 h-10 rounded-full glass-card text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            title="View Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Info Card Area */}
      <div 
        onClick={() => onSelect(movie)}
        className="p-3.5 cursor-pointer space-y-1.5"
      >
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono text-gray-400 text-[11px]">{movie.year}</span>
          <div className="flex items-center gap-1 font-bold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-sm sm:text-base truncate group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>

        <p className="text-[11px] text-gray-400 line-clamp-1">
          {movie.genres.join(' • ')}
        </p>
      </div>

    </div>
  );
};
