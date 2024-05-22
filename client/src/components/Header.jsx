import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5">Events Registration App</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
