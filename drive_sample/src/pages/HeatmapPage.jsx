import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";
import CorrelationHeatmap from "../components/CorrelationHeatmap";

const timeOptions = [5, 15, 30, 60];

function HeatmapPage() {
  const [minutes, setMinutes] = useState(15);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Correlation Heatmap
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography>Select Time Interval:</Typography>
        <Select
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          sx={{ ml: 2, minWidth: 80 }}
        >
          {timeOptions.map((m) => (
            <MenuItem key={m} value={m}>
              Last {m} min
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <CorrelationHeatmap minutes={minutes} />
    </Box>
  );
}

export default HeatmapPage;