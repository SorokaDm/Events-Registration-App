import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardEventItem(props) {
  const { title, description, eventDate, organizer, _id } = props;
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/event_registration/${_id}`);
  };

  const handleParticipantViewClick = () => {
    navigate(`/event_participants/${_id}`);
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
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            {eventDate}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            {organizer}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
                variant="plain"
                sx={{
                  color: "#1976d2",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px #1976d2",
                  },
                }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="plain"
                sx={{
                  color: "#1976d2",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px #1976d2",
                  },
                }}
                onClick={handleParticipantViewClick}
              >
                View
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardEventItem;
