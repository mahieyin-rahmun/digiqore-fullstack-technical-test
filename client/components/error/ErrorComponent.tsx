import { Typography, Box, useTheme } from "@mui/material";
import { BiError } from "react-icons/bi";

type TErrorComponentProps = {
  message: string;
};
const ErrorComponent: React.FC<TErrorComponentProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          my: theme.spacing(2),
        }}
      >
        <BiError size={100} />
      </Box>
      <Typography variant="h4" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
