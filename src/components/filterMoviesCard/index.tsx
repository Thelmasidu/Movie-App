import React, { ChangeEvent } from "react";
import { GenreData } from "../../types/interfaces";
import { Box, SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { FilterMoviesCardProps, sortOptions } from "./filterData";

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
  currentSort,
  onUserInput,
  onSortChange,
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: 0, name: "All" });
  }

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    onUserInput("genre", e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value as string);
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterAltIcon fontSize="large" />
            <Typography variant="h5" component="h1">
              Filter the movies.
            </Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            <TextField
              fullWidth
              id="search-title"
              label="Search by title"
              type="search"
              value={titleFilter}
              variant="filled"
              onChange={handleTextInputChange}
              sx={{ my: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={genreFilter}
                onChange={handleGenreChange}
                label="Genre"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <SortIcon fontSize="large" />
            <Typography variant="h5" component="h1">
              Sort the movies.
            </Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={currentSort}
              onChange={handleSortChange}
              label="Sort By"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
