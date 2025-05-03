import { MultiSearchResult } from "../types/interfaces";

export const getMovies = (
  page: number = 1,
  sortBy: string = "popularity.desc"
) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}&sort_by=${sortBy}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchMovieCredits = (movie_id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

// src/api/tmdb-api.ts

export const getUpcomingMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  );
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return await res.json();
};

export const fetchTvShows = (
  page: number = 1,
  sortBy: string = "popularity.desc"
) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch tv shows. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTvShowDetails = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch tv show detail. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTvShowGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTvShowDetail = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch tv show detail. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTvShowImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch tv images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const fetchMultiSearchResults = (
  query: string,
  page: number = 1,
  includeAdult: boolean = false,
  language: string = "en-US",
  mediaType?: string
) => {
  let url = `https://api.themoviedb.org/3/search/multi?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }&language=${language}&page=${page}&include_adult=${includeAdult}&query=${encodeURIComponent(
    query
  )}`;
  if (mediaType) {
    url += `&media_type=${mediaType}`;
  }
  return fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch multi search results. Response status: ${response.status}`
        );
      return response.json();
    })
    .then((data) => {
      if (mediaType) {
        data.results = data.results.filter(
          (item: MultiSearchResult) => item.media_type === mediaType
        );
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchActors = (page: number = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch actors. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchActorDetails = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch actor details. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchActorImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.profiles)
    .catch((error) => {
      throw error;
    });
};

export const fetchKnownFor = (actorId: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch actors known for movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .then((json) => json.cast)
    .catch((error) => {
      throw error;
    });
};
