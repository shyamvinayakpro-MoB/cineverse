import React from 'react';
import { Globe, ArrowRight, Sparkles, Film } from 'lucide-react';
import { MovieLanguage } from '../types/movie';

interface LanguageHubsProps {
  onSelectLanguage: (lang: MovieLanguage) => void;
  selectedLanguage: MovieLanguage;
}

export const LanguageHubs: React.FC<LanguageHubsProps> = ({
  onSelectLanguage,
  selectedLanguage
}) => {
  const hubs = [
    {
      id: 'malayalam',
      name: 'Malayalam Cinema',
      alias: 'Mollywood',
      lang: 'Malayalam' as MovieLanguage,
      description: 'Masterful storytelling, realistic drama, and technical brilliance.',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&auto=format&fit=crop&q=80',
      badge: 'Golden Era',
      accentColor: 'from-emerald-600 to-teal-800',
      borderColor: 'hover:border-emerald-500'
    },
    {
      id: 'tamil',
      name: 'Tamil Cinema',
      alias: 'Kollywood',
      lang: 'Tamil' as MovieLanguage,
      description: 'Visionary auteur directors, high-voltage action, and mass anthems.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      badge: 'High Voltage',
      accentColor: 'from-amber-600 to-orange-800',
      borderColor: 'hover:border-amber-500'
    },
    {
      id: 'telugu',
      name: 'Telugu Cinema',
      alias: 'Tollywood',
      lang: 'Telugu' as MovieLanguage,
      description: 'Monumental pan-Indian epics, mythic scale, and roaring heroism.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
      badge: 'Epic Spectacles',
      accentColor: 'from-red-600 to-rose-900',
      borderColor: 'hover:border-red-500'
    },
    {
      id: 'hindi',
      name: 'Hindi Cinema',
      alias: 'Bollywood',
      lang: 'Hindi' as MovieLanguage,
      description: 'Pan-Indian stars, heartfelt romance, and timeless commercial sagas.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      badge: 'Classic Heritage',
      accentColor: 'from-purple-600 to-indigo-900',
      borderColor: 'hover:border-purple-500'
    },
    {
      id: 'kannada',
      name: 'Kannada Cinema',
      alias: 'Sandalwood',
      lang: 'Kannada' as MovieLanguage,
      description: 'Raw cultural intensity, divine folklore, and groundbreaking franchises.',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
      badge: 'Divine Roots',
      accentColor: 'from-yellow-600 to-amber-900',
      borderColor: 'hover:border-yellow-500'
    }
  ];

  const handleHubClick = (lang: MovieLanguage) => {
    onSelectLanguage(lang);
    const catElem = document.querySelector('#categories');
    if (catElem) {
      catElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-12 sm:py-16 bg-[#080808] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                Cinemas of India – Regional Hubs
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Explore the rich cultural tapestry, distinct storytelling, and legendary icons of each region.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleHubClick('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedLanguage === 'All'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              All Industries
            </button>
          </div>
        </div>

        {/* Hub Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              onClick={() => handleHubClick(hub.lang)}
              className={`group relative rounded-2xl overflow-hidden p-5 cursor-pointer border bg-[#121212] transition-all duration-300 flex flex-col justify-between min-h-[190px] ${hub.borderColor} ${
                selectedLanguage === hub.lang
                  ? 'ring-2 ring-amber-400 border-transparent shadow-xl shadow-amber-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${hub.accentColor} opacity-20 group-hover:opacity-35 transition-opacity`} />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              {/* Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-amber-300 border border-white/10">
                  {hub.badge}
                </span>
                <Film className="w-4 h-4 text-white/50 group-hover:text-amber-400 transition-colors" />
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1 pt-4">
                <h3 className="font-extrabold text-lg text-white group-hover:text-amber-200 transition-colors">
                  {hub.name}
                </h3>
                <span className="text-xs font-bold text-amber-400 block -mt-0.5">
                  {hub.alias}
                </span>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {hub.description}
                </p>

                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors">
                  <span>Explore Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
