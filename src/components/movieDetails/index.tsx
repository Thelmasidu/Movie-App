import React, { useState } from "react";
import { Box, Chip, Divider } from "@mui/material";
import { Fab, Grid, Stack, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import StarRateIcon from "@mui/icons-material/StarRate";
import MovieReviews from "../movieReviews";
import { MovieDetailsProps } from "../../types/interfaces";
import {
  BudgetText,
  CenteredText,
  OverviewText,
  SectionTitle,
  StyledPaper,
} from "./MovieDetails.styled";

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box>
      <StyledPaper>
        <SectionTitle variant="h5" gutterBottom>
          Overview
        </SectionTitle>
        <OverviewText variant="body1" paragraph>
          {movie.overview}
        </OverviewText>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Chip
              icon={<AccessTimeIcon />}
              label={`Movie Runtime: ${movie.runtime} min`}
              color="primary"
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<MonetizationIcon />}
              label={`Revenue: $${movie.revenue.toLocaleString()}`}
              color="success"
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<StarRateIcon />}
              label={`${movie.vote_average} (${movie.vote_count} votes)`}
              color="warning"
            />
          </Grid>
          <Grid item>
            <Chip label={`Released: ${movie.release_date}`} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <CenteredText variant="h6" gutterBottom>
          Genres
        </CenteredText>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {movie.genres.map((g) => (
            <Chip key={g.id} label={g.name} variant="outlined" />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <CenteredText variant="h6" gutterBottom>
          Original Title & Language
        </CenteredText>
        <CenteredText variant="body2">
          <strong>Original Title:</strong> {movie.original_title}
        </CenteredText>
        <CenteredText variant="body2">
          <strong>Original Language:</strong>{" "}
          {movie.original_language.toUpperCase()}
        </CenteredText>

        <Divider sx={{ my: 3 }} />

        <CenteredText variant="h6" gutterBottom>
          Spoken Languages
        </CenteredText>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {movie.spoken_languages.map((lang) => (
            <Chip key={lang.iso_639_1} label={lang.english_name} />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <CenteredText variant="h6" gutterBottom>
          Production Countries
        </CenteredText>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {movie.production_countries.map((country) => (
            <Chip key={country.iso_3166_1} label={country.name} />
          ))}
        </Stack>

        {movie.budget > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <BudgetText variant="body2">
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </BudgetText>
          </>
        )}
      </StyledPaper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1300,
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { p: 4, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reviews for {movie.title}
        </Typography>
        <MovieReviews {...movie} />
      </Drawer>
    </Box>
  );
};

export default MovieDetails;
