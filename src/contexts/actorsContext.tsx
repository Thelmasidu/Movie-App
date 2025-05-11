/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Actors } from "../types/interfaces";

interface ActorContextInterface {
  favouriteActors: number[];
  addActorsToFavourite: (actor: Actors) => void;
  removeActorsFromFavourite: (actor: Actors) => void;
}

const initialContextState: ActorContextInterface = {
  favouriteActors: [],
  addActorsToFavourite: (actor) => {
    actor.id;
  },
  removeActorsFromFavourite: (actor) => {
    actor.id;
  },
};

export const ActorsContext =
  React.createContext<ActorContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favouriteActors, setFavouriteActors] = useState<number[]>([]);

  const addActorsToFavourite = (actor: Actors) => {
    const updatedFavouriteActors = [...favouriteActors];
    if (!favouriteActors.includes(actor.id)) {
      updatedFavouriteActors.push(actor.id);
    }
    setFavouriteActors(updatedFavouriteActors);
  };

  const removeActorsFromFavourite = (actor: Actors) => {
    setFavouriteActors(favouriteActors.filter((aId) => aId !== actor.id));
  };

  return (
    <ActorsContext.Provider
      value={{
        addActorsToFavourite,
        favouriteActors,
        removeActorsFromFavourite,
      }}
    >
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;