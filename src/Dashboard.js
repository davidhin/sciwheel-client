import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';


export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Drawer
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            p: 3,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="body1">Tags</Typography>
      </Drawer>
      <Box sx={{ p: 3, flexGrow: 1 }}>
      <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" />
      </Box>
    </Box>
  );
}
