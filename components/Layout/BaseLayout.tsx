import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/reducers/authReducer";

export interface IBaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout(props: IBaseLayoutProps) {
  const { user } = useAppSelector(authSelector);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Image width={100} height={55} src={`/todo.png`} />
          <Link href="/" passHref>
            <Typography
              variant="body2"
              className="nav-link"
              sx={{
                marginLeft: "4rem !important",
              }}
            >
              Todos
            </Typography>
          </Link>
          <Link href="/profile" passHref>
            <Typography variant="body2" className="nav-link">
              Profile
            </Typography>
          </Link>

          <Box
            sx={{
              flex: 1,
              textAlign: "right",
            }}
          >
            <Grid container justifyContent="flex-end" alignItems="center">
              <Typography variant="h6">{user?.name}</Typography>
              <Button
                variant="contained"
                color="error"
                sx={{
                  marginLeft: "15px",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>{props.children}</Box>
    </>
  );
}
