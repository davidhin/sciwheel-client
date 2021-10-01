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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { groupBy } from "lodash";

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
  const [tags, setTags] = useState([]);
  const [filtertags, setFilterTags] = useState([]);

  useEffect(() => {
    const initData = async () => {
      let ret_cit = await search_citations("");
      let ret_tags = await fetch("http://localhost:5000/tags").then((res) =>
        res.json()
      );
      setCit(ret_cit);
      setTags(groupBy(ret_tags, "colour"));
    };
    initData();
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
            display: "block",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="body1">Tags</Typography>
        {Object.values(tags).map((tg) => {
          return (
            <Box sx={{ display: "inline-block", marginBottom: 1 }}>
              {tg.map((t) => {
                return (
                  <Card
                    sx={{
                      float: "left",
                      background: colormap[t["colour"]][100],
                      margin: "1px",
                      cursor: "pointer",
                    }}
                    variant="outlined"
                    key={t["id"]}
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
            </Box>
          );
        })}
      </Drawer>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <TextField
          fullWidth
          sx={{ marginBottom: 1 }}
          color="primary"
          size="small"
          id="outlined-basic"
          label="Search"
          variant="filled"
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
          let pdfpath = e["pdfResource"]
            ? e["pdfResource"]["cloudFilePath"]
            : "";
          return (
            <Card
              sx={{ marginTop: "5px", padding: "5px" }}
              variant="outlined"
              key={e["id"]}
            >
              {pdfpath !== "" ? (
                <div>
                  <Box
                    sx={{
                      float: "left",
                      padding: 0,
                      height: "1px",
                      marginRight: 0.5,
                      marginBottom: 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://sciwheel.com" +
                          pdfpath.replace("api/items", "item") +
                          "/pdf"
                      )
                    }
                  >
                    <SpeakerNotesIcon fontSize="small" />
                  </Box>
                  <Box
                    sx={{
                      float: "left",
                      padding: 0,
                      height: "1px",
                      marginRight: 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open("https://sciwheel.com" + pdfpath)
                    }
                  >
                    <PictureAsPdfIcon fontSize="small" />
                  </Box>
                </div>
              ) : (
                <div></div>
              )}
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: e["title"] }}
              />
              <Typography sx={{ fontSize: "8pt" }} variant="body2">
                <b>{year}</b> {e["publicationInfo"]}
                <i>
                  {firstauth} {lastauth}
                </i>
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
                    key={t["id"]}
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
