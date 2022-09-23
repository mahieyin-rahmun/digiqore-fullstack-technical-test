import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.grey["A200"],
        padding: theme.spacing(4, 0),
      }}
    >
      <Typography variant="h5" align="center">
        Done by: Mahieyin Rahmun
      </Typography>
      <Typography variant="h6" align="center">
        September 2022
      </Typography>
    </Box>
  );
}

export default Footer;
