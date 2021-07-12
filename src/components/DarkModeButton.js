import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

import useDarkMode from 'use-dark-mode';

const DarkModeButton = () => {
    const darkMode = useDarkMode(false);
    const light = useMediaQuery('(prefers-color-scheme: light)')
    const dark = useMediaQuery('(prefers-color-scheme: dark)')

    const [darkState, setDarkState] = useState(false);
    const prefersDarkMode = darkState ? light : dark;
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

    const PurpleSwitch = withStyles({
        switchBase: {
          color: '#222222',
          '&$checked': {
            color: '#E8C343',
          },
          '&$checked + $track': {
            backgroundColor: '#A4A4A4',
          },
        },
        checked: {},
        track: { backgroundColor: '#A4A4A4' },
      })(Switch);

    return (
        <ThemeProvider theme={theme}>
            <FormGroup className="dm-button">
                <FormControlLabel labelPlacement="start"
                    control={<PurpleSwitch checked={!darkMode.value} onChange={darkMode.toggle} name="checkedA" />}
                />
            </FormGroup>
            <CssBaseline />
        </ThemeProvider>
    );
};
export default DarkModeButton;