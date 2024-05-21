import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Header from "./Header";

function EventRegistration() {
  const { eventId } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/register/${eventId}`, {
        fullName,
        email,
        dateOfBirth,
        referralSource,
      });

      navigate(`/?registrationSuccess=true`);
    } catch (error) {
      console.error("Error registering participant:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          Register for Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                fontSize: "1.25rem",
                mb: 2,
              }}
            >
              Where did you hear about this event?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
            >
              <FormControlLabel
                value="social media"
                control={<Radio />}
                label="Social media"
              />
              <FormControlLabel
                value="friends"
                control={<Radio />}
                label="Friends"
              />
              <FormControlLabel
                value="found myself"
                control={<Radio />}
                label="Found myself"
              />
            </RadioGroup>
          </FormControl>
          <Stack
            spacing={5}
            direction="row"
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button variant="text" component={Link} to="/">
              Back to Events
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default EventRegistration;
