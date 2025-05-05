import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SearchInput from "../searchHeader";
import ThemeSelector from "../themeSelector";

// Custom styled offset to avoid content being hidden under fixed AppBar
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "TV Shows", path: "/tv-shows" },
    { label: "Actors", path: "/actors" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={2} color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section: Logo/Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              TMDB Client
            </Typography>
            {!isMobile && (
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "white" }}
              >
                All you ever wanted to know about Movies!
              </Typography>
            )}
          </Box>

          {/* Center Section: Search Input */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box>
              <SearchInput />
            </Box>
          </Box>

          {/* Right Section: Nav Buttons / Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {menuOptions.map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={() => handleMenuSelect(option.path)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2}>
                {menuOptions.map((option) => (
                  <Button
                    key={option.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(option.path)}
                  >
                    {option.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
          <Box>
            <ThemeSelector />
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
