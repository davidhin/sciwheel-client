import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const search_citations = async (query) => {
  return await fetch("http://localhost:5000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: query }),
  }).then((res) => res.json());
};

const Dashboard = (props) => {
  const [cit, setCit] = useState([]);

  useEffect(() => {
    const getCit = async () => {
      let ret = await search_citations("");
      setCit(ret);
    };
    getCit();
  }, []);

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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={async (e) => {
            let ret = await search_citations(e.target.value);
            setCit(ret);
          }}
        />
        {cit.map((e) => {
          return (
            <Box key={e["id"]}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: e["title"] }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
