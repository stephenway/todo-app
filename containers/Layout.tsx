import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  return (
    <div>
      <Head>
        <title>{title} | TODO App</title>
        <meta
          name="description"
          content={`Another todo tool created by Stephen Way, a Principal Frontend Engineer ready to work for you.`}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>TODO</h1>
      {children}
    </div>
  );
};

export default Layout;
