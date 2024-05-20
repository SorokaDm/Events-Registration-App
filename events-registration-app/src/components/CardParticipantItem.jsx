import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardParticipantItem(props) {
  const { fullName, email } = props;
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/event_registration");
  };

  const handleParticipantViewClick = () => {
    navigate("/event_participants");
  };

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={4}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="left">
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
