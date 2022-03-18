import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import ThemeToggle from "../components/ThemeToggle";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Page" }: Props) => {
  return (
    <>
      <Head>
        <title>{title} | TODO App</title>
        <meta
          name="description"
          content="Another todo tool created by Stephen Way, a Principal Frontend Engineer ready to work for you."
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>TODO</h1>
          <ThemeToggle className={styles.themeIcon} />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
