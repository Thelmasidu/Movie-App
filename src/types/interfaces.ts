export type FilterOption = "title" | "genre";

export interface Genre {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;  
    genre_ids?: number[];
    upComing: number;
  }

  export interface ListedMovie extends BaseMovieProps {
    genre_ids: number[];
  }

  export interface BaseMovieListProps { 
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }   

  export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  }

  export interface MovieDetailsProps extends BaseMovieProps {
    original_title: string;
    genres: Genre[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
  }
  
  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }  
  
  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
    page: number;
    totalPages?: number;
    onPrevious: () => void;
    onNext: () => void;
    action: (movie: BaseMovieProps) => React.ReactElement;
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
    genres: Genre[];
  }
  
  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface BaseTvShowProps {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    favourite?: boolean;
  }

  export interface People {
    adult: boolean;
    gender: number;
    id: number;
    known_for: KnownFor[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    favourite?: boolean;
  }

  
export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BaseTvShowProps {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  favourite?: boolean;
}

export interface ListedTvShow extends BaseTvShowProps {
  genre_ids: number[];
}

export interface BaseTvShowListProps {
  shows: BaseTvShowProps[];
  action: (m: BaseTvShowProps) => React.ReactNode;
}

export interface TvShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
  page: number;
  totalPages?: number;
  onPrevious: () => void;
  onNext: () => void;
  action: (show: BaseTvShowProps) => React.ReactElement;
}

export interface TVShowDetail {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface ShowT extends TVShowDetail {
  genres: Genre[];
  production_countries: ProductionCountry[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}


export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface DiscoverTvShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}


export interface People {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  favourite?: boolean;
}

export interface PeopleProfileDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

export interface PeopleResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: People[];
}

export interface PeopleListPageTemplateProps {
  people: People[];
  title: string;
  action: (m: People) => React.ReactNode;
  page: number;
  totalPages?: number;
  onPrevious: () => void;
  onNext: () => void;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
