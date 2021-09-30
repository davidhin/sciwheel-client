import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  red,
  orange,
  yellow,
  blue,
  green,
  purple,
  grey,
} from "@mui/material/colors";

const search_citations = async (query) => {
  return await fetch("http://localhost:5000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: query }),
  }).then((res) => res.json());
};

const colormap = {
  orange: orange,
  yellow: yellow,
  green: green,
  blue: blue,
  magenta: purple,
  red: red,
  gray: grey,
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
          let year = e["publishedYear"] ? e["publishedYear"] : "";
          let firstauth = e["firstAuthorsForView"]
            ? e["firstAuthorsForView"].join(" ")
            : "";
          let lastauth = e["lastAuthorForView"]
            ? " (...) " + e["lastAuthorForView"].join(" ")
            : "";
          return (
            <Card
              sx={{ marginTop: "5px", padding: "5px" }}
              variant="outlined"
              key={e["id"]}
            >
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: e["title"] }}
              />
              <Typography sx={{ fontSize: "8pt" }} variant="body2">
                {e["publicationInfo"]}
              </Typography>
              <Typography sx={{ fontSize: "6pt" }} variant="body2">
                {year} {firstauth} {lastauth}
              </Typography>
              {e["tags"].map((t) => {
                return (
                  <Card
                    sx={{
                      float: "left",
                      background: colormap[t["colour"]][100],
                      marginRight: "5px",
                    }}
                    variant="outlined"
                  >
                    <Typography
                      sx={{
                        color: colormap[t["colour"]][800],
                        fontSize: "8pt",
                      }}
                      variant="body2"
                      key={t["id"]}
                    >
                      {t["name"]}
                    </Typography>
                  </Card>
                );
              })}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
