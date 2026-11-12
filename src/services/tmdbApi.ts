import { Movie, MovieLanguage } from '../types/movie';
import { INDIAN_MOVIES_DATA } from '../data/indianMoviesData';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Read API key from environment variable safely
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

// ISO 639-1 code to Indian Cinema language mapping
const LANG_MAP: Record<string, 'Malayalam' | 'Tamil' | 'Telugu' | 'Hindi' | 'Kannada'> = {
  ml: 'Malayalam',
  ta: 'Tamil',
  te: 'Telugu',
  hi: 'Hindi',
  kn: 'Kannada'
};

const REV_LANG_MAP: Record<string, string> = {
  Malayalam: 'ml',
  Tamil: 'ta',
  Telugu: 'te',
  Hindi: 'hi',
  Kannada: 'kn'
};

export class MovieApiService {
  private static apiKey: string = TMDB_API_KEY;

  public static setApiKey(key: string) {
    this.apiKey = key.trim();
  }

  public static getApiKey(): string {
    return this.apiKey;
  }

  public static hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  /**
   * Get all local/fallback Indian movies
   */
  public static getOfflineMovies(): Movie[] {
    return INDIAN_MOVIES_DATA;
  }

  /**
   * Search movies across title, director, cast, synopsis
   */
  public static async searchMovies(
    query: string,
    filters?: {
      language?: MovieLanguage;
      genre?: string;
      year?: string;
    }
  ): Promise<{ movies: Movie[]; source: 'tmdb' | 'fallback'; error?: string }> {
    const q = query.trim().toLowerCase();

    // If TMDB API key is provided, attempt TMDB search
    if (this.hasApiKey() && q.length > 1) {
      try {
        const langParam = filters?.language && filters.language !== 'All' ? `&with_original_language=${REV_LANG_MAP[filters.language] || ''}` : '';
        const url = `${TMDB_BASE_URL}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&include_adult=false&region=IN${langParam}`;
        const res = await fetch(url);
        
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const mapped: Movie[] = data.results.map((item: any) => ({
              id: `tmdb-${item.id}`,
              title: item.title,
              originalTitle: item.original_title,
              tagline: item.overview ? item.overview.slice(0, 80) + '...' : '',
              synopsis: item.overview || 'Synopsis not currently available.',
              posterUrl: item.poster_path ? `${TMDB_IMAGE_BASE}/w780${item.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=780',
              backdropUrl: item.backdrop_path ? `${TMDB_IMAGE_BASE}/w1280${item.backdrop_path}` : 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1280',
              rating: Number((item.vote_average || 7.0).toFixed(1)),
              voteCount: item.vote_count || 100,
              releaseDate: item.release_date || '2024-01-01',
              year: item.release_date ? parseInt(item.release_date.split('-')[0]) : 2024,
              runtime: 145,
              language: LANG_MAP[item.original_language] || 'Hindi',
              genres: ['Action', 'Drama'],
              director: 'Acclaimed Director',
              musicDirector: 'Celebrated Composer',
              cast: [{ name: 'Leading Cast', role: 'Protagonist' }],
              trailerYoutubeId: 'kQDd1AhGIHk',
              certification: 'U/A'
            }));

            return { movies: mapped, source: 'tmdb' };
          }
        }
      } catch (err) {
        console.warn('TMDB API request failed, falling back to local dataset', err);
      }
    }

    // Comprehensive offline search across local Indian movies
    let filtered = INDIAN_MOVIES_DATA.filter((m) => {
      if (!q) return true;
      const titleMatch = m.title.toLowerCase().includes(q) || (m.originalTitle && m.originalTitle.toLowerCase().includes(q));
      const directorMatch = m.director.toLowerCase().includes(q);
      const musicMatch = m.musicDirector.toLowerCase().includes(q);
      const castMatch = m.cast.some((c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
      const genreMatch = m.genres.some((g) => g.toLowerCase().includes(q));
      const synopsisMatch = m.synopsis.toLowerCase().includes(q);

      return titleMatch || directorMatch || musicMatch || castMatch || genreMatch || synopsisMatch;
    });

    if (filters?.language && filters.language !== 'All') {
      filtered = filtered.filter((m) => m.language === filters.language);
    }

    if (filters?.genre && filters.genre !== 'All') {
      filtered = filtered.filter((m) => m.genres.some((g) => g.toLowerCase() === filters.genre?.toLowerCase()));
    }

    if (filters?.year && filters.year !== 'All') {
      if (filters.year.includes('s')) {
        // e.g. "1970s", "2010s"
        const decadeStart = parseInt(filters.year);
        filtered = filtered.filter((m) => m.year >= decadeStart && m.year < decadeStart + 10);
      } else {
        const targetYear = parseInt(filters.year);
        filtered = filtered.filter((m) => m.year === targetYear);
      }
    }

    return { movies: filtered, source: 'fallback' };
  }

  /**
   * Get movie details by ID
   */
  public static async getMovieDetails(id: string): Promise<Movie | null> {
    const local = INDIAN_MOVIES_DATA.find((m) => m.id === id);
    if (local) return local;

    // Check if it's a TMDB ID
    if (id.startsWith('tmdb-') && this.hasApiKey()) {
      const tmdbId = id.replace('tmdb-', '');
      try {
        const url = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${this.apiKey}&append_to_response=credits,videos`;
        const res = await fetch(url);
        if (res.ok) {
          const d = await res.json();
          const director = d.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Director';
          const music = d.credits?.crew?.find((c: any) => c.job === 'Original Music Composer' || c.job === 'Music')?.name || 'Composer';
          const trailer = d.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')?.key || 'kQDd1AhGIHk';

          const mapped: Movie = {
            id,
            title: d.title,
            originalTitle: d.original_title,
            tagline: d.tagline,
            synopsis: d.overview,
            posterUrl: `${TMDB_IMAGE_BASE}/w780${d.poster_path}`,
            backdropUrl: `${TMDB_IMAGE_BASE}/w1280${d.backdrop_path}`,
            rating: Number(d.vote_average.toFixed(1)),
            voteCount: d.vote_count,
            releaseDate: d.release_date,
            year: parseInt(d.release_date?.split('-')[0]) || 2024,
            runtime: d.runtime || 150,
            language: LANG_MAP[d.original_language] || 'Hindi',
            genres: d.genres?.map((g: any) => g.name) || ['Drama'],
            director,
            musicDirector: music,
            cast: d.credits?.cast?.slice(0, 6).map((c: any) => ({
              name: c.name,
              role: c.character,
              profilePath: c.profile_path ? `${TMDB_IMAGE_BASE}/w185${c.profile_path}` : undefined
            })) || [],
            trailerYoutubeId: trailer,
            certification: 'U/A'
          };
          return mapped;
        }
      } catch (err) {
        console.error('Error fetching TMDB movie details', err);
      }
    }

    return null;
  }

  /**
   * Get similar movies based on language & genre
   */
  public static getSimilarMovies(movie: Movie): Movie[] {
    return INDIAN_MOVIES_DATA.filter((m) => m.id !== movie.id && (m.language === movie.language || m.genres.some((g) => movie.genres.includes(g)))).slice(0, 8);
  }
}
