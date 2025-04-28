import * as React from "react";
import { People } from "../../types/interfaces";
import { Grid } from "@mui/material";
import PeopleCard from "../peopleCard";

interface PeopleProps {
  people: People[];
  action: (m: People) => React.ReactNode;
}

const PeopleList: React.FC<PeopleProps> = (props) => {
  const people = props.people;

  return (
    <Grid container spacing={2}>
      {people.map((p) => (
        <Grid item key={p.id} xs={12} sm={6} md={6} lg={3}>
          <PeopleCard person={p} action={props.action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PeopleList;
