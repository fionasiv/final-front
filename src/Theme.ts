import { createTheme } from "@mui/material";

export const mediaTheme = createTheme({
    breakpoints: {
      values: {
        xs: 450,
        sm: 600,
        md: 950,
        lg: 1200,
        xl: 1536,
      },
    },
});