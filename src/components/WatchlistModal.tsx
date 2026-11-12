import React, { useEffect } from 'react';
import { X, Bookmark, Play, Trash2, Film, ArrowRight } from 'lucide-react';
import { Movie } from '../types/movie';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  onRemoveFromWatchlist: (movie: Movie) => void;
  onClearWatchlist: () => void;
  onExploreMovies: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
  onWatchTrailer,
  onRemoveFromWatchlist,
  onClearWatchlist,
  onExploreMovies
}) => {
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
    <div id="watchlistDrawer" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over panel: w-80 md:w-96 bg-brand-card/95 */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#16161a]/95 backdrop-blur-2xl border-l border-white/10 h-full min-h-screen flex flex-col p-6 z-10 shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-[#F59E0B] border border-amber-500/20">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                My CineVerse Watchlist
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                {movies.length} {movies.length === 1 ? 'Title' : 'Titles'} Bookmarked
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Watchlist"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watchlist Movie List */}
        <div className="flex-1 overflow-y-auto py-5 space-y-3">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="group p-3 rounded-2xl bg-[#111114] border border-white/5 hover:border-[#F59E0B]/40 transition-all flex items-center gap-3.5"
              >
                {/* Poster */}
                <div 
                  onClick={() => {
                    onClose();
                    onSelectMovie(movie);
                  }}
                  className="w-12 h-16 shrink-0 rounded-lg overflow-hidden cursor-pointer relative bg-black/50"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-3.5 h-3.5 text-white fill-current" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
                    <span className="uppercase">{movie.language}</span>
                    <span>•</span>
                    <span className="font-mono">{movie.year}</span>
                    <span>•</span>
                    <span>★ {movie.rating.toFixed(1)}</span>
                  </div>
                  <h4 
                    onClick={() => {
                      onClose();
                      onSelectMovie(movie);
                    }}
                    className="font-bold text-white text-sm truncate cursor-pointer hover:text-amber-300 transition-colors font-display"
                  >
                    {movie.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {movie.genres.join(', ')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onWatchTrailer(movie)}
                    className="p-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                    title="Watch Trailer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => onRemoveFromWatchlist(movie)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-400 hover:text-red-400 transition-all"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-600">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Your Watchlist is empty</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our curated collection of Indian movies across Malayalam, Tamil, Telugu, Hindi, and Kannada and bookmark your favorites!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMovies();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F59E0B] text-black font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all"
              >
                <span>Discover Movies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {movies.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onClearWatchlist}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Watchlist</span>
            </button>
            <span className="text-[10px] text-gray-500 font-mono">
              Auto-saved locally
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
