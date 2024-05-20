import { Container, Grid, Typography } from "@mui/material";
import Header from "./Header";
import { events } from "../data/events";
import CardEventItem from "./CardEventItem";

function EventsList() {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="left" sx={{ mb: "1.5rem" }}>
          Events
        </Typography>
        <Grid container spacing={4}>
          {events.map((item) => (
            <CardEventItem key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EventsList;
