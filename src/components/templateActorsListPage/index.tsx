import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { ActorsListPageTemplateProps } from "../../types/interfaces";
import { Box } from "@mui/material";
import ActorsList from "../actorsList";

const ActorsListPageTemplate: React.FC<ActorsListPageTemplateProps> = ({
  actors,
  title,
  action,
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <Box sx={{ my: 2 }}>
      <Header
        title={title}
        page={page}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
      />
      <Box sx={{ p: 1 }}>
        <Grid item container spacing={1}>
          <ActorsList action={action} actors={actors} />
        </Grid>
      </Box>
    </Box>
  );
};
export default ActorsListPageTemplate;
