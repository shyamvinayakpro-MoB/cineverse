import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Film, AlertCircle, Play } from 'lucide-react';
import { Movie } from '../types/movie';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ movie, onClose }) => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${movie.trailerYoutubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#121215] border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#16161a]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base font-display">
                {movie.title} – Official HD Trailer
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                {movie.language} Cinema • {movie.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F59E0B] text-black font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              aria-label="Close Trailer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player 16:9 Aspect Ratio */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={embedUrl}
            title={`${movie.title} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setLoadError(true)}
            className="w-full h-full border-0"
          />

          {loadError && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
              <AlertCircle className="w-10 h-10 text-amber-400" />
              <p className="text-sm text-white font-bold">
                Playback restricted by browser privacy or network settings.
              </p>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open Trailer Directly on YouTube</span>
              </a>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="px-5 py-3 bg-[#0e0e11] flex flex-wrap items-center justify-between text-xs text-gray-400 border-t border-white/5">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Director: <strong className="text-white">{movie.director}</strong></span>
            <span>•</span>
            <span>Music: <strong className="text-amber-400">{movie.musicDirector}</strong></span>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
          >
            <span>Having audio/playback issues? Click here to launch YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
