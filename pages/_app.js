import UserProvider from "@/context/UserContext";
import "@/styles/globals.css";
import Script from "next/script";

import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import FacebookPixel from "@/components/FacebookPixel/FacebookPixel";

export default function App({ Component, pageProps }) {
  const theme = useTheme();

  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-WZ3LXZZR"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    ></iframe>
  </noscript>;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
