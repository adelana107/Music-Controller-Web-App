import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const CreateRoomPage = () => {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVoteChange = (e) => setVotesToSkip(Number(e.target.value));
  const handleGuestCanPauseChange = (e) =>
    setGuestCanPause(e.target.value === "true");

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };

    console.log("Creating room with:", requestOptions);

    fetch("api/create-room/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      <Grid>
        <Typography variant="h4">Create a Room</Typography>
      </Grid>

      <Grid>
        <Typography variant="subtitle1">
          Guest Control of Playback State
        </Typography>
      </Grid>

      <Grid>
        <FormControl>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Play / Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid>
        <FormControl>
          <TextField
            required
            type="number"
            value={votesToSkip}
            onChange={handleVoteChange}
            inputProps={{
              min: 1,
              max: 12,
              style: { textAlign: "center" },
            }}
            sx={{ width: 120 }}
          />
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ mt: 1, display: "block" }}
          >
            Votes Required to Skip Song
          </Typography>
        </FormControl>
      </Grid>

      <Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
          sx={{ mr: 2 }}
        >
          Create a Room
        </Button>
        <Button component={Link} to="/" color="secondary" variant="contained">
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
