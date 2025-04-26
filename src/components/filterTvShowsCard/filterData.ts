import { FilterOption } from "../../types/interfaces";

export const sortOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "first_air_date.desc", label: "Air Date (Newest First)" },
  { value: "first_air_date.asc", label: "Air Date (Oldest First)" },
  { value: "name.asc", label: "Name (A-Z)" },
  { value: "name.desc", label: "Name (Z-A)" },
  { value: "vote_count.asc", label: "Vote Count (Low to High)" },
  { value: "vote_count.desc", label: "Vote Count (High to Low)" },
  { value: "vote_average.asc", label: "Average Rating (Low to High)" },
  { value: "vote_average.desc", label: "Average Rating (High to Low)" },
];

export interface FilterTvShowsCardProps {
  onUserInput: (filterType: FilterOption, value: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (sortValue: string) => void;
  currentSort: string;
}
