import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Header from "./Header";
import CardEventItem from "./CardEventItem";
import axios from "axios";

function EventsList() {
  const [events, setEvents] = useState([]);

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
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          Events
        </Typography>
        <Grid container spacing={4}>
          {events.map((item) => (
            <CardEventItem key={item._id} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EventsList;
