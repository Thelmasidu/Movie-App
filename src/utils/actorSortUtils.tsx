import { Actors, ActorsSortOption } from "../types/interfaces";

export const sortActors = (
  actors: Actors[],
  sortBy: ActorsSortOption
): Actors[] => {
  const sorted = [...actors];

  sorted.sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "popularity-asc":
        return a.popularity - b.popularity;
      case "popularity-desc":
        return b.popularity - a.popularity;
      case "gender-asc":
        return (a.gender ?? 0) - (b.gender ?? 0);
      case "gender-desc":
        return (b.gender ?? 0) - (a.gender ?? 0);
      default:
        return 0;
    }
  });

  return sorted;
};
