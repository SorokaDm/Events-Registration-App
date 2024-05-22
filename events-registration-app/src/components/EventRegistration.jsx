import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Header from "./Header";

function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!/^[a-zA-Zа-яА-Я\s]+$/.test(fullName)) {
      errors.fullName = "Full Name can only contain letters and spaces";
    }

    const currentDate = new Date();
    const dob = new Date(dateOfBirth);
    if (dob > currentDate) {
      errors.dateOfBirth = "Date of Birth cannot be in the future";
    }

    if (Object.keys(errors).length === 0) {
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
    } else {
      setErrors(errors);
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
            required
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
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
              id="referral-source-label"
              sx={{
                fontSize: "1.25rem",
                mb: 2,
              }}
            >
              Where did you hear about this event?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="referral-source-label"
              name="referral-source"
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
