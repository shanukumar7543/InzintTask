import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
export default function Index() {
  const [formDetails, setFormDetails] = useState({
    file: {},
  });
  const [getVideo, setGetVideo] = useState([]);

  console.log("222222", formDetails);

  const uploadVideo = () => {
    console.log("6564+5", formDetails);
    const formData = new FormData();
    formData.append("file", formData.file);
    axios
      .post("http://localhost:5001/api/file/upload", formDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    axios.get("http://localhost:5001/api/file/getAll").then((response) => {
      console.log(response.data.data);
      setGetVideo(response.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="maindiv">
        <h1 className="stltext">Welcome All of you!!</h1>

        <div className="secdiv">
          <div className="thirddiv">
            <label htmlFor="file">Select Video</label>
            <input
              className="inp"
              type="file"
              name="file"
              id="file"
              placeholder=" select file"
              onChange={(e) => {
                setFormDetails({
                  ...formDetails,
                  file: e.target.files[0],
                });
              }}
            />

            <Button
              onClick={() => {
                uploadVideo();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Video</TableCell>
                <TableCell align="right">Thumbnail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getVideo.map((value) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{value.videopath}</TableCell>
                  {/* <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
