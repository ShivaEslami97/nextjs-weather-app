import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      <Component {...pageProps} />
    </>
  );
}
