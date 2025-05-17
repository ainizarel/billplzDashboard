import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'primereact/resources/themes/lara-light-blue/theme.css';   // Theme
import 'primereact/resources/primereact.min.css';                 // Core CSS
import 'primeicons/primeicons.css';                              // Icons
import '@/styles/globals.css';                                   // Your Tailwind


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
