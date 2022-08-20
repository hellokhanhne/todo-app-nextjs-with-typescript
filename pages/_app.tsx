import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import BaseLayout from "../components/Layout/BaseLayout";
import ProtectedRouter from "../components/ProtectedRouter";
import createEmotionCache from "../material/createEmotionCache";
import theme from "../material/theme";
import store from "../redux/store";
import "../styles/app.css";

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requiredAuth?: boolean;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextApplicationPage;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ProtectedRouter
              children={
                Component.requiredAuth ? (
                  <BaseLayout>
                    <Component {...pageProps} />
                  </BaseLayout>
                ) : (
                  <Component {...pageProps} />
                )
              }
            />
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
