import { ThemeProvider } from "../containers/ThemeProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  if (typeof window === "undefined") return null;
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
