import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Box,
} from "@mui/material";
import Header from "./Header";
import CardParticipantItem from "./CardParticipantItem";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EventParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [registrationData, setRegistrationData] = useState([]);
  const { eventId } = useParams();

  const myUrl = import.meta.env.VITE_APP_MY_URL || "http://localhost:5173";

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await axios.get(`${myUrl}/api/events/${eventId}`);

        setEventName(response.data.title);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    async function fetchParticipants() {
      try {
        const response = await axios.get(
          `${myUrl}/api/events/${eventId}/participants`
        );

        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    }

    async function fetchRegistrationData() {
      try {
        const response = await axios.get(
          `${myUrl}/api/events/${eventId}/registrationData`
        );

        setRegistrationData(response.data);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    }

    fetchEventData();
    fetchParticipants();
    fetchRegistrationData();
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
            <Grid item xs={12}>
              <Box mb={3}>
                <Typography variant="h6" align="left">
                  Registration Data
                </Typography>
                <Divider />
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={registrationData}
                      margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="registrations"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                Participant List
              </Typography>
              <Divider />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredParticipants.map((item) => (
                  <CardParticipantItem key={item._id} {...item} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
        <Button variant="text" component={Link} to="/" sx={{ mt: 3 }}>
          Back to Events
        </Button>
      </Container>
    </>
  );
};

export default EventParticipants;
