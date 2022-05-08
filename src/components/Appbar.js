// import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Button, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/income")}>
              Income
            </Button>
            <Button color="inherit" onClick={() => navigate("/expenditure")}>
              Expenditure
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
