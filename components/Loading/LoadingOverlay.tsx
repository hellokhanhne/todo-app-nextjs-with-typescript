import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export interface ILoadingOverlayProps {}

export default function LoadingOverlay(props: ILoadingOverlayProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.2)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
}
