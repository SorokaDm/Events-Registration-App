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
} from "@mui/material";
import Header from "./Header";

function EventRegistration() {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          Event registration
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Full name"
          variant="outlined"
        />
        <TextField fullWidth margin="normal" label="Email" variant="outlined" />
        <TextField
          fullWidth
          margin="normal"
          label="Date of birth"
          variant="outlined"
          type="date"
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
        <Button
          variant="contained"
          sx={{
            mt: 3,
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px #1976d2",
            },
          }}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}

export default EventRegistration;
