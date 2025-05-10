import React from "react";
import { Home as HomeIcon } from "@mui/icons-material";
import { Typography, IconButton, Paper } from "@mui/material";
import { MovieDetailsProps } from "../../types/interfaces";
import { styles } from "./HeaderMovie.styled";

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  return (
    <Paper elevation={3} sx={styles.root}>
      <Typography variant="h4" component="h3" sx={styles.title}>
        {movie.title}
        {movie.homepage && (
          <IconButton
            href={movie.homepage}
            target="_blank"
            color="primary"
            size="large"
          >
            <HomeIcon />
          </IconButton>
        )}
      </Typography>

      <Typography variant="subtitle1" sx={styles.tagline}>
        {movie.tagline}
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
