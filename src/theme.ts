import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#9c27b0", // purple
    },
  },
  components: {
    // small global MUI tweaks can go here
  },
});

export default theme;
