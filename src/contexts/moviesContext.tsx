/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback } from "react";
import { BaseMovieProps, BaseTvShowProps, People } from "../types/interfaces";
import { Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  favouriteShows: number[];
  favouritePeople: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  addToFavouriteShows: (show: BaseTvShowProps) => void;
  addToFavouritePeople: (person: People) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  removeShowsFromFavourites: (movie: BaseTvShowProps) => void;
  removeFromFavouritePeople: (people: People) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  addToMustWatch: (movie: BaseMovieProps) => void;
  mustWatch: number[];
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  favouriteShows: [],
  favouritePeople: [],
  addToFavourites: () => {},
  addToFavouriteShows: (show) => {
    show.id;
  },
  addToFavouritePeople: (person) => {
    person.id;
  },
  removeFromFavourites: () => {},
  removeShowsFromFavourites: (show) => {
    show.id;
  },
  removeFromFavouritePeople: (person) => {
    person.id;
  },
  addReview: () => {},
  mustWatch: [],
  addToMustWatch: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [favouriteShows, setFavouriteShows] = useState<number[]>([]);
  const [favouritePeople, setFavouritePeople] = useState<number[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) =>
      !prev.includes(movie.id) ? [...prev, movie.id] : prev
    );
  }, []);

  const addToFavouritePeople = (person: People) => {
    const updatedFavouritePeople = [...favouritePeople];
    if (!favouritePeople.includes(person.id)) {
      updatedFavouritePeople.push(person.id);
    }
    setFavouritePeople(updatedFavouritePeople);
  };

  const addToFavouriteShows = (show: BaseTvShowProps) => {
    const updatedFavouriteShows = [...favouriteShows];
    if (!favouriteShows.includes(show.id)) {
      updatedFavouriteShows.push(show.id);
    }
    setFavouriteShows(updatedFavouriteShows);
  };

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const removeShowsFromFavourites = (show: BaseTvShowProps) => {
    setFavouriteShows(favouriteShows.filter((sId) => sId !== show.id));
  };

  const removeFromFavouritePeople = (person: People) => {
    setFavouritePeople(favouritePeople.filter((aId) => aId !== person.id));
  };

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => {
      const updated = [...new Set([...prev, movie.id])];
      console.log("Must Watch List:", updated); // To confirm functionality
      return updated;
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
        favouriteShows,
        addToFavouriteShows,
        removeShowsFromFavourites,
        addToFavouritePeople,
        favouritePeople,
        removeFromFavouritePeople,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
