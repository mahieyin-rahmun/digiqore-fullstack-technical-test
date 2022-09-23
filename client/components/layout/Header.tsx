import { Box, Typography, useTheme, alpha } from "@mui/material";
import React from "react";

function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(4, 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: alpha(theme.palette.primary.dark, 0.8),
        color: theme.palette.common.white,
      }}
    >
      <Typography variant="h4">DigiQore Systems Ltd.</Typography>
      <Typography variant="h4">Full Stack Developer Test</Typography>
    </Box>
  );
}

export default Header;
