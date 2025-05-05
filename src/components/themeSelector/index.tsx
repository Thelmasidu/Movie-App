import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useTheme } from "@mui/material/styles";
import { baseColors } from "../../themes";
import { useThemeContext } from "../../contexts/themeContextUtils";

const ThemeSelector: React.FC = () => {
  const { themeName, setThemeName, mode, toggleMode } = useThemeContext();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <ColorLensIcon />
      </IconButton>

      <Dialog open={openModal} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>🎨 Theme Selector</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Select Theme
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Theme</InputLabel>
              <Select
                value={themeName}
                label="Theme"
                onChange={(e) =>
                  setThemeName(e.target.value as keyof typeof baseColors)
                }
              >
                {Object.keys(baseColors).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Toggle Mode
            </Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="body2">Light</Typography>
              </Grid>
              <Grid item>
                <Switch checked={mode === "dark"} onChange={toggleMode} />
              </Grid>
              <Grid item>
                <Typography variant="body2">Dark</Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThemeSelector;
