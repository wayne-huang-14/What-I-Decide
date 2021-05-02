import Head from 'next/head';

import Layout from '@/components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Inspired Ideas</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
