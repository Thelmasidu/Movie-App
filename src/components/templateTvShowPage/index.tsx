import React from "react";
import TvShowHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { fetchTvShowImages } from "../../api/tmdb-api";
import { MovieImage, TVShowDetail } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Box } from "@mui/material";

interface TemplateTvShowPageProps {
  show: TVShowDetail;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateTvShowPageProps> = ({
  show,
  children,
}) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", show.id],
    () => fetchTvShowImages(show.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as MovieImage[];

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 } }}>
      <TvShowHeader {...show} />

      <Grid item xs={9}>
        {children}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ImageList cols={4} gap={8}>
            {images.map((image: MovieImage) => (
              <ImageListItem key={image.file_path}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt="Movie still"
                  loading="lazy"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateMoviePage;
