import React from "react";
import { Paper, Typography } from "@mui/material";

// Placeholder for chart implementation
function StockChart({ minutes }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography>
        [Interactive Stock Chart for last {minutes} minutes will appear here]
      </Typography>
      {/* Implement chart with tooltips, average line, etc. */}
    </Paper>
  );
}

export default StockChart;