import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import NextLink from "next/link";
import * as React from "react";
import { authApi } from "../api";
import LoadingOverlay from "../components/Loading/LoadingOverlay";
import { useAppDispatch } from "../redux/hooks";
import { changeAuth } from "../redux/reducers/authReducer";
import { setToken } from "../utils/setToken";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useAppDispatch();
  const mutation = useMutation((data: any) => {
    return authApi.register(data);
  });

  React.useEffect(() => {
    if (mutation.isSuccess) {
      localStorage.setItem("access_token", mutation.data.data.token);
      setToken(mutation.data.data.token);
      dispatch(
        changeAuth({
          isAuthenticated: true,
          isLoading: false,
          user: mutation.data.data.user,
        })
      );
    } else if (mutation.isError) {
      localStorage.removeItem("access_token");
    }
  }, [mutation.data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    mutation.mutate({
      email: data.get("email"),
      password: data.get("password"),
      age: data.get("age"),
      name: data.get("name"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {mutation.isLoading && <LoadingOverlay />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NextLink href="/login">
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
