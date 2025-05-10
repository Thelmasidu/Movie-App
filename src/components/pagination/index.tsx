import React from "react";
import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
      <Stack spacing={3}>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          size="large"
        />
      </Stack>
    </Box>
  );
};

export default PaginationControls;
