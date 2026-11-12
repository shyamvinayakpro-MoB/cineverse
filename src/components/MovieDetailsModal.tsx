import React, { useEffect } from 'react';
import { 
  X, 
  Play, 
  Heart, 
  Star, 
  Clock, 
  Calendar, 
  Music, 
  Video, 
  Users, 
  Share2,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieApiService } from '../services/tmdbApi';
import { MovieCard } from './MovieCard';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onWatchTrailer: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
  watchlistIds: string[];
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onWatchTrailer,
  isWatchlisted,
  onToggleWatchlist,
  onSelectMovie,
  watchlistIds
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const similarMovies = MovieApiService.getSimilarMovies(movie);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-start justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-300">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl bg-[#101010] border border-white/10 sm:rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Movie Details"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Banner */}
        <div className="relative h-64 sm:h-96 md:h-[440px] w-full overflow-hidden bg-[#181818]">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-top sm:object-center transform scale-102"
          />
          
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101010]/80 via-transparent to-transparent" />

          {/* Quick Play Trailer Button in Backdrop Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => onWatchTrailer(movie)}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-bold backdrop-blur-md shadow-2xl shadow-red-950/60 hover:scale-105 active:scale-95 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center shadow">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span>Play Official Trailer</span>
            </button>
          </div>
        </div>

        {/* Details Content Container */}
        <div className="relative px-6 sm:px-10 pb-10 -mt-20 sm:-mt-28 space-y-8">
          
          {/* Main Info Row with Poster & Headers */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            
            {/* Poster Thumbnail */}
            <div className="relative w-36 sm:w-48 md:w-56 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#141414] mx-auto md:mx-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 right-2 text-center py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-amber-400/30">
                {movie.language} Cinema
              </span>
            </div>

            {/* Title & Core Metadata */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {movie.certification || 'U/A'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                    {movie.year}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
                  {movie.title}
                </h1>
                {movie.originalTitle && (
                  <p className="text-lg text-amber-400/90 font-medium">
                    {movie.originalTitle}
                  </p>
                )}
                {movie.tagline && (
                  <p className="text-sm italic text-gray-400 pt-0.5">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Rating and Reviews */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 py-1">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-bold">{movie.rating.toFixed(1)}</span>
                  <span className="text-xs text-amber-300/70">/ 10</span>
                </div>

                <div className="text-xs text-gray-400">
                  <span className="block font-semibold text-white">{movie.voteCount.toLocaleString()}</span>
                  <span>IMDb Votes</span>
                </div>

                {movie.boxOffice && (
                  <div className="text-xs text-gray-400 border-l border-white/10 pl-4">
                    <span className="block font-semibold text-emerald-400">{movie.boxOffice}</span>
                    <span>Worldwide Box Office</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#1e1e1e] border border-white/10 text-gray-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Watch Trailer & Add to Watchlist */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => onWatchTrailer(movie)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-sm shadow-xl shadow-red-950/50 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={() => onToggleWatchlist(movie)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isWatchlisted
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-900/40'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWatchlisted ? 'fill-white' : ''}`} />
                  <span>{isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-amber-500">
              Synopsis
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast & Crew Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
            
            {/* Directors & Creators */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                Key Creators
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-gray-400 block font-medium">Director</span>
                  <span className="text-sm font-bold text-white">{movie.director}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-gray-400 block font-medium flex items-center gap-1">
                    <Music className="w-3 h-3 text-amber-400" />
                    Music Director
                  </span>
                  <span className="text-sm font-bold text-amber-300">{movie.musicDirector}</span>
                </div>
              </div>
            </div>

            {/* Star Cast */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Featured Cast
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {movie.cast.map((member, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{member.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Movies Rail */}
          {similarMovies.length > 0 && (
            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="text-lg font-bold text-white">
                More Indian Movies You May Like
              </h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                {similarMovies.map((simMovie) => (
                  <div key={simMovie.id} className="w-[180px] shrink-0">
                    <MovieCard
                      movie={simMovie}
                      onSelect={(m) => onSelectMovie(m)}
                      onWatchTrailer={onWatchTrailer}
                      isWatchlisted={watchlistIds.includes(simMovie.id)}
                      onToggleWatchlist={onToggleWatchlist}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
