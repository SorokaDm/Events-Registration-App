import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "./Header";
import CardEventItem from "./CardEventItem";
import axios from "axios";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    console.log(events);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedEvents = events.slice().sort((a, b) => {
    switch (sortBy) {
      case "date":
        return sortOrder === "asc"
          ? new Date(a.eventDate) - new Date(b.eventDate)
          : new Date(b.eventDate) - new Date(a.eventDate);
      case "organizer":
        return sortOrder === "asc"
          ? a.organizer.localeCompare(b.organizer)
          : b.organizer.localeCompare(a.organizer);
      default:
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
    }
  });

  return (
    <>
      <Header />
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h4" align="left">
              Events
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={handleSortByChange}
                    inputProps={{ "aria-label": "Sort By" }}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="organizer">Organizer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSortOrderChange}
                  sx={{
                    color: "#1976d2",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "0 0 0 2px #1976d2",
                    },
                  }}
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {sortedEvents.map((item) => (
            <CardEventItem key={item._id} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EventsList;
