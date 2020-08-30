import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import orange from "@material-ui/core/colors/orange";

const useStyles = makeStyles(theme => {
  console.log(theme);

  return {
    root: {
      color: theme.status.danger,
      "&$checked": {
        color: theme.status.danger
      },
      marginTop:200
    },
    checked: {}
  };
});

let CustomCheckbox = props => {
  const classes = useStyles();
  console.log(classes);
  return (
    <Checkbox
      defaultChecked
      classes={{
        root: classes.root,
        checked: classes.checked
      }}
    />
  );
};

CustomCheckbox.propTypes = {
  classes: PropTypes.object.isRequired
};

const theme = createMuiTheme({
  status: {
    // My business variables
    danger: orange[500]
  },
  otherCustomVars: {
    width: 90
  }
});

function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox />
    </ThemeProvider>
  );
}

export default CustomStyles;
