import React from "react";
import { Box, SxProps } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const containerCss: SxProps = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateAreas: `
    "navbar"
    "content"
    "footer"
  `,
  minHeight: "100vh",
};

const navbarCss: SxProps = {
  gridArea: "navbar",
  width: "100%",
  top: 0,
};

const contentCss: SxProps = {
  gridArea: "content",
  minHeight: "100%",
};

const footerCss: SxProps = {
  gridArea: "footer",
};

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={containerCss}>
      <Box sx={navbarCss}>
        <Header />
      </Box>
      <Box sx={contentCss}>{children}</Box>
      <Box sx={footerCss}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
