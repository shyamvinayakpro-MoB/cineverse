import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  CheckCircle2, 
  Share2, 
  Star, 
  Play, 
  Tv, 
  Download, 
  Flame, 
  Clock, 
  Calendar, 
  Film, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Ticket, 
  Check,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles
} from 'lucide-react';
import { Movie } from '../types/movie';
import { INDIAN_MOVIES_DATA } from '../data/indianMoviesData';
import { MovieCard } from './MovieCard';

interface MovieDetailsPageProps {
  movie: Movie;
  onBack: () => void;
  onWatchTrailer: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
  watchlistIds: string[];
}

export const MovieDetailsPage: React.FC<MovieDetailsPageProps> = ({
  movie,
  onBack,
  onWatchTrailer,
  isWatchlisted,
  onToggleWatchlist,
  onSelectMovie,
  watchlistIds
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'videos' | 'specs' | 'reviews'>('overview');
  const [userRating, setUserRating] = useState<number>(4.5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Recommendations: Movies in similar genres or language
  const recommendations = INDIAN_MOVIES_DATA.filter(
    (m) => m.id !== movie.id && (m.language === movie.language || m.genres.some((g) => movie.genres.includes(g)))
  ).slice(0, 5);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${movie.title} – CineVerse`,
        text: movie.synopsis,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 pb-16">
      
      {/* 1. TOP BREADCRUMBS & QUICK ACTION BAR */}
      <div className="border-b border-white/10 bg-[#0d0d10]/90 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Movies</span>
            </button>
            <span className="text-gray-600 font-mono">/</span>
            <span className="hover:text-gray-200 cursor-pointer">{movie.language} Cinema</span>
            <span className="text-gray-600 font-mono">/</span>
            <span className="text-[#F59E0B] font-bold truncate max-w-[200px] sm:max-w-none">
              {movie.title} ({movie.year})
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Watchlist Toggle */}
            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isWatchlisted
                  ? 'bg-amber-500/20 text-[#F59E0B] border-[#F59E0B]'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-300 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isWatchlisted ? 'Bookmarked' : 'Watchlist'}</span>
            </button>

            {/* Mark Watched Toggle */}
            <button
              onClick={() => setIsWatched(!isWatched)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isWatched
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isWatched ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isWatched ? 'Watched' : 'Mark Watched'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-gray-300 hover:text-white transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
            </button>

            {/* Interactive Rating Widget */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161a] border border-white/15 text-xs">
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">RATE:</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setUserRating(star)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        (hoverRating !== null ? star <= hoverRating : star <= Math.round(userRating))
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="font-mono text-amber-400 font-bold ml-0.5">{userRating.toFixed(1)}</span>
            </div>

          </div>

        </div>
      </div>

      {/* 2. ROUNDED CINEMATIC HERO CARD (EXACT GOOGLE STITCH DESIGN SPEC) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#121216] shadow-2xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10 md:p-12">
          
          {/* Card Background Backdrop with Cinematic Overlays */}
          <div className="absolute inset-0">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover brightness-[0.70]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent max-w-4xl" />
          </div>

          {/* Card Foreground Content */}
          <div className="relative z-10 space-y-4 max-w-4xl">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E50914] text-white shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{movie.universeBadge || `${movie.title} Cinematic Universe`}</span>
              </span>

              <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 border border-white/20 text-gray-200 backdrop-blur-md">
                {movie.recordBadge || 'Theatrical Global Blockbuster'}
              </span>

              <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-black/60 border border-white/20 text-gray-300 backdrop-blur-md">
                {movie.specialFormat || 'IMAX 3D Experience'}
              </span>
            </div>

            {/* Big Bold White Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-none drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-sm sm:text-base text-gray-300 font-medium font-display max-w-2xl">
                {movie.tagline}
              </p>
            )}

            {/* Metadata Row 1 */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-gray-300 font-mono pt-1">
              <span className="text-white font-bold">{movie.year}</span>
              <span className="text-gray-400">CBFC: {movie.certification || 'U/A 13+'}</span>
              <span>{Math.floor(movie.runtime / 60)}h {String(movie.runtime % 60).padStart(2, '0')}m ({movie.runtime} Mins)</span>
              <span className="text-[#F59E0B] font-bold">{movie.language} (Original)</span>
              <span className="text-gray-400">Hindi, Tamil, Malayalam, Kannada</span>
            </div>

            {/* Metadata Row 2: Genres */}
            <div className="text-xs sm:text-sm text-gray-300 font-mono">
              <span>{movie.genres.join(' • ')}</span>
            </div>

            {/* Three Rating Pills: IMDb, Tomatometer, CineVerse Pulse */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs font-mono shadow-md">
                <span className="text-amber-400 font-black">IMDb</span>
                <strong className="text-white font-bold">{movie.rating.toFixed(1)} /10</strong>
                <span className="text-gray-400">({movie.voteCount ? (movie.voteCount >= 1000 ? (movie.voteCount / 1000).toFixed(0) + 'K+' : movie.voteCount) : '120K+'} votes)</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs font-mono shadow-md">
                <span className="text-base leading-none">🍅</span>
                <strong className="text-white font-bold">{movie.tomatometer || '88%'}</strong>
                <span className="text-gray-400">Tomatometer</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs font-mono shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <strong className="text-white font-bold">{movie.pulseScore || '9.1'}</strong>
                <span className="text-gray-400">CineVerse Pulse</span>
              </div>
            </div>

            {/* Three Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onWatchTrailer(movie)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-200 text-black font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Watch Official Trailer</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`, '_blank');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/25 text-white font-semibold text-sm backdrop-blur-md hover:border-amber-400 transition-all"
              >
                <Tv className="w-4 h-4 text-red-500" />
                <span>Stream on Netflix / Prime</span>
              </button>

              <button
                onClick={() => window.open(movie.backdropUrl, '_blank')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-gray-300 hover:text-white font-semibold text-sm backdrop-blur-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Press Kit & Wallpapers</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. NAVIGATION TABS (EXACT CLEAN UNDERLINE TABS FROM STITCH) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 border-b border-white/10">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar font-display text-xs sm:text-sm font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'cast', label: 'Cast & Characters' },
            { id: 'videos', label: 'Videos & Clips' },
            { id: 'music', label: 'Original Soundtrack' },
            { id: 'lore', label: 'Lore & Behind the Scenes' },
            { id: 'reviews', label: 'Critical Acclaim & Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? 'text-white font-bold border-b-2 border-white'
                  : 'text-gray-400 hover:text-white font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. DUAL-COLUMN CONTENT ARCHITECTURE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Specs, Streaming & Financial Milestones (~1/3 width = 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Theatrical Poster Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[2/3] border border-white/15 shadow-2xl bg-[#141418]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/30">
                  Official Theatrical Release Poster
                </span>
              </div>
            </div>

            {/* Global Theatrical Box Office Milestone */}
            <div className="p-5 rounded-2xl bg-[#16161a] border border-amber-500/25 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Global Theatrical Milestone
              </span>
              <div className="text-3xl font-black font-display text-white">
                {movie.boxOffice || '₹1,150+ Crore'}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Ranked among the Highest Grossing Indian Films of All-Time across 5 languages globally.
              </p>
            </div>

            {/* Where to Stream Module */}
            <div className="p-5 rounded-2xl bg-[#16161a] border border-white/10 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                Where to Stream & Watch
              </h3>

              <div className="space-y-2.5">
                {/* Netflix */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-1 rounded bg-[#E50914] text-white font-black text-xs font-mono">NFLX</span>
                    <div>
                      <p className="text-xs font-bold text-white">Netflix</p>
                      <p className="text-[10px] text-gray-400">Hindi, English Subtitles • 4K HDR</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`, '_blank')}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
                  >
                    Watch
                  </button>
                </div>

                {/* Prime Video */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-1 rounded bg-blue-600 text-white font-black text-xs font-mono">PRM</span>
                    <div>
                      <p className="text-xs font-bold text-white">Prime Video</p>
                      <p className="text-[10px] text-gray-400">Telugu, Tamil, Malayalam, Kannada</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.primevideo.com/search?phrase=${encodeURIComponent(movie.title)}`, '_blank')}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
                  >
                    Watch
                  </button>
                </div>

                {/* Theatres / IMAX */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-1 rounded bg-amber-500 text-black font-black text-xs font-mono">BMS</span>
                    <div>
                      <p className="text-xs font-bold text-white">IMAX 3D Experience</p>
                      <p className="text-[10px] text-gray-400">Select Revival Screenings</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://in.bookmyshow.com', '_blank')}
                    className="px-3 py-1 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all"
                  >
                    Tickets
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="p-5 rounded-2xl bg-[#16161a] border border-white/10 space-y-3 font-mono text-xs">
              <h3 className="font-bold uppercase tracking-wider text-gray-400">
                Technical Specifications
              </h3>
              
              <div className="space-y-2 text-gray-300 divide-y divide-white/5">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Master Audio:</span>
                  <span className="text-white font-semibold">Dolby Atmos • 7.1 Surround</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Aspect Ratio:</span>
                  <span className="text-white font-semibold">2.39:1 (1.90:1 IMAX Scenes)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Mastered Format:</span>
                  <span className="text-amber-400 font-semibold">4K Master (Dolby Vision)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Production Budget:</span>
                  <span className="text-white font-semibold">{movie.budget || '₹600 Crore ($72M)'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Filming Locations:</span>
                  <span className="text-white font-semibold">Ramoji, Italy, Leh Ladakh</span>
                </div>
              </div>
            </div>

            {/* Box Office Target Tracker */}
            <div className="p-5 rounded-2xl bg-[#16161a] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-bold uppercase">Box Office Target Tracker</span>
                <span className="text-emerald-400 font-bold">192% of Target</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-1">
                <div>
                  <span className="block text-white font-bold">₹780 Cr</span>
                  <span>Domestic Gross (India)</span>
                </div>
                <div>
                  <span className="block text-white font-bold">₹370 Cr ($45M)</span>
                  <span>Overseas Gross</span>
                </div>
              </div>
              <span className="block text-center text-[10px] text-amber-400 font-bold uppercase tracking-wider pt-1">
                Classification: All-Time Mega Blockbuster
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Narrative, Media & Cast (~2/3 width = 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Synopsis & Narrative Storyline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#16161a] border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {movie.premiseTitle || `The Story: ${movie.tagline || movie.title}`}
                </h2>
              </div>

              <div className="space-y-3 text-gray-300 leading-relaxed text-sm sm:text-base">
                <p>{movie.synopsis}</p>
                {movie.synopsisP2 && <p className="text-gray-400 text-xs sm:text-sm">{movie.synopsisP2}</p>}
                {movie.synopsisP3 && <p className="text-gray-400 text-xs sm:text-sm">{movie.synopsisP3}</p>}
              </div>

              {/* Hashtag pills */}
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-amber-400">
                {(movie.hashtags || [`#${movie.title.replace(/\s+/g, '')}`, `#${movie.language}Cinema`, '#Blockbuster']).map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Teasers & Behind-The-Scenes Video Gallery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-400" />
                  <h3 className="text-lg font-bold font-display text-white">
                    Featured Teasers & Behind-The-Scenes
                  </h3>
                </div>
                <button 
                  onClick={() => onWatchTrailer(movie)}
                  className="text-xs text-amber-400 font-mono hover:underline"
                >
                  View All Videos →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(movie.teasers && movie.teasers.length > 0 ? movie.teasers : [
                  { title: `${movie.title} Official Trailer`, duration: '3m 15s • 4K Dolby', tag: 'Theatrical Cut' },
                  { title: `${movie.title} Character Glimpse`, duration: '1m 45s • Full HD', tag: 'Character Teaser' },
                  { title: `${movie.title} Behind The Scenes`, duration: '5m 30s • BTS Feature', tag: 'Behind The Scenes' }
                ]).map((vid, idx) => (
                  <div
                    key={idx}
                    onClick={() => onWatchTrailer(movie)}
                    className="group relative rounded-2xl overflow-hidden bg-[#16161a] border border-white/10 hover:border-amber-400/60 cursor-pointer transition-all aspect-video flex flex-col justify-end p-3.5"
                  >
                    <img
                      src={movie.backdropUrl}
                      alt={vid.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform brightness-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Play button icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </div>
                    </div>

                    <div className="relative z-10 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                        {vid.tag}
                      </span>
                      <p className="text-xs font-bold text-white truncate font-display">
                        {vid.title}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {vid.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Legendary Cast & Characters */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#16161a] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Key Legendary Cast & Characters
                </h3>
                <span className="text-xs font-mono text-gray-400">4 Lead Avatars</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {movie.cast.map((member, i) => (
                  <div key={i} className="space-y-2.5 flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#F59E0B]/50 shadow-lg bg-[#111114]">
                      <img
                        src={member.profilePath || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
                        alt={member.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white font-display truncate w-full">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#F59E0B] font-medium truncate w-full">
                        {member.role}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono truncate w-full pt-0.5">
                        {member.characterBadge || 'Key Character'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visionary Creative Team Spotlight */}
            <div className="p-6 rounded-3xl bg-[#16161a] border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Visionary Creative Team Spotlight
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block">Director & Writer</span>
                  <p className="text-sm font-bold text-white font-display">{movie.director}</p>
                  <p className="text-[11px] text-amber-400">National Award Winner</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block">Musical Score</span>
                  <p className="text-sm font-bold text-white font-display">{movie.musicDirector}</p>
                  <p className="text-[11px] text-amber-400">Chartbuster Soundtrack</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block">Cinematography</span>
                  <p className="text-sm font-bold text-white font-display">{movie.cinematographer || 'Director of Photography'}</p>
                  <p className="text-[11px] text-gray-400">{movie.cinematographerNote || '2.39:1 Epic Scope'}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block">Producer & Banner</span>
                  <p className="text-sm font-bold text-white font-display">{movie.producer || 'Leading Studio'}</p>
                  <p className="text-[11px] text-gray-400">{movie.producerNote || 'Major Production House'}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. RECOMMENDATIONS: MORE LIKE THIS */}
      <section className="py-12 bg-[#0c0c0e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display text-white">
              More Like This: {movie.genres[0]} & {movie.language} Cinema
            </h2>
            <p className="text-xs text-gray-400">
              Spectacular world-building, mythological roots, and larger-than-life Indian cinema.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2">
            {recommendations.map((rec) => (
              <MovieCard
                key={rec.id}
                movie={rec}
                onSelect={(m) => {
                  onSelectMovie(m);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onWatchTrailer={onWatchTrailer}
                isWatchlisted={watchlistIds.includes(rec.id)}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
