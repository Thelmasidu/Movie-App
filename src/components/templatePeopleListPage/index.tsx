import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { PeopleListPageTemplateProps } from "../../types/interfaces";
import { Box } from "@mui/material";
import PeopleList from "../peopleList";

const PeopleListPageTemplate: React.FC<PeopleListPageTemplateProps> = ({
  people,
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
          <PeopleList action={action} people={people} />
        </Grid>
      </Box>
    </Box>
  );
};
export default PeopleListPageTemplate;
