import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "@/styles/globals.css";
import { Layout } from "@/components";
import { useMemo } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const props = useMemo(() => pageProps, [])
  return (
    <Provider store={store}>
      <Layout />
      <Component {...props} />
    </Provider>
  );
}
