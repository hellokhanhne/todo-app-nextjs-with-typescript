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

export default function SignIn() {
  const dispatch = useAppDispatch();
  const mutation = useMutation((data: any) => {
    return authApi.login(data);
  });

  React.useEffect(() => {
    console.log("goi useffect");
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
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {mutation.isLoading && <LoadingOverlay />}
      {/* <LoadingOverlay /> */}
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NextLink href="/register">
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
