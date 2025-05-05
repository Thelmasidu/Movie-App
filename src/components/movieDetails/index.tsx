import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; 
import CardActionArea from "@mui/material/CardActionArea";
import {
  Box,
  Chip,
  Divider,
  Fab,
  Grid,
  Stack,
  Typography,
  Drawer,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import StarRateIcon from "@mui/icons-material/StarRate";
import MovieReviews from "../movieReviews";
import { CastMember, MovieDetailsProps } from "../../types/interfaces";
import {
  BudgetText,
  CenteredText,
  OverviewText,
  SectionTitle,
  StyledPaper,
} from "./movieDetails.styled";

export interface MovieDetailsComponentProps {
  movie: MovieDetailsProps;
  cast: CastMember[];
}

const MovieDetails: React.FC<MovieDetailsComponentProps> = ({
  movie,
  cast,
}) => {
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

        <Divider sx={{ my: 4 }} />

        <CenteredText variant="h5" gutterBottom>
          Top Cast
        </CenteredText>
        <Grid container spacing={3} justifyContent="center">
          {cast.slice(0, 12).map((actor) => (
            <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/actors/${actor.id}`}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={actor.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      noWrap
                    >
                      {actor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      noWrap
                    >
                      as {actor.character}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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

      <Box mt={4} textAlign="center">
        <Fab
          variant="extended"
          color="primary"
          component={RouterLink}
          to={`/movies/similar-movies/${movie.id}`}
          sx={{ borderRadius: 3 }}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Go to Similar Movies
        </Fab>
      </Box>

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