import React from 'react';
import { Sparkles, Layers, Globe, Radio } from 'lucide-react';

interface StatsGenreBarProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  totalMoviesCount: number;
}

export const StatsGenreBar: React.FC<StatsGenreBarProps> = ({
  selectedGenre,
  onSelectGenre,
  totalMoviesCount
}) => {
  const genres = ['All', 'Action', 'Thriller', 'Drama', 'Comedy', 'Sci-Fi', 'Crime', 'Horror', 'Period'];

  return (
    <section className="py-4 bg-[#0c0c0e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Ticker Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 pb-3 border-b border-white/5 font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-gray-300 font-semibold">Live Indian Cinema Index</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span><strong className="text-white">12,480+</strong> Curated Titles</span>
            </span>

            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span><strong className="text-white">5</strong> Regional Languages</span>
            </span>

            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              TMDB Real-time Sync
            </span>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs uppercase font-bold text-gray-500 tracking-wider shrink-0 mr-1 font-mono">
            Filter Genre:
          </span>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedGenre === genre
                  ? 'bg-[#F59E0B] text-black font-extrabold shadow-md shadow-amber-500/20'
                  : 'glass-card text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
