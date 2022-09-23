import ErrorComponent from "@/components/error/ErrorComponent";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import LanguageLevelTable from "@/components/table/LanguageLevelTable";
import useApi from "@/hooks/useApi";
import { TProgrammingLanguageLevelData } from "@/types";
import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";

export default function BasicTable() {
  const theme = useTheme();
  const { data, error, loading, fetch } = useApi<{
    message: string;
    data: TProgrammingLanguageLevelData[];
  }>("/data", "GET");

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Container
      maxWidth={"md"}
      sx={{ width: "100%", height: "100%", py: theme.spacing(2) }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && !data && !error && <SpinnerComponent />}
        {!loading && error && <ErrorComponent message={error} />}
        <Box
          sx={{
            width: "50vw",
          }}
        >
          {!loading && data && (
            <React.Fragment>
              <Typography variant="h6" align="justify" gutterBottom>
                As of 1996, there were more than 500 languages and major
                dialects of languages available to software practitioners. The
                following table lists the most common of them in what is
                considered version 7 of the SPR Programming Languages Table.
              </Typography>
              <Box
                sx={{
                  my: theme.spacing(2),
                }}
              >
                <LanguageLevelTable data={data?.data || []} />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Container>
  );
}
