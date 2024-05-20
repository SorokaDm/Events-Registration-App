import { Container, Grid, Typography } from "@mui/material";
import Header from "./Header";
import { participants } from "../data/participants";
import CardParticipantItem from "./CardParticipantItem";

function EventParticipants() {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          "Awesome Event" participants
        </Typography>
        <Grid container spacing={4}>
          {participants.map((item) => (
            <CardParticipantItem key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EventParticipants;
