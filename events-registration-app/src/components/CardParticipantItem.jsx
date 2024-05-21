import { Card, CardContent, Grid, Typography } from "@mui/material";

function CardParticipantItem(props) {
  const { fullName, email } = props;

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          width: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={4}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="left">
            {fullName}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            {email}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardParticipantItem;
