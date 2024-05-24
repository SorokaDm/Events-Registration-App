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
  Pagination,
} from "@mui/material";
import Header from "./Header";
import CardEventItem from "./CardEventItem";
import axios from "axios";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [eventsPerPage] = useState(8);

  const myUrl = import.meta.env.VITE_APP_MY_URL || "http://localhost:5173";

  useEffect(() => {
    axios
      .get(`${myUrl}/api`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error("Data is not an array", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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

  const indexOfLastEvent = page * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

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
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={handleSortByChange}
                    inputProps={{ "aria-label": "Sort By" }}
                    label="Sort By"
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
          {currentEvents.map((item) => (
            <CardEventItem key={item._id} {...item} />
          ))}
        </Grid>
        <Grid container justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(sortedEvents.length / eventsPerPage)}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            size="large"
          />
        </Grid>
      </Container>
    </>
  );
}

export default EventsList;
