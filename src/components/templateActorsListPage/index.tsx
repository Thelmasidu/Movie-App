import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { ActorsListPageTemplateProps } from "../../types/interfaces";
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
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Header
          title={title}
          page={page}
          totalPages={totalPages}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Grid>

      <Grid item container spacing={1}>
        <ActorsList action={action} actors={actors} />
      </Grid>
    </Grid>
  );
};
export default ActorsListPageTemplate;