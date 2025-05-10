import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { TVShowDetail } from "../../types/interfaces";

interface TvShowDetailsProps {
  show: TVShowDetail;
}

const TvShowDetail: React.FC<TvShowDetailsProps> = ({ show }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSeasonClick = (seasonNumber: number) => {
    navigate(`/season/${show.id}/${seasonNumber}`);
  };

  return (
    <Box sx={{ mt: theme.spacing(3) }}>
      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Overview" color="primary" />
      </Divider>
      <Typography variant="body1" sx={{ my: theme.spacing(2) }}>
        {show.overview}
      </Typography>

      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Genres" color="primary" />
      </Divider>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{ my: theme.spacing(2) }}
        flexWrap="wrap"
      >
        {show.genres.map((g) => (
          <Chip key={g.id} label={g.name} variant="outlined" />
        ))}
      </Stack>

      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Production Countries" color="primary" />
      </Divider>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{ my: theme.spacing(2) }}
        flexWrap="wrap"
      >
        {show.production_countries.map((pc) => (
          <Chip key={pc.iso_3166_1} label={pc.name} variant="outlined" />
        ))}
      </Stack>

      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Companies & Networks" color="primary" />
      </Divider>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ my: theme.spacing(2) }}
        flexWrap="wrap"
      >
        {show.production_companies.map((pc) => (
          <Chip
            key={pc.id}
            label={pc.name}
            avatar={
              pc.logo_path ? (
                <Avatar
                  src={`https://image.tmdb.org/t/p/w400/${pc.logo_path}`}
                  alt={pc.name}
                />
              ) : undefined
            }
            variant="outlined"
          />
        ))}
        {show.networks.map((n) => (
          <Chip
            key={n.id}
            label={n.name}
            avatar={
              n.logo_path ? (
                <Avatar
                  src={`https://image.tmdb.org/t/p/w400/${n.logo_path}`}
                  alt={n.name}
                />
              ) : undefined
            }
            variant="outlined"
          />
        ))}
      </Stack>

      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Air Dates" color="primary" />
      </Divider>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ my: theme.spacing(2) }}
        flexWrap="wrap"
      >
        <Chip label={`First Air: ${show.first_air_date}`} />
        <Chip label={`Last Air: ${show.last_air_date}`} />
        <Chip label={`In Production: ${show.in_production ? "Yes" : "No"}`} />
        <Chip label={`Episodes: ${show.number_of_episodes}`} />
        <Chip label={`Seasons: ${show.number_of_seasons}`} />
        <Chip label={`Language: ${show.original_language.toUpperCase()}`} />
      </Stack>

      <Divider sx={{ mb: theme.spacing(2) }}>
        <Chip label="Seasons" color="primary" />
      </Divider>
      <Grid container spacing={2} sx={{ my: theme.spacing(2) }}>
        {show.seasons.map((season) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={season.id}>
            <Card
              sx={{
                cursor: "pointer",
                height: "100%",
                borderColor: theme.palette.divider,
              }}
              onClick={() => handleSeasonClick(season.season_number)}
              variant="outlined"
            >
              <CardHeader
                avatar={
                  season.poster_path ? (
                    <Avatar
                      src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
                      alt={season.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : undefined
                }
                title={
                  <Typography variant="subtitle1">{season.name}</Typography>
                }
                subheader={`Episodes: ${season.episode_count}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TvShowDetail;
