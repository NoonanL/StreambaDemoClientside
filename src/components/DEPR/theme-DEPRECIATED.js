import { createMuiTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme(
  {fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  },
  body: {
    background: "#F5F5F5"
  },
    palette: {
      primary: {
        main: blue[800],
        contrastText: "#FFF"
      },
      secondary: blue
    },
    spacing: 4,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1440
      }
    },
    typography: {
      useNextVariants: true,
      fontFamily: [
        "Nunito Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      h1: {
        fontSize: "2.5rem",
        fontWeight: 600
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600
      },
      body1: {
        fontSize: 14
      },
      button: {
        textTransform: "none"
      }
    },
    props: {
      MuiButtonBase: {
        disableRipple: true
      }
    },
    shadows: Array(25).fill("none"),
    sidebar: {
      background: blue[700]
    },
    overrides: {
      MuiPickersDay: {
        day: {
          fontWeight: "300"
        }
      },
      MuiPickersYear: {
        root: {
          height: "64px"
        }
      },
      MuiPickersCalendar: {
        transitionContainer: {
          marginTop: "6px"
        }
      },
      MuiPickersCalendarHeader: {
        iconButton: {
          backgroundColor: "transparent",
          "& > *": {
            backgroundColor: "transparent"
          }
        },
        switchHeader: {
          marginTop: "2px",
          marginBottom: "4px"
        }
      },
      MuiPickersClock: {
        container: {
          margin: `32px 0 4px`
        }
      },
      MuiPickersClockNumber: {
        clockNumber: {
          left: `calc(50% - 16px)`,
          width: "32px",
          height: "32px"
        }
      },
      MuiPickerDTHeader: {
        dateHeader: {
          "& h4": {
            fontSize: "2.125rem",
            fontWeight: 400
          }
        },
        timeHeader: {
          "& h3": {
            fontSize: "3rem",
            fontWeight: 400
          }
        }
      },
      MuiPickersTimePicker: {
        hourMinuteLabel: {
          "& h2": {
            fontSize: "3.75rem",
            fontWeight: 300
          }
        }
      },
      MuiPickersToolbar: {
        toolbar: {
          "& h4": {
            fontSize: "2.125rem",
            fontWeight: 400
          }
        }
      }
    }
  },
);

export default theme;
