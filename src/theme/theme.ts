import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#5a7eb2",
      dark: "#002a55",
      contrastText: "#fff",
      main: "#2C5282" //#3f51b5
    },
    secondary: {
      main: "#718096",
      dark: "#455468",
      light: "#a0afc7",
      contrastText: "#000000"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
})

export default theme
