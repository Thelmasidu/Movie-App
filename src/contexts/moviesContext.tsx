/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback } from "react";
import { BaseMovieProps, Actors } from "../types/interfaces";
import { Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  favouriteActors: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  addActorsToFavourite: (actor: Actors) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  removeActorsFromFavourite: (actor: Actors) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  addToMustWatch: (movie: BaseMovieProps) => void;
  mustWatch: number[];
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  favouriteActors: [],
  addToFavourites: () => {},
  addActorsToFavourite: (actor) => {
    actor.id;
  },
  removeFromFavourites: () => {},
  removeActorsFromFavourite: (actor) => {
    actor.id;
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
  const [favouriteActors, setFavouriteActors] = useState<number[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) =>
      !prev.includes(movie.id) ? [...prev, movie.id] : prev
    );
  }, []);

  const addActorsToFavourite = (actor: Actors) => {
    const updatedFavouriteActors = [...favouriteActors];
    if (!favouriteActors.includes(actor.id)) {
      updatedFavouriteActors.push(actor.id);
    }
    setFavouriteActors(updatedFavouriteActors);
  };

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const removeActorsFromFavourite = (actor: Actors) => {
    setFavouriteActors(favouriteActors.filter((aId) => aId !== actor.id));
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
        addActorsToFavourite,
        favouriteActors,
        removeActorsFromFavourite,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
