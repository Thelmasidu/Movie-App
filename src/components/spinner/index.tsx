import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}
