import Head from "next/head";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Weather App" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nextjs weather app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
