import React from "react";
import { Paper, Typography } from "@mui/material";

// Placeholder for heatmap implementation
function CorrelationHeatmap({ minutes }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography>
        [Interactive Correlation Heatmap for last {minutes} minutes will appear here]
      </Typography>
      {/* Implement heatmap with hover/selection, legend, etc. */}
    </Paper>
  );
}

export default CorrelationHeatmap;