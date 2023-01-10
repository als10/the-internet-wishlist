import Head from 'next/head';
import { PropsWithChildren } from 'react';
import colors from 'tailwindcss/colors';

interface PageProps {
  pageTitle: string;
  bgColor?: string;
}

export default function Page({
  pageTitle,
  bgColor = colors.rose[300],
  children,
}: PropsWithChildren<PageProps>) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{ backgroundColor: bgColor }}>{children}</body>
    </>
  );
}
