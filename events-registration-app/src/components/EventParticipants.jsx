import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography, Button } from "@mui/material";
import Header from "./Header";
import CardParticipantItem from "./CardParticipantItem";

function EventParticipants() {
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState("");
  const { eventId } = useParams();

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${eventId}`
        );

        setEventName(response.data.title);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    async function fetchParticipants() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${eventId}/participants`
        );

        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    }

    fetchEventData();
    fetchParticipants();
  }, [eventId]);

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          Participants for {eventName}
        </Typography>
        <Grid container spacing={4}>
          {participants.map((item) => (
            <CardParticipantItem key={item._id} {...item} />
          ))}
        </Grid>
        {/* Додали кнопку, яка веде на сторінку зі списком подій */}
        <Button variant="text" component={Link} to="/" sx={{ mt: 3 }}>
          Back to Events
        </Button>
      </Container>
    </>
  );
}

export default EventParticipants;
