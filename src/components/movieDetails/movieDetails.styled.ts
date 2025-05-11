import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const StyledPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 3, 4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(4),
}));

export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 600,
  textAlign: "center",
}));

export const OverviewText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  textAlign: "justify",
}));

export const CenteredText = styled(Typography)(() => ({
  textAlign: "center",
}));

export const BudgetText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));
