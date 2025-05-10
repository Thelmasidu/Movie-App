/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { BaseTvShowProps } from "../types/interfaces";

interface TvContextInterface {
  favouriteShows: number[];
  addToFavouriteShows: (show: BaseTvShowProps) => void;
  removeShowsFromFavourites: (movie: BaseTvShowProps) => void;
}

const initialContextState: TvContextInterface = {
  favouriteShows: [],
  addToFavouriteShows: (show) => {
    show.id;
  },
  removeShowsFromFavourites: (show) => {
    show.id;
  },
};

export const TvShowsContext =
  React.createContext<TvContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favouriteShows, setFavouriteShows] = useState<number[]>([]);

  const addToFavouriteShows = (show: BaseTvShowProps) => {
    const updatedFavouriteShows = [...favouriteShows];
    if (!favouriteShows.includes(show.id)) {
      updatedFavouriteShows.push(show.id);
    }
    setFavouriteShows(updatedFavouriteShows);
  };

  const removeShowsFromFavourites = (show: BaseTvShowProps) => {
    setFavouriteShows(favouriteShows.filter((sId) => sId !== show.id));
  };

  return (
    <TvShowsContext.Provider
      value={{
        favouriteShows,
        addToFavouriteShows,
        removeShowsFromFavourites,
      }}
    >
      {children}
    </TvShowsContext.Provider>
  );
};

export default TvShowsContextProvider;
