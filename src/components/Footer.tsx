import React from 'react';
import { 
  Film, 
  Heart, 
  Globe, 
  Mail,
  ShieldCheck,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { MovieLanguage } from '../types/movie';

interface FooterProps {
  onSelectLanguage: (lang: MovieLanguage) => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectLanguage, 
  onOpenSearch,
  onOpenWatchlist
}) => {
  return (
    <footer className="bg-[#050507] text-gray-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E50914] via-[#F59E0B] to-[#F97316] p-0.5 shadow-lg shadow-red-950/50">
                <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black tracking-wider text-white">
                  CINE<span className="text-[#F59E0B]">VERSE</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#F59E0B] uppercase font-semibold">
                  Indian Cinema Elite
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              CineVerse is the premier cinematic discovery destination celebrating Indian Cinema. From the grounded mastery of Malayalam cinema to the grand spectacles of Telugu and Tamil, the heartfelt charm of Hindi, and the divine folklore of Kannada.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs font-bold"
                aria-label="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-pink-400 transition-all text-xs"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all text-xs"
                aria-label="YouTube"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs"
                aria-label="GitHub"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
              </a>
            </div>
          </div>

          {/* Regional Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Regional Industries
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectLanguage('Malayalam')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Malayalam (Mollywood)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLanguage('Tamil')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Tamil (Kollywood)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLanguage('Telugu')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Telugu (Tollywood)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLanguage('Hindi')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Hindi (Bollywood)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLanguage('Kannada')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Kannada (Sandalwood)
                </button>
              </li>
            </ul>
          </div>

          {/* Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Discovery
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#trending-section" className="hover:text-amber-400 transition-colors">
                  Trending Now
                </a>
              </li>
              <li>
                <a href="#upcoming-section" className="hover:text-amber-400 transition-colors">
                  Anticipated Releases
                </a>
              </li>
              <li>
                <a href="#toprated-section" className="hover:text-amber-400 transition-colors">
                  IMDb Top Rated 250
                </a>
              </li>
              <li>
                <a href="#universes-section" className="hover:text-amber-400 transition-colors">
                  Cinematic Universes
                </a>
              </li>
              <li>
                <button onClick={onOpenWatchlist} className="hover:text-amber-400 transition-colors text-left">
                  My Saved Watchlist
                </button>
              </li>
            </ul>
          </div>

          {/* CineVerse Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              CineVerse Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About CineVerse</li>
              <li className="hover:text-white cursor-pointer">TMDB API Attribution</li>
              <li className="hover:text-white cursor-pointer">Editorial Guidelines</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2025 CineVerse Inc. Crafted for Indian Cinema aficionados worldwide. Data powered by TMDB.</p>
          
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Dark Theme (Active)
            </span>
            <span>•</span>
            <span className="text-gray-400">English (Global)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
