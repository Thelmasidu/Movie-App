import {
    Box,
    TextField,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Button,
    Select,
    InputLabel,
    FormControl,
    Modal,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { languageOptions, modalStyle } from "./data";
  
  const SearchForm = () => {
    const [query, setQuery] = useState("");
    const [mediaType, setMediaType] = useState("all");
    const [includeAdult, setIncludeAdult] = useState(false);
    const [language, setLanguage] = useState("en-US");
    const [open, setOpen] = useState(false);
  
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const searchParams = new URLSearchParams();
      searchParams.set("query", query);
  
      if (mediaType && mediaType !== "all")
        searchParams.set("media_type", mediaType);
      searchParams.set("include_adult", includeAdult.toString());
      searchParams.set("language", language);
  
      navigate(`/movies/search?${searchParams.toString()}`);
  
      setQuery("");
      setMediaType("all");
      setIncludeAdult(false);
      setLanguage("en-US");
      setOpen(false);
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          Open Search
        </Button>
  
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="search-modal-title"
        >
          <Box sx={modalStyle}>
            <h2 id="search-modal-title">Search Movies</h2>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "grid", gap: 2 }}
            >
              <TextField
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
  
              <FormControl fullWidth>
                <InputLabel>Media Type</InputLabel>
                <Select
                  value={mediaType}
                  label="Media Type"
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="movie">Movies</MenuItem>
                  <MenuItem value="tv">TV Shows</MenuItem>
                  <MenuItem value="person">People</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languageOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeAdult}
                    onChange={(e) => setIncludeAdult(e.target.checked)}
                  />
                }
                label="Include Adult"
              />
  
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };
  
  export default SearchForm;
  