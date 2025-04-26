import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { StyledHeader } from "./HeaderMovie.styled";

interface HeaderProps {
  title: string;
  page: number;
  totalPages?: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  const isLastPage = totalPages ? page >= totalPages : false;

  return (
    <StyledHeader variant="outlined">
      <IconButton
        aria-label="go back"
        onClick={onPrevious}
        disabled={page === 1}
      >
        <ArrowBackIcon
          color={page === 1 ? "disabled" : "primary"}
          fontSize="large"
        />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title} — Page {page}
      </Typography>

      <IconButton
        aria-label="go forward"
        onClick={onNext}
        disabled={isLastPage}
      >
        <ArrowForwardIcon
          color={isLastPage ? "disabled" : "primary"}
          fontSize="large"
        />
      </IconButton>
    </StyledHeader>
  );
};

export default Header;
