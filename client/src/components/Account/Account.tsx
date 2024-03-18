import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AccountDetailsForm } from './AccountDetails';
import { AccountInfo } from './AccountInfo';
import Navbar from '../Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../App';

export default function Page(props): React.JSX.Element {
    const {
        setLogin, login, setUsername, setPassword, username, password, logout
    } = props;

    return (
        <ThemeProvider theme={theme}>
        <Stack spacing={3}>
            <div>
                <Typography variant="h4">Account</Typography>
            </div>
            <Grid container spacing={3}>
                <Grid lg={4} md={6} xs={12}>
                    <AccountInfo />
                </Grid>
                <Grid lg={8} md={6} xs={12}>
                    <AccountDetailsForm />
                </Grid>
            </Grid>
        </Stack>
        </ThemeProvider>
    );
}