import "../styles/globals.css";
import { Bubblegum_Sans } from "@next/font/google";

const bubblegum = Bubblegum_Sans({
  weight: "400",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={bubblegum.className}>
      <Component {...pageProps} />
    </main>
  );
}
