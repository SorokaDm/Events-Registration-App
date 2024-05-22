import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography, Button, TextField } from "@mui/material";
import Header from "./Header";
import CardParticipantItem from "./CardParticipantItem";

function EventParticipants() {
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredParticipants = participants.filter((participant) => {
    const fullName = participant.fullName.toLowerCase();
    const email = participant.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: 2 }}>
          Participants for {eventName}
        </Typography>
        <TextField
          label="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        {participants.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="left">
            There are currently no registered participants for this event.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredParticipants.map((item) => (
              <CardParticipantItem key={item._id} {...item} />
            ))}
          </Grid>
        )}
        <Button variant="text" component={Link} to="/" sx={{ mt: 3 }}>
          Back to Events
        </Button>
      </Container>
    </>
  );
}

export default EventParticipants;
