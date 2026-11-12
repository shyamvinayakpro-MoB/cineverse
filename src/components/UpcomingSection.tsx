import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Play, 
  Bell, 
  Flame, 
  Sparkles,
  ChevronRight,
  Heart
} from 'lucide-react';
import { Movie } from '../types/movie';

interface UpcomingSectionProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  watchlistIds: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({
  movies,
  onSelectMovie,
  onWatchTrailer,
  watchlistIds,
  onToggleWatchlist
}) => {
  const [selectedUpcoming, setSelectedUpcoming] = useState<Movie>(movies[0] || null);
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Update countdown every second
  useEffect(() => {
    if (!selectedUpcoming) return;

    const calculateCountdown = () => {
      const releaseTime = new Date(selectedUpcoming.releaseDate).getTime();
      const now = new Date().getTime();
      const difference = releaseTime - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [selectedUpcoming]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = selectedUpcoming || movies[0];
  const isWatchlisted = watchlistIds.includes(currentMovie.id);

  return (
    <section id="upcoming" className="py-12 sm:py-16 bg-[#0a0a0a] border-t border-b border-white/5 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                Upcoming Indian Blockbusters
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              The most awaited pan-Indian spectacles hitting the big screens. Set your alerts!
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 w-fit">
            Theatrical Premieres
          </span>
        </div>

        {/* Spotlight Showcase of Selected Upcoming Movie */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Backdrop & Poster Imagery */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden bg-[#161616]">
              <img
                src={currentMovie.backdropUrl}
                alt={currentMovie.title}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#121212]/50 lg:to-[#121212]" />

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg">
                  {currentMovie.language}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                  {currentMovie.genres.join(' • ')}
                </span>
              </div>
            </div>

            {/* Right: Info & Countdown Timer */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Expected Release: {new Date(currentMovie.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    {currentMovie.title}
                  </h3>
                  {currentMovie.originalTitle && (
                    <p className="text-sm text-amber-400 font-medium">
                      {currentMovie.originalTitle}
                    </p>
                  )}
                  {currentMovie.tagline && (
                    <p className="text-xs italic text-gray-400 mt-1">
                      "{currentMovie.tagline}"
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {currentMovie.synopsis}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">Director</span>
                    <span className="text-white font-medium">{currentMovie.director}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">Music</span>
                    <span className="text-amber-400 font-medium">{currentMovie.musicDirector}</span>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Blocks */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Countdown to Theatrical Release
                </span>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-display">
                      {countdown.days}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Days</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                    <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-display">
                      {countdown.hours}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Hours</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-display">
                      {countdown.minutes}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Mins</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                    <span className="block text-2xl sm:text-3xl font-black text-red-500 font-display">
                      {countdown.seconds}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Secs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onWatchTrailer(currentMovie)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Teaser</span>
                </button>

                <button
                  onClick={() => onToggleWatchlist(currentMovie)}
                  className={`p-3 rounded-xl border transition-all ${
                    isWatchlisted
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                  }`}
                  title={isWatchlisted ? 'Remove from Alerts' : 'Add to Watchlist Alerts'}
                >
                  <Heart className={`w-4 h-4 ${isWatchlisted ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={() => onSelectMovie(currentMovie)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                >
                  Details
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Upcoming Movie Picker Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {movies.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedUpcoming(m)}
              className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                currentMovie.id === m.id
                  ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-950/20'
                  : 'bg-[#141414] border-white/5 hover:border-white/20'
              }`}
            >
              <img
                src={m.posterUrl}
                alt={m.title}
                className="w-12 h-16 object-cover rounded-xl shrink-0"
              />
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${currentMovie.id === m.id ? 'text-amber-400' : 'text-white'}`}>
                  {m.title}
                </p>
                <p className="text-[11px] text-gray-400">{m.language}</p>
                <p className="text-[10px] text-gray-500">{new Date(m.releaseDate).getFullYear()}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
