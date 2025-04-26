import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

import Spinner from "../spinner";
import { getGenres } from "../../api/tmdb-api";
import { GenreData } from "../../types/interfaces";
import { FilterTvShowsCardProps, sortOptions } from "./filterData";

const FilterTVShowsCard: React.FC<FilterTvShowsCardProps> = ({
  onUserInput,
  titleFilter,
  genreFilter,
  currentSort,
  onSortChange,
}) => {
  const {
    data: genreData,
    error,
    isLoading,
    isError,
  } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const genreOptions = genreData?.genres || [];
  if (genreOptions[0]?.name !== "All") {
    genreOptions.unshift({ id: 0, name: "All" });
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    onUserInput("genre", e.target.value);
  };

  return (
    <>
      {/* Filter Card */}
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FilterAltIcon fontSize="large" />
            <Typography variant="h5" component="h1" sx={{ ml: 1 }}>
              Filter TV Shows
            </Typography>
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Search by Title"
              type="search"
              variant="filled"
              value={titleFilter}
              onChange={handleTitleChange}
              sx={{ my: 2 }}
            />

            <FormControl fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={genreFilter}
                label="Genre"
                onChange={handleGenreChange}
              >
                {genreOptions.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Sort Card */}
      <Card variant="outlined" sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SortIcon fontSize="large" />
            <Typography variant="h5" component="h1" sx={{ ml: 1 }}>
              Sort TV Shows
            </Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={currentSort}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterTVShowsCard;
