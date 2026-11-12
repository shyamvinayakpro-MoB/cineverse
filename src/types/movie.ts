export type MovieLanguage = 'Malayalam' | 'Tamil' | 'Telugu' | 'Hindi' | 'Kannada' | 'All';

export type MovieGenre =
  | 'Action'
  | 'Thriller'
  | 'Drama'
  | 'Comedy'
  | 'Sci-Fi'
  | 'Horror'
  | 'Crime'
  | 'Romance'
  | 'Adventure'
  | 'Mythological'
  | 'Mystery'
  | 'Classic';

export interface CastMember {
  name: string;
  role: string;
  characterBadge?: string;
  profilePath?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number; // e.g. 8.6 out of 10
  voteCount: number;
  releaseDate: string; // YYYY-MM-DD
  year: number;
  runtime: number; // minutes
  language: 'Malayalam' | 'Tamil' | 'Telugu' | 'Hindi' | 'Kannada';
  genres: string[];
  director: string;
  musicDirector: string;
  cast: CastMember[];
  trailerYoutubeId: string; // e.g. 'kQDd1AhGIHk'
  certification?: string; // 'U', 'U/A', 'A'
  isUpcoming?: boolean;
  isTrending?: boolean;
  isTopRated?: boolean;
  isLatest?: boolean;
  isClassic?: boolean;
  isBlockbuster?: boolean;
  isSouthIndian?: boolean;
  budget?: string;
  boxOffice?: string;
  premiseTitle?: string;
  synopsisP2?: string;
  synopsisP3?: string;
  universeBadge?: string;
  recordBadge?: string;
  specialFormat?: string;
  directorNote?: string;
  musicNote?: string;
  cinematographer?: string;
  cinematographerNote?: string;
  producer?: string;
  producerNote?: string;
  boxOfficeNote?: string;
  boxOfficeTargetPercent?: number;
  domesticGross?: string;
  overseasGross?: string;
  statusBadge?: string;
  tomatometer?: string;
  pulseScore?: string;
  teasers?: Array<{ title: string; duration?: string; dur?: string; tag: string; ytId?: string }>;
  streaming?: Array<{ service: string; code: string; bg?: string; specs: string; link: string; actionText?: string }>;
  techSpecs?: { masterAudio?: string; aspectRatio?: string; digitalIntermediate?: string; budget?: string; locations?: string; subtitles?: string };
  hashtags?: string[];
  countdownDays?: string;
}

export type SortOption = 'popularity' | 'rating' | 'releaseDate' | 'title';

export interface FilterState {
  searchQuery: string;
  language: MovieLanguage;
  genre: string;
  yearRange: string;
  sortBy: SortOption;
}
