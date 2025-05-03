import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Link,
  CardActionArea,
  Container,
} from "@mui/material";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ActorsDetails } from "../../types/interfaces";
import { fetchKnownFor } from "../../api/tmdb-api";

interface ActorDetailsProps {
  actor: ActorsDetails;
}

interface KnownForItem {
  id: number;
  poster_path: string;
  title: string;
  character: string;
}

const ActorDetails: React.FC<ActorDetailsProps> = ({ actor }) => {
  const navigate = useNavigate();
  const { data: knownFor } = useQuery<KnownForItem[], Error>(
    ["known_for", actor.id],
    () => fetchKnownFor(`${actor.id}`)
  );

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const getAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const displayBirthday = actor.birthday
    ? `${formatDate(actor.birthday)} (${getAge(actor.birthday)} years old)`
    : "N/A";

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <CardMedia
          component="img"
          sx={{
            width: 180,
            height: 240,
            objectFit: "cover",
            borderRadius: 4,
            mx: "auto",
            mb: 2,
            boxShadow: 3,
          }}
          image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
        />
        <Typography variant="h4" gutterBottom>
          {actor.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {actor.known_for_department}
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
          <Chip label={`Popularity: ${actor.popularity.toFixed(1)}`} />
          <Chip label={`Adult: ${actor.adult ? "Yes" : "No"}`} />
        </Stack>
      </Box>

      {/* Biography */}
      <Box mb={6}>
        <Typography variant="h6" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {actor.biography || "Biography not available."}
        </Typography>
      </Box>

      {/* Metadata Grid */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Gender</Typography>
            <Typography variant="body2">
              {actor.gender === 1 ? "Female" : "Male"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Birthday</Typography>
            <Typography variant="body2">{displayBirthday}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Birthplace</Typography>
            <Typography variant="body2">
              {actor.place_of_birth || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Died</Typography>
            <Typography variant="body2">
              {actor.deathday ? formatDate(actor.deathday) : "N/A"}
            </Typography>
          </Grid>
          {actor.imdb_id && (
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">IMDb</Typography>
              <Link
                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                target="_blank"
                rel="noopener"
              >
                View IMDb Profile
              </Link>
            </Grid>
          )}
          {actor.homepage && (
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Website</Typography>
              <Link href={actor.homepage} target="_blank" rel="noopener">
                Visit Website
              </Link>
            </Grid>
          )}
          {actor.also_known_as.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Also Known As</Typography>
              <Typography variant="body2">
                {actor.also_known_as.join(", ")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Known For
        </Typography>
        <Grid container spacing={3}>
          {knownFor &&
            knownFor.length > 0 &&
            knownFor.slice(0, 8).map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleMovieClick(item.id)}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.character}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ActorDetails;
