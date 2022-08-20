import { Box, CircularProgress } from "@mui/material";
import Router, { useRouter } from "next/router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelector,
  loadUser,
  setAuthLoading,
} from "../../redux/reducers/authReducer";
import { setToken } from "../../utils/setToken";

export interface IProtectedRouterProps {
  children: React.ReactNode;
}

export default function ProtectedRouter(props: IProtectedRouterProps) {
  const router = useRouter();
  const isAuthRoute = ["/login", "/register"].includes(router.pathname);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setToken(token);
      dispatch(loadUser());
    } else {
      dispatch(setAuthLoading(false));
    }
  }, []);

  const { isAuthenticated, isLoading } = useAppSelector(authSelector);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (isAuthRoute && isAuthenticated) {
    Router.push("/");
    return <></>;
  } else if (!isAuthenticated && !isAuthRoute) {
    Router.push("/login");
    return <></>;
  }
  return <>{props.children}</>;
}
