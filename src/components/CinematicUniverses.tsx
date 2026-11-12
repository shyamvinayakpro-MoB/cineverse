import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Film } from 'lucide-react';
import { MovieLanguage } from '../types/movie';

interface CinematicUniversesProps {
  onSelectUniverse: (universeId: string, lang?: MovieLanguage) => void;
}

export const CinematicUniverses: React.FC<CinematicUniversesProps> = ({
  onSelectUniverse
}) => {
  const universes = [
    {
      id: 'lcu',
      title: 'Lokesh Cinematic Universe (LCU)',
      subtitle: 'Action • Dark Crime',
      description: 'Lethal cartels, phantom vigilantes, and interconnected night-time wars.',
      films: 'Vikram • Kaithi • Leo',
      countText: 'Explore 4 Films',
      lang: 'Tamil' as MovieLanguage,
      backdrop: 'https://image.tmdb.org/t/p/w1280/1X7vZhR1w0D0wJ0m9c8v6u2Y4L3.jpg',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'mollywood-wave',
      title: 'Mollywood Golden Wave',
      subtitle: 'Pioneering Realism & Screenplay',
      description: 'Globally celebrated character studies, grounded suspense, and authentic atmosphere.',
      films: 'Manjummel Boys • Bramayugam • Aavesham • Lucifer',
      countText: 'Explore 18 Films',
      lang: 'Malayalam' as MovieLanguage,
      backdrop: 'https://image.tmdb.org/t/p/w1280/8ZsnqI1y0oK5j9wA9pQ8x1oK6kL.jpg',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'mythos-epics',
      title: 'Mythos & Folktale Epics',
      subtitle: 'Epic Grandeur & Divine Lore',
      description: 'Ancient folklore, avatar prophecies, and epochal visual achievements.',
      films: 'Kalki 2898 AD • Kantara • Baahubali 2 • RRR',
      countText: 'Explore 12 Films',
      lang: 'Telugu' as MovieLanguage,
      backdrop: 'https://image.tmdb.org/t/p/w1280/tE07KzL4gXFfK1K0r3u6dO9W1hN.jpg',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <section id="universes-section" className="py-12 bg-[#0c0c0e] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
              Curated Universes
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Iconic Indian Cinematic Universes
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Immerse yourself in interconnected franchises, generational waves, and visionary sagas.
          </p>
        </div>

        {/* 3-Column Universe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universes.map((uni) => (
            <div
              key={uni.id}
              onClick={() => onSelectUniverse(uni.id, uni.lang)}
              className="group relative rounded-3xl overflow-hidden bg-[#16161a] border border-white/10 hover:border-[#F59E0B]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[300px] shadow-xl hover:-translate-y-1"
            >
              {/* Backdrop image with darkness mask */}
              <div className="absolute inset-0">
                <img
                  src={uni.backdrop}
                  alt={uni.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-[#16161a]/70 to-transparent" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${uni.badgeColor}`}>
                  {uni.subtitle}
                </span>
                <Layers className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-6 space-y-2">
                <h3 className="font-display font-extrabold text-xl text-white group-hover:text-amber-300 transition-colors">
                  {uni.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {uni.description}
                </p>
                <p className="text-[11px] font-mono text-amber-400 pt-1">
                  {uni.films}
                </p>

                <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  <span>{uni.countText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
