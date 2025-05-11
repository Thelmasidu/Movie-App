import React from "react";
import { ActorsDetails, MovieImage } from "../../types/interfaces";
import { fetchActorImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import { Box, Container, ImageList, ImageListItem } from "@mui/material";
import Spinner from "../spinner";
import { useParams } from "react-router-dom";
import ActorHeader from "../actorHeader";

interface TemplateActorDetailPageProps {
  actor: ActorsDetails;
  children: React.ReactElement;
}

const TemplateActorDetailPage: React.FC<TemplateActorDetailPageProps> = (
  props
) => {
  const { id } = useParams();
  const { actor, children } = props;
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", id],
    () => fetchActorImages(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as MovieImage[];

  return (
    <>
      <Box>
        <ActorHeader {...actor} />
      </Box>

      <Container sx={{ maxWidth: "lg", marginTop: 2 }}>
        <Box sx={{ py: 2 }}>{children}</Box>
        <ImageList cols={3}>
          {images.map((image: MovieImage) => (
            <ImageListItem key={image.file_path}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={"Image alternative"}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
};

export default TemplateActorDetailPage;
