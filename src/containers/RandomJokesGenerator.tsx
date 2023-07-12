import React, { useEffect, useState, ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

const RandomJokesGenerator = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [setup, setSetup] = useState();
  const [punchline, setPunchline] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hidePunchlineButton, setHidePunchlineButton] = useState(true);
  const [hidePunchline, setHidePunchline] = useState(true);
  const [punchlineButtonText, setPunchlineButtonText] =
    useState("Show Punchline");

  const getRandomJoke = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );

      const data = await response.json();

      setSetup(data.setup);
      setPunchline(data.punchline);
      setHidePunchlineButton(false);
      setHasError(false);
    } catch (error: any) {
      setHasError(true);
      const errorMessageString = JSON.stringify({
        message: error.message,
        stack: error.stack,
      });
      setErrorMessage(errorMessageString);
      console.log(errorMessageString);
      setHidePunchlineButton(true);
      console.log(errorMessage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRandomJoke();
  }, []);

  const onGetRandomJokeClickedHandler = () => {
    getRandomJoke();
    setHidePunchline(true);
    setPunchlineButtonText("Show Punchline");
  };

  const onShowPunchlineClickedHandler = () => {
    if (hidePunchline) {
      setHidePunchline(false);
      setPunchlineButtonText("Hide Punchline");
    } else {
      setHidePunchline(true);
      setPunchlineButtonText("Show Punchline");
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: "60%",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} sm={6} py={2}>
          <Button
            variant="contained"
            onClick={onGetRandomJokeClickedHandler}
            sx={{
              backgroundColor: "#7ac06e",
              borderRadius: 40,
              padding: "15px 25px",
              width: "250px",
              textTransform: "none",
              ":hover": {
                bgcolor: "#529C44",
              },
            }}
          >
            Get A New Random Joke
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} alignSelf="center" py={2} textAlign="right">
          <Link
            href="https://github.com/15Dkatz/official_joke_api"
            target="_blank"
          >
            View Api Docs
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} p={2}>
          {isLoading ? (
            <Typography textAlign="center">LOADING YOUR JOKE...</Typography>
          ) : hasError ? (
            <Typography
              variant="subtitle2"
              color="error"
              sx={{ fontWeight: "600", textAlign: "center" }}
            >
              THERE WAS AN ERROR LOADING YOUR JOKE.
            </Typography>
          ) : (
            <Typography textAlign="left" variant="h6" py={4}>
              {setup}
            </Typography>
          )}
        </Grid>

        {!hidePunchlineButton && (
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              onClick={onShowPunchlineClickedHandler}
              sx={{
                borderRadius: 40,
                padding: "15px 25px",
                textTransform: "none",
              }}
            >
              {punchlineButtonText}
            </Button>
          </Grid>
        )}

        <Grid item xs={12} textAlign="right" py={4}>
          {!hidePunchline ? (
            <Typography variant="h6">{punchline}</Typography>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default RandomJokesGenerator;
