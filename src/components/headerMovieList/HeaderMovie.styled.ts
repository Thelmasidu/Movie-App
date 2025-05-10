import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
export const StyledHeader = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));