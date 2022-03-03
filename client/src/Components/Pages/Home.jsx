import { Box, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GetData } from "../../Utils/LocalStorage";
import Page from "./Landing/Page";

export const Home = () => {
  const [regi, setRegi] = useState(false);
  useEffect(() => {
    let dataLog = GetData("loggedIn");
    if (dataLog === "IN") {
      setRegi(true);
    }
  }, [regi]);
  return (
    <>
      {regi === true && <Page />}

      {regi === false && (
        <Box sx={{ mt: 40, ml: 60 }}>
          <Typography variant="subtitle1">Please Login...</Typography>
          <Button
            style={{ marginTop: "10px" }}
            href="/register-login"
            variant="contained"
            color="secondary"
          >
            Click Here
          </Button>
        </Box>
      )}
    </>
  );
};
